"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
const services = ["Website / Conversion", "SEO / Organic Growth", "Google Ads / Paid Acquisition", "Analytics / CRM / Automation", "Multiple services"];
const budgets = ["£1k–£3k", "£3k–£7.5k", "£7.5k–£15k", "£15k+", "Not sure yet"];
export function ContactForm() {
  const [state,setState] = useState<"idle"|"loading"|"success"|"error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (state === "loading") return;
    setState("loading"); const form = event.currentTarget;
    try { const response = await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))}); const result = await response.json(); if (!response.ok || result.ok !== true) throw new Error("Delivery not confirmed"); setState("success"); form.reset(); } catch { setState("error"); }
  }
  return <form className="project-form" onSubmit={submit} aria-busy={state === "loading"}>
    <fieldset className="form-block"><legend>01 / What do you need?</legend><div className="choice-grid">{services.map(item => <label key={item}><input type="radio" name="service" value={item} required/><b>{item}</b></label>)}</div></fieldset>
    <fieldset className="form-block"><legend>02 / Indicative budget</legend><div className="choice-grid">{budgets.map(item => <label key={item}><input type="radio" name="budget" value={item} required/><b>{item}</b></label>)}</div></fieldset>
    <fieldset className="form-block"><legend>03 / Tell us about the business</legend><div className="field-grid"><label>Full name<input name="name" required autoComplete="name" maxLength={150}/></label><label>Email<input type="email" name="email" required autoComplete="email" maxLength={254}/></label><label>Company<input name="company" autoComplete="organization" maxLength={200}/></label><label>Website<input type="url" name="website" placeholder="https://" maxLength={2000}/></label></div><label className="textarea-label">What are you trying to achieve?<textarea name="message" required rows={6} maxLength={5000}/></label></fieldset>
    <div className="form-submit"><button type="submit" className="button button-primary" disabled={state === "loading"}>{state === "loading" ? "Sending…" : "Submit project brief ↗"}</button><p>Read our <Link href="/privacy">privacy policy</Link> before submitting.</p></div>
    {state === "success" && <div className="form-status" role="status">Your brief has been sent.</div>}
    {state === "error" && <div className="form-status" role="alert">Your brief was not sent. Your entries are still here. Please email <a href="mailto:hello@wdmarketing.co.uk">hello@wdmarketing.co.uk</a> instead.</div>}
  </form>;
}
