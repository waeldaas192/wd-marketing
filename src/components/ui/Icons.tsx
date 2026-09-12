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

export function SendRocketIcon({ active = false }: { active?: boolean }) {
  return <span className={`wd-send-rocket${active ? " is-launching" : ""}`} aria-hidden="true">
    <span className="wd-send-air wd-send-air-one"/>
    <span className="wd-send-air wd-send-air-two"/>
    <span className="wd-send-air wd-send-air-three"/>
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      <path d="M18.1 5.2c3.8-2.1 7.2-2.4 8.7-1.2 1.3 1.2 1 4.7-1.1 8.5-1.6 2.9-4 5.8-6.9 8.5l-4.1-4.1-4.1-4.1c2.7-2.9 5.6-5.3 8.5-6.9Z"/>
      <path d="m11.3 13-5.4 1.6-2.3 3 6.1 1.2M18.6 20.7 17 26.1l-3 2.3-1.2-6.1"/>
      <circle cx="21.4" cy="9.2" r="2.25"/>
      <path d="M8.4 23.6 4.8 27.2M10.8 25.8 8.3 28.3"/>
    </svg>
  </span>;
}
