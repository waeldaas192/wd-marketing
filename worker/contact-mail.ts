import { contactEmails, type EmailKind } from "../src/lib/contact-emails";
import type { Brief } from "../src/lib/contact-validation";
import type { Env, Statement } from "./index";

export function mailEnabled(env: Env) {
  return env.CONTACT_EMAIL_ENABLED === "true" && Boolean(env.RESEND_API_KEY?.trim());
}

export function emailStatements(env: Env, id: string, reference: string, data: Brief, now: number): Statement[] {
  const messages = contactEmails(data, reference);
  return (["notification", "confirmation"] as EmailKind[]).map(kind => env.DB!.prepare(
    "INSERT INTO contact_email_outbox (id,enquiry_id,kind,payload,created_at,next_attempt_at) VALUES (?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING"
  ).bind(`wd-email-v1/${id}/${kind}`, id, kind, JSON.stringify(messages[kind]), now, now));
}

type MailJob = { id: string; kind: EmailKind; payload: string; attempts: number; first_attempt_at: number };
function event(kind: string, status: number | null, outcome: string) {
  // Do not log payloads, recipient addresses, provider response text or credentials.
  console.error(JSON.stringify({ event: "contact_email", kind, status, outcome }));
}
async function providerId(response: Response) {
  if (!response.body) throw new Error("empty_response");
  const reader = response.body.getReader(); let text = "", length = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const part = await reader.read(); if (part.done) break;
      length += part.value.byteLength;
      if (length > 8192) { await reader.cancel(); throw new Error("oversize_response"); }
      text += decoder.decode(part.value, { stream: true });
    }
  } finally { reader.releaseLock(); }
  text += decoder.decode();
  const result = JSON.parse(text);
  if (typeof result?.id !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(result.id)) throw new Error("invalid_response");
  return result.id as string;
}

// Traffic-driven, bounded outbox. Native waitUntil keeps delivery off the form's
// response path. Three attempts maximum; never retry beyond provider dedupe TTL.
export async function deliverContactEmails(env: Env, transport: typeof fetch = fetch) {
  if (!mailEnabled(env) || !env.DB) return;
  try {
    const now = Math.floor(Date.now() / 1000);
    await env.DB.prepare("UPDATE contact_email_outbox SET status='review',last_error='retry_window_expired' WHERE status IN ('pending','sending') AND (created_at<? OR first_attempt_at<? OR (attempts>=3 AND next_attempt_at<=?))")
      .bind(now - 23 * 3600, now - 23 * 3600, now).run();
    for (let index = 0; index < 2; index++) {
      const started = Math.floor(Date.now() / 1000);
      // One atomic UPDATE claims a lease, preventing two Workers sending the
      // same job concurrently. The provider key also covers a lost response.
      const job = await env.DB.prepare("UPDATE contact_email_outbox SET status='sending',attempts=attempts+1,first_attempt_at=COALESCE(first_attempt_at,?),next_attempt_at=? WHERE id=(SELECT id FROM contact_email_outbox WHERE status IN ('pending','sending') AND attempts<3 AND next_attempt_at<=? ORDER BY created_at,id LIMIT 1) RETURNING id,kind,payload,attempts,first_attempt_at")
        .bind(started, started + 60, started).first<MailJob>();
      if (!job) break;
      let status: number | null = null, outcome = "transport_error";
      let retry = true;
      try {
        const response = await transport("https://api.resend.com/emails", {
          method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY!.trim()}`, "Content-Type": "application/json", "Idempotency-Key": job.id },
          body: job.payload, signal: AbortSignal.timeout(8000), redirect: "manual",
        });
        status = response.status;
        if (!response.ok) {
          retry = status === 408 || status === 429 || status >= 500;
          outcome = status >= 300 && status < 400 ? "provider_redirect" : "provider_rejected";
          await response.body?.cancel();
          throw new Error(outcome);
        }
        outcome = "invalid_response";
        const id = await providerId(response);
        outcome = "acceptance_write_failed";
        await env.DB.prepare("UPDATE contact_email_outbox SET status='accepted',provider_id=?,accepted_at=?,last_error=NULL,payload='' WHERE id=? AND status='sending' AND attempts=?")
          .bind(id, Math.floor(Date.now() / 1000), job.id, job.attempts).run();
        continue;
      } catch {
        const next = Math.floor(Date.now() / 1000) + (job.attempts === 1 ? 60 : 300);
        const pending = retry && job.attempts < 3 && next < job.first_attempt_at + 23 * 3600;
        await env.DB.prepare("UPDATE contact_email_outbox SET status=?,next_attempt_at=?,last_error=? WHERE id=? AND status='sending' AND attempts=?")
          .bind(pending ? "pending" : "review", next, outcome, job.id, job.attempts).run();
        event(job.kind, status, pending ? "retry_pending" : "review_required");
      }
    }
  } catch { event("outbox", null, "database_unavailable"); }
}
