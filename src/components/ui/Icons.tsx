import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { name: "chevron" | "menu" | "pause" | "play" };
export function Icon({ name, ...props }: Props) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
    {name === "chevron" && <path d="m6 9 6 6 6-6"/>}
    {name === "menu" && <><path d="M4 8h16M4 16h16"/></>}
    {name === "pause" && <><path d="M9 5v14M15 5v14"/></>}
    {name === "play" && <path d="m8 5 11 7-11 7Z"/>}
  </svg>;
}

export function ArrowIcon({ direction = "right" }: { direction?: "right" | "left" }) {
  return <span className={`wd-arrow${direction === "left" ? " wd-arrow-left" : ""}`} aria-hidden="true">{[0,1].map(index => <svg key={index} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" focusable="false"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>)}</span>;
}

export function CheckIcon({ size = 18 }: { size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m5 12.5 4.2 4.2L19 7"/></svg>;
}

export function SendRocketIcon({ active = false }: { active?: boolean }) {
  return <span className={`send-rocket${active ? " is-active" : ""}`} aria-hidden="true">
    <span className="send-rocket-trails"><i/><i/><i/></span>
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      <path d="M8.4 18.8c1.2-5.5 4.6-10.2 10-14.1l3.1-2.2.1 3.8c.2 6.6-2.2 12-7.1 16.1l-2.2 1.8-1-4.1-4.1-1 1.1-.3Z"/>
      <path d="m10.9 19.8-4.1 3.8.7-4.8M15.8 7.5l5 5"/>
      <circle cx="17.6" cy="9.8" r="2"/>
    </svg>
  </span>;
}
