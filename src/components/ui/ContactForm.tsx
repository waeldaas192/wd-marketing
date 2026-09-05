"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { contactBudgets, contactServices, emptyBrief, validateBrief, type Brief, type BriefErrors } from "@/lib/contact-validation";
import { SecurityCheck } from "./SecurityCheck";
import { site } from "@/data/site";
const labels=["Your project","Your details","Your goal"];
const fieldsByStep: (keyof Brief)[][]=[["service","budget"],["name","email","company","website"],["message"]];
export function ContactForm() {
  const [step,setStep]=useState(0),[brief,setBrief]=useState<Brief>({...emptyBrief}),[errors,setErrors]=useState<BriefErrors>({});
  const [state,setState]=useState<"idle"|"loading"|"success"|"error">("idle");
  const [feedback,setFeedback]=useState(""),[token,setToken]=useState(""),[revision,setRevision]=useState(0),[copied,setCopied]=useState(false);
  const formRef=useRef<HTMLFormElement>(null),titleRef=useRef<HTMLHeadingElement>(null),interacted=useRef(false);
  const lastRequest=useRef({signature:"",id:""});
  useEffect(()=>{if(interacted.current) titleRef.current?.focus();},[step]);
  function update(key:keyof Brief,value:string){setBrief(current=>({...current,[key]:value}));setErrors(current=>({...current,[key]:undefined}));setCopied(false);if(state!=="loading")setState("idle");}
  function checkStep(){const result=validateBrief(brief);const issues=Object.fromEntries(fieldsByStep[step].filter(key=>result.errors[key]).map(key=>[key,result.errors[key]])) as BriefErrors;setErrors(issues);return Object.keys(issues).length===0;}
  function next(){interacted.current=true;if(checkStep()){setStep(current=>Math.min(2,current+1));setFeedback("");}else{setFeedback("Check the highlighted fields before continuing.");setState("error");requestAnimationFrame(()=>formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());}}
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();if(state==="loading"||state==="success")return;
    if(step<2){next();return;}
    const validation=validateBrief(brief);
    if(!validation.valid){setErrors(validation.errors);const invalidStep=fieldsByStep.findIndex(fields=>fields.some(key=>validation.errors[key]));interacted.current=true;setStep(Math.max(0,invalidStep));setFeedback("Check the highlighted fields.");setState("error");return;}
    if(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY&&!token){setFeedback("Complete the security check, or use the email alternative below.");setState("error");return;}
    const signature=JSON.stringify(validation.data);
    if(lastRequest.current.signature!==signature)lastRequest.current={signature,id:crypto.randomUUID()};
    setState("loading");setFeedback("");
    try{
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...validation.data,requestId:lastRequest.current.id,turnstileToken:token,websiteCheck:new FormData(event.currentTarget).get("websiteCheck")}),signal:AbortSignal.timeout(25000)});
      const result=await response.json();
      if(!response.ok||result.ok!==true){setFeedback(typeof result.error==="string"?result.error:"Delivery was not confirmed. Please use the email alternative.");setState("error");}
      else{setFeedback("Your brief has been accepted for delivery. Thank you — we will review the details.");setState("success");}
    }catch{setFeedback("Delivery was not confirmed. Your entries are still here. Retry or use the email alternative.");setState("error");}
    finally{setRevision(value=>value+1);}
  }
  const plainBrief=`Service: ${brief.service}\nBudget: ${brief.budget}\nName: ${brief.name}\nEmail: ${brief.email}\nCompany: ${brief.company}\nWebsite: ${brief.website}\n\n${brief.message}`;
  const mailto=`mailto:${site.email}?subject=${encodeURIComponent("WD Marketing project brief")}`;
  const error=(key:keyof Brief)=>errors[key]?<span className="field-error" id={`error-${key}`}>{errors[key]}</span>:null;
  return <form ref={formRef} className="project-form" onSubmit={submit} noValidate aria-busy={state==="loading"} data-project-wizard>
    <ol className="form-progress" aria-label="Project brief progress">{labels.map((label,index)=><li key={label} aria-current={index===step?"step":undefined}><span aria-hidden="true">0{index+1}</span>{label}</li>)}</ol>
    <h2 ref={titleRef} tabIndex={-1} className="form-step-title">{labels[step]}</h2>
    <div className="form-honeypot" aria-hidden="true"><label>Leave this field empty<input name="websiteCheck" tabIndex={-1} autoComplete="off"/></label></div>
    <fieldset className="form-block" hidden={step!==0} disabled={state==="loading"||state==="success"}><legend>What do you need?</legend><div className="choice-grid">{contactServices.map(item=><label key={item}><input type="radio" name="service" value={item} checked={brief.service===item} onChange={()=>update("service",item)} aria-invalid={!!errors.service} aria-describedby={errors.service?"error-service":undefined}/><b>{item}</b></label>)}</div>{error("service")}<p className="form-budget-label">Indicative budget</p><div className="choice-grid">{contactBudgets.map(item=><label key={item}><input type="radio" name="budget" value={item} checked={brief.budget===item} onChange={()=>update("budget",item)} aria-invalid={!!errors.budget} aria-describedby={errors.budget?"error-budget":undefined}/><b>{item}</b></label>)}</div>{error("budget")}</fieldset>
    <fieldset className="form-block" hidden={step!==1} disabled={state==="loading"||state==="success"}><legend>How can we reach you?</legend><div className="field-grid">{([{key:"name",label:"Full name",type:"text",auto:"name",max:150},{key:"email",label:"Email",type:"email",auto:"email",max:254},{key:"company",label:"Company (optional)",type:"text",auto:"organization",max:200},{key:"website",label:"Website (optional)",type:"url",auto:"url",max:2000}] as const).map(field=><label key={field.key}>{field.label}<input name={field.key} type={field.type} value={brief[field.key]} onChange={event=>update(field.key,event.target.value)} autoComplete={field.auto} maxLength={field.max} placeholder={field.key==="website"?"https://example.com":undefined} aria-invalid={!!errors[field.key]} aria-describedby={errors[field.key]?`error-${field.key}`:undefined}/>{error(field.key)}</label>)}</div></fieldset>
    <fieldset className="form-block" hidden={step!==2} disabled={state==="loading"||state==="success"}><legend>What should this project change?</legend><label className="textarea-label">Your goal<textarea name="message" value={brief.message} onChange={event=>update("message",event.target.value)} rows={6} maxLength={5000} aria-invalid={!!errors.message} aria-describedby={errors.message?"error-message":"message-hint"}/>{error("message")}</label><p id="message-hint" className="form-note">Tell us the business goal, what is blocking it and any timeline. Please do not include passwords or sensitive personal information.</p><dl className="brief-summary"><div><dt>Service</dt><dd>{brief.service}</dd></div><div><dt>Budget</dt><dd>{brief.budget}</dd></div><div><dt>Reply to</dt><dd>{brief.email}</dd></div></dl>{step===2&&state!=="success"&&<SecurityCheck onToken={setToken} revision={revision}/>}</fieldset>
    {state!=="success"&&<div className="form-submit">{step>0&&<button type="button" className="button button-ghost" disabled={state==="loading"} onClick={()=>{interacted.current=true;setStep(value=>value-1);setState("idle");setFeedback("");}}>← Back</button>}<button type="submit" className="button button-primary" disabled={state==="loading"}>{state==="loading"?"Sending…":step<2?"Continue →":"Submit project brief ↗"}</button>{step===2&&<p>Read our <Link href="/privacy">privacy policy</Link> before submitting.</p>}</div>}
    {feedback&&<div className="form-status" role={state==="error"?"alert":"status"}>{feedback}</div>}
    <div className="brief-alternative"><p>Prefer email? Copy your brief, then paste it into a message.</p><button type="button" className="button button-ghost" onClick={async()=>{try{await navigator.clipboard.writeText(plainBrief);setCopied(true);}catch{setFeedback("Copy is unavailable in this browser. Your entries remain in the form.");setState("error");}}}>{copied?"Brief copied":"Copy brief"}</button><a href={mailto}>Email {site.email} ↗</a></div>
    <noscript>Please email {site.email}. The guided form needs JavaScript.</noscript>
  </form>;
}
