import { formatBrief, type Brief } from "./contact-validation";

const home = "https://wdmarketing.co.uk";
export const contactMailbox = "hello@wdmarketing.co.uk";
const from = `WD Marketing <${contactMailbox}>`;
export type EmailKind = "notification" | "confirmation";
export type ContactEmail = { from: string; to: string[]; reply_to: string; subject: string; html: string; text: string; headers: Record<string, string> };
const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);

function frame(title: string, preview: string, content: string, reference: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title></head>
<body style="margin:0;padding:0;background:#f4f5fc;color:#202336;font-family:Arial,Helvetica,sans-serif">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${escape(preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5fc"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e3e5f2;border-radius:20px;overflow:hidden">
<tr><td style="height:6px;background:#5145cd;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:30px 28px 24px"><a href="${home}" style="color:#202336;text-decoration:none"><img src="${home}/images/brand/wd-marketing-ribbon-mark.png" width="76" height="38" alt="WD" style="display:block;border:0;width:76px;height:auto"><span style="display:block;padding-top:10px;font-size:20px;font-weight:700">WD Marketing</span></a></td></tr>
<tr><td style="padding:0 28px 28px"><p style="margin:0 0 12px;color:#5145cd;font-size:12px;font-weight:700;letter-spacing:1.5px">YOUR NEXT CHAPTER</p>
<h1 style="margin:0 0 20px;font-size:30px;line-height:1.2;letter-spacing:-.7px">${escape(title)}</h1>
${content}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:#f0f0fe;border-radius:12px"><tr><td style="padding:18px"><span style="color:#62667b;font-size:12px">ENQUIRY REFERENCE</span><br><strong style="display:inline-block;margin-top:7px;font-size:15px;color:#4338b6;word-break:break-all">${escape(reference)}</strong></td></tr></table>
<p style="margin:24px 0 0;font-size:15px;line-height:1.7">Wael &amp; the WD Marketing team<br><a href="mailto:${contactMailbox}" style="color:#4338b6">${contactMailbox}</a></p></td></tr>
<tr><td style="padding:20px 28px;background:#f9faff;border-top:1px solid #eceef8;color:#62667b;font-size:12px;line-height:1.8">Web design &middot; SEO &middot; Google Ads<br><a href="${home}" style="color:#4338b6">wdmarketing.co.uk</a> &nbsp;&middot;&nbsp; <a href="${home}/privacy" style="color:#62667b">Privacy</a></td></tr>
</table></td></tr></table></body></html>`;
}

export function contactEmails(data: Brief, reference: string): Record<EmailKind, ContactEmail> {
  const headers = { "Auto-Submitted": "auto-generated", "X-Auto-Response-Suppress": "All" };
  const details = formatBrief(data);
  const notificationTitle = "A new project starts here.";
  const confirmationTitle = "Your brief is with us.";
  return {
    notification: {
      from, to: [contactMailbox], reply_to: data.email, headers,
      subject: `New project enquiry | ${reference}`,
      text: `WD Marketing\nNew project enquiry\nReference: ${reference}\n\n${details}\n\nReply to this email to contact the customer.`,
      html: frame(notificationTitle, `New enquiry · ${reference}`, `<p style="font-size:16px;line-height:1.7">A project brief has been saved. Reply to this email to contact the customer.</p><div style="padding:20px;background:#f8f9fe;border:1px solid #e8eaf5;border-radius:12px;font-size:15px;line-height:1.8;overflow-wrap:anywhere;word-break:break-word">${escape(details).replace(/\n/g, "<br>")}</div>`, reference),
    },
    confirmation: {
      from, to: [data.email], reply_to: contactMailbox, headers,
      subject: `We've received your enquiry | ${reference}`,
      // Deliberately exclude free-text names, messages and URLs from the automatic
      // reply: a public form must not relay arbitrary content to another person.
      text: `WD Marketing\n\nYour brief is with us.\n\nThank you for getting in touch. We have received your project enquiry and will review the details before getting back to you.\n\nReference: ${reference}\n\nWant to add something? Reply to this email and include your reference.\n\nWael & the WD Marketing team\n${contactMailbox}\n${home}\n\nIf you did not submit an enquiry, you can ignore this message.`,
      html: frame(confirmationTitle, "Thank you for getting in touch with WD Marketing.", `<p style="margin:0 0 18px;font-size:16px;line-height:1.8">Thank you for getting in touch. We have received your project enquiry and will review the details before getting back to you.</p><p style="margin:0 0 18px;font-size:16px;line-height:1.8">Want to add something? Simply reply to this email and include your reference.</p><p style="margin:0;font-size:13px;line-height:1.7;color:#62667b">If you did not submit an enquiry, you can ignore this message.</p>`, reference),
    },
  };
}
