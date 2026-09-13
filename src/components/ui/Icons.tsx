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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      <path d="M12 15 9 12a22 22 0 0 1 2-3.95A12.87 12.87 0 0 1 22 2c0 2.72-.78 7.5-6.05 11A22.35 22.35 0 0 1 12 15Z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      <path d="M5.25 16.4c-1.7 1.45-2.25 5.1-2.25 5.1s3.65-.55 5.1-2.25c.74-.87.73-2.17-.03-2.93a2.03 2.03 0 0 0-2.82.08Z"/>
      <circle cx="16" cy="8" r="1.6"/>
    </svg>
  </span>;
}
