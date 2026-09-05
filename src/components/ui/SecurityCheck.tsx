"use client";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
type Turnstile = { render: (el: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void };
declare global { interface Window { turnstile?: Turnstile } }
export function SecurityCheck({ onToken, revision }: { onToken: (token: string) => void; revision: number }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const container = useRef<HTMLDivElement>(null);
  const callback = useRef(onToken); callback.current = onToken;
  const [ready,setReady] = useState(false);
  const [failed,setFailed] = useState(false);
  useEffect(() => {
    const target=container.current, api=window.turnstile;
    if (!ready || !target || !api || !siteKey) return;
    callback.current(""); setFailed(false);
    const id=api.render(target,{sitekey:siteKey,action:"project-brief",theme:"light",size:"flexible",callback:(token:string)=>callback.current(token),"expired-callback":()=>callback.current(""),"error-callback":()=>{callback.current("");setFailed(true);}});
    return ()=>{api.remove(id);callback.current("");};
  },[ready,siteKey,revision]);
  if (!siteKey) return <p className="form-note">Online delivery is being prepared. You can still write your brief and use the email alternative.</p>;
  return <div className="security-check"><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={()=>setReady(true)} onError={()=>setFailed(true)}/><div ref={container}/>{failed && <p role="alert">Security verification could not load. Please use the email alternative below.</p>}</div>;
}
