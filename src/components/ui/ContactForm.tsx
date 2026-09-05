"use client";
import { FormEvent, useState } from "react";

const services = ["Website / Conversion", "SEO / Organic Growth", "Google Ads / Paid Acquisition", "Analytics / CRM / Automation", "Multiple services"];
const budgets = ["£1k–£3k", "£3k–£7.5k", "£7.5k–£15k", "£15k+", "Not sure yet"];

export function ContactForm(){
  const [state,setState]=useState<"idle"|"loading"|"success"|"error">("idle");
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault(); setState("loading");
    const form=event.currentTarget; const data=Object.fromEntries(new FormData(form).entries());
    try { const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}); if(!response.ok)throw new Error(); setState("success"); form.reset(); } catch { setState("error"); }
  }
  return <form className="project-form" onSubmit={submit}>
    <div className="form-block"><span>01 / What do you need?</span><div className="choice-grid">{services.map(item=><label key={item}><input type="radio" name="service" value={item} required/><b>{item}</b></label>)}</div></div>
    <div className="form-block"><span>02 / Indicative budget</span><div className="choice-grid budget-grid">{budgets.map(item=><label key={item}><input type="radio" name="budget" value={item} required/><b>{item}</b></label>)}</div></div>
    <div className="form-block"><span>03 / Tell us about the business</span><div className="field-grid"><label>Full name<input name="name" required autoComplete="name"/></label><label>Email<input type="email" name="email" required autoComplete="email"/></label><label>Company<input name="company" autoComplete="organization"/></label><label>Website<input type="url" name="website" placeholder="https://"/></label></div><label className="textarea-label">What are you trying to achieve?<textarea name="message" required rows={6}/></label></div>
    <div className="form-submit"><button className="button button-primary" disabled={state==="loading"}>{state==="loading"?"Sending…":"Submit project brief ↗"}</button><p>By submitting, you agree to our privacy policy.</p></div>
    {state==="success"&&<div className="form-status success">Brief received. The form endpoint is working; connect your email/CRM provider before launch to deliver notifications.</div>}
    {state==="error"&&<div className="form-status error">Something went wrong. Email hello@wdmarketing.co.uk instead.</div>}
  </form>
}
