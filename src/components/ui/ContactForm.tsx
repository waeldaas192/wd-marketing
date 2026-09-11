"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactBudgets, contactServices, emptyBrief, formatBrief, normaliseWebsite, validateBrief, type Brief, type BriefErrors } from "@/lib/contact-validation";
import type { ContactConfig } from "@/lib/address-types";
import { SecurityCheck } from "./SecurityCheck";
import { BusinessAddress } from "./BusinessAddress";
import { site } from "@/data/site";
import styles from "./ContactForm.module.css";
const labels = ["Your project", "Contact & location", "Review & send"];
const fieldsByStep: (keyof Brief)[][] = [["service", "budget", "message"], ["name", "email", "phone", "company", "website", "country", "postcode", "addressLine1", "addressLine2", "city", "region"]];
const serviceLabels = [["A better website", "Design, performance and enquiries"], ["Get found on Google", "SEO and organic growth"], ["Reach customers with ads", "Google Ads and paid campaigns"], ["Connect my marketing", "Analytics, CRM and automation"], ["Help me choose", "A plan across more than one service"]];
export function ContactForm() {
  const [step, setStep] = useState(0), [furthest, setFurthest] = useState(0);
  const [brief, setBrief] = useState<Brief>({ ...emptyBrief }), [errors, setErrors] = useState<BriefErrors>({});
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState(""), [reference, setReference] = useState("");
  const [token, setToken] = useState(""), [revision, setRevision] = useState(0), [copied, setCopied] = useState(false);
  const [config, setConfig] = useState<ContactConfig | null>(null), [configFailed, setConfigFailed] = useState(false), [configRevision, setConfigRevision] = useState(0);
  const formRef = useRef<HTMLFormElement>(null), titleRef = useRef<HTMLHeadingElement>(null), interacted = useRef(false), busy = useRef(false);
  const lastRequest = useRef({ signature: "", id: "" }); const locked = state === "loading";
  useEffect(() => {
    let active = true; const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 8000);
    setConfigFailed(false); setConfig(null);
    fetch("/api/contact/config", { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error(); const value = await response.json();
      if (typeof value.accepting !== "boolean" || !["postcode", "addresses"].includes(value.addressMode)) throw new Error();
      if (active) setConfig(value);
    }).catch(() => { if (active) setConfigFailed(true); }).finally(() => clearTimeout(timeout));
    return () => { active = false; controller.abort(); clearTimeout(timeout); };
  }, [configRevision]);
  useEffect(() => { if (interacted.current) titleRef.current?.focus(); }, [step, state === "success"]);
  function update(key: keyof Brief, value: string) {
    setBrief(current => ({ ...current, [key]: value })); setErrors(current => ({ ...current, [key]: undefined }));
    setCopied(false); setFeedback(""); if (!busy.current) setState("idle");
  }
  function replaceAddress(address: Partial<Brief>) {
    setBrief(current => ({ ...current, ...address }));
    setErrors(current => Object.fromEntries(Object.entries(current).filter(([key]) => !(key in address))) as BriefErrors);
  }
  function showErrors(issues: BriefErrors) {
    setErrors(issues); const firstStep = fieldsByStep.findIndex(fields => fields.some(key => issues[key]));
    interacted.current = true; if (firstStep >= 0) setStep(firstStep);
    setState("error"); setFeedback("Check the highlighted fields before continuing.");
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
  }
  function goTo(nextStep: number) {
    if (locked) return;
    if (nextStep > step) {
      const result = validateBrief(brief); const keys = fieldsByStep.slice(0, nextStep).flat();
      const issues = Object.fromEntries(keys.filter(key => result.errors[key]).map(key => [key, result.errors[key]])) as BriefErrors;
      if (Object.keys(issues).length) { showErrors(issues); return; }
      setBrief(result.data);
    }
    interacted.current = true; setStep(nextStep); setFurthest(current => Math.max(current, nextStep)); setErrors({}); setState("idle"); setFeedback("");
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy.current || state === "success") return;
    if (step < 2) { goTo(step + 1); return; }
    const validation = validateBrief(brief);
    if (!validation.valid) { showErrors(validation.errors); return; }
    if (!config?.accepting || configFailed) { setState("error"); setFeedback("Online sending is unavailable. Your entries are still here; use the email option below."); return; }
    if (config.turnstileSiteKey && !token) { setState("error"); setFeedback("Complete the security check before sending."); return; }
    const signature = JSON.stringify(validation.data);
    if (lastRequest.current.signature !== signature) lastRequest.current = { signature, id: crypto.randomUUID() };
    const websiteCheck = new FormData(event.currentTarget).get("websiteCheck");
    busy.current = true; setState("loading"); setFeedback("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...validation.data, requestId: lastRequest.current.id, turnstileToken: token, websiteCheck }), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok || result.ok !== true || typeof result.reference !== "string") {
        if (result.errors) showErrors(result.errors);
        setFeedback(typeof result.error === "string" ? result.error : "Saving was not confirmed. Your entries are still here; retry or use email."); setState("error");
      } else { setReference(result.reference); setState("success"); setFeedback(""); }
    } catch { setFeedback("Saving was not confirmed. Your entries are still here; retry or use email."); setState("error"); }
    finally { busy.current = false; setRevision(value => value + 1); }
  }
  const plainBrief = formatBrief(brief);
  const mailto = "mailto:" + site.email + "?subject=" + encodeURIComponent("WD Marketing project brief") + "&body=" + encodeURIComponent(plainBrief);
  const error = (key: keyof Brief) => errors[key] ? <span className={styles.error} id={"error-" + key}>{errors[key]}</span> : null;
  return <form ref={formRef} className={"project-form " + styles.form} onSubmit={submit} noValidate aria-busy={locked} data-project-wizard>
    {state === "success" ? <div className={styles.success} role="status"><span className={styles.check} aria-hidden="true">✓</span><h2 ref={titleRef} tabIndex={-1}>Your brief is with us.</h2><p>We have saved your project details for review. Keep this reference if you contact us about your enquiry.</p><p className={styles.reference}>{reference}</p><button type="button" className="button button-ghost" onClick={() => { setBrief({ ...emptyBrief }); setErrors({}); setFeedback(""); setState("idle"); setStep(0); setFurthest(0); setCopied(false); lastRequest.current = { signature: "", id: "" }; }}>Start another brief</button></div> : <>
      <div className={styles.progressTop}><span>Let’s plan your next step</span><span>Step {step + 1} of 3</span></div>
      <div className={styles.progressTrack} role="progressbar" aria-label="Project brief" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step + 1}><span style={{ width: ((step + 1) / 3 * 100) + "%" }}/></div>
      <ol className={styles.steps}>{labels.map((label, index) => <li key={label}><button type="button" disabled={locked || index > furthest} onClick={() => goTo(index)} aria-current={index === step ? "step" : undefined}><span aria-hidden="true">{index < step ? "✓" : index + 1}</span>{label}</button></li>)}</ol>
      <h2 ref={titleRef} tabIndex={-1} className={styles.title}>{["What would you like to improve?", "How can we reach you?", "Does everything look right?"][step]}</h2>
      <p className={styles.intro}>{["Choose a starting point. We’ll help with the details.", "Just your name and email are required here.", "You can edit any section before sending. There is no payment or commitment."][step]}</p>
      <div className={styles.srOnly} aria-hidden="true"><label>Leave this empty<input name="websiteCheck" tabIndex={-1} autoComplete="off"/></label></div>
      <fieldset className={styles.panel} hidden={step !== 0} disabled={locked}><legend className={styles.srOnly}>Your project</legend>
        <div className={styles.serviceGrid}>{contactServices.map((item, index) => <label key={item}><input type="radio" name="service" value={item} checked={brief.service === item} onChange={() => update("service", item)} required aria-invalid={!!errors.service} aria-describedby={errors.service ? "error-service" : undefined}/><span><strong>{serviceLabels[index][0]}</strong><small>{serviceLabels[index][1]}</small></span></label>)}</div>{error("service")}
        <div className={styles.field}><label htmlFor="project-budget">Indicative budget <small>It’s OK to be unsure</small></label><select id="project-budget" name="budget" value={brief.budget} onChange={event => update("budget", event.target.value)} aria-invalid={!!errors.budget} aria-describedby={errors.budget ? "error-budget" : undefined}>{contactBudgets.map(item => <option key={item}>{item}</option>)}</select>{error("budget")}</div>
        <div className={styles.field}><label htmlFor="project-message">What would success look like?</label><textarea id="project-message" name="message" value={brief.message} onChange={event => update("message", event.target.value)} required minLength={10} maxLength={5000} rows={4} placeholder="A little about your business, your goal and any timing…" aria-invalid={!!errors.message} aria-describedby={errors.message ? "error-message" : "message-hint"}/>{error("message")}<small id="message-hint">A few sentences are enough. Please leave out passwords and sensitive information.</small></div>
        {!brief.message && <div className={styles.starters} aria-label="Start your description">{["I’d like more local enquiries. ", "I need a new website for my business. ", "I want to improve our marketing results. "].map(text => <button type="button" key={text} onClick={() => { update("message", text); formRef.current?.querySelector<HTMLElement>("#project-message")?.focus(); }}>{text.trim()} +</button>)}</div>}
      </fieldset>
      <fieldset className={styles.panel} hidden={step !== 1} disabled={locked}><legend className={styles.srOnly}>Contact and location</legend>
        <div className={styles.fields}>{([{ key: "name", label: "Full name", type: "text", auto: "name", max: 150 }, { key: "email", label: "Email address", type: "email", auto: "email", max: 254 }, { key: "phone", label: "Phone number", type: "tel", auto: "tel", max: 40 }, { key: "company", label: "Business name", type: "text", auto: "organization", max: 200 }, { key: "website", label: "Current website", type: "text", auto: "url", max: 2000 }] as const).map(field => <div className={styles.field} key={field.key}><label htmlFor={"project-" + field.key}>{field.label} {!["name", "email"].includes(field.key) && <small>Optional</small>}</label><input id={"project-" + field.key} name={field.key} type={field.type} inputMode={field.key === "website" ? "url" : undefined} value={brief[field.key]} required={field.key === "name" || field.key === "email"} onChange={event => update(field.key, event.target.value)} onBlur={field.key === "website" ? () => update("website", normaliseWebsite(brief.website)) : undefined} autoComplete={field.auto} maxLength={field.max} placeholder={field.key === "website" ? "example.com" : undefined} aria-invalid={!!errors[field.key]} aria-describedby={errors[field.key] ? "error-" + field.key : undefined}/>{error(field.key)}</div>)}</div>
        <BusinessAddress brief={brief} errors={errors} update={update} replaceAddress={replaceAddress} mode={config?.addressMode || "postcode"} disabled={locked}/>
      </fieldset>
      <fieldset className={styles.panel} hidden={step !== 2} disabled={locked}><legend className={styles.srOnly}>Review your brief</legend>
        <section className={styles.reviewSection}><header><h3>Your project</h3><button type="button" onClick={() => goTo(0)}>Edit project</button></header><dl><div><dt>Service</dt><dd>{brief.service}</dd></div><div><dt>Budget</dt><dd>{brief.budget}</dd></div></dl><p className={styles.message}>{brief.message}</p></section>
        <section className={styles.reviewSection}><header><h3>Contact & location</h3><button type="button" onClick={() => goTo(1)}>Edit details</button></header><dl>{[["Name", brief.name], ["Email", brief.email], ["Phone", brief.phone], ["Business", brief.company], ["Website", brief.website], ["Location", [brief.addressLine1, brief.addressLine2, brief.city, brief.region, brief.postcode, brief.country].filter(Boolean).join(", ")]].filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
        <p className={styles.hint}>We’ll use these details to respond to your enquiry. Read our <Link href="/privacy">privacy policy</Link>.</p>
        {step === 2 && config?.turnstileSiteKey && <SecurityCheck onToken={setToken} revision={revision} siteKey={config.turnstileSiteKey}/>}
        {step === 2 && (configFailed || config?.accepting === false) && <div className={styles.notice} role="status">Online sending is unavailable. You can email your completed brief below. <button type="button" onClick={() => setConfigRevision(value => value + 1)}>Try reconnecting</button></div>}
      </fieldset>
      {step === 2 && !config && !configFailed && <p className={styles.hint} role="status">Checking the connection before sending…</p>}
      {feedback && <p className={styles.notice} role={state === "error" ? "alert" : "status"}>{feedback}</p>}
      <div className={styles.actions}>{step > 0 && <button type="button" className="button button-ghost" disabled={locked} onClick={() => goTo(step - 1)}>← Back</button>}<button type="submit" className="button button-primary" disabled={locked || (step === 2 && (!config?.accepting || configFailed))}>{locked ? "Saving your brief…" : step < 2 ? "Continue →" : "Send my project brief ↗"}</button></div>
      <div className={styles.alternative}><a href={mailto}>Prefer email? Send your brief ↗</a><button type="button" disabled={locked} onClick={async () => { try { await navigator.clipboard.writeText(plainBrief); setCopied(true); } catch { setFeedback("Copy is unavailable. You can use the email link or select your text manually."); } }}>{copied ? "Brief copied ✓" : "Copy brief"}</button></div>
    </>}
    <noscript>Please email {site.email}. The guided form needs JavaScript.</noscript>
  </form>;
}
