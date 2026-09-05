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
export function ArrowIcon() {
  return <span className="wd-arrow" aria-hidden="true">{[0,1].map(index => <svg key={index} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" focusable="false"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>)}</span>;
}
