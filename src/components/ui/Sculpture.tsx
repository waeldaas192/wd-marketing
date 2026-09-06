import { useId } from "react";

type Kind = "plane" | "search" | "browser" | "layers";

/** Decorative vector sculptures: no image downloads, client loop or semantic content. */
export function Sculpture({ kind }: { kind: Kind }) {
  const id = `studio-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const paint = (name: string) => `url(#${id}-${name})`;
  return <span className="studio-object" data-studio-object={kind} aria-hidden="true">
    <svg viewBox="0 0 240 210" width="240" height="210" fill="none" focusable="false">
      <defs>
        <linearGradient id={`${id}-violet`} x1="44" y1="36" x2="183" y2="190" gradientUnits="userSpaceOnUse"><stop stopColor="#C0A4FF"/><stop offset=".3" stopColor="#9954ED"/><stop offset=".65" stopColor="#7430D2"/><stop offset="1" stopColor="#442088"/></linearGradient>
        <linearGradient id={`${id}-edge`} x1="70" y1="30" x2="150" y2="185" gradientUnits="userSpaceOnUse"><stop stopColor="#AF86F4"/><stop offset=".4" stopColor="#6931BE"/><stop offset="1" stopColor="#341568"/></linearGradient>
        <linearGradient id={`${id}-face`} x1="34" y1="40" x2="197" y2="160" gradientUnits="userSpaceOnUse"><stop stopColor="#AF80FF"/><stop offset=".48" stopColor="#823BD9"/><stop offset="1" stopColor="#4B1E97"/></linearGradient>
        <linearGradient id={`${id}-glass`} x1="30" y1="40" x2="180" y2="180" gradientUnits="userSpaceOnUse"><stop stopColor="#FFFFFF" stopOpacity=".95"/><stop offset="1" stopColor="#D4DCFF" stopOpacity=".75"/></linearGradient>
        <radialGradient id={`${id}-cyan`} cx=".3" cy=".25" r=".8"><stop stopColor="#D0FFF0"/><stop offset=".42" stopColor="#7CD9E3"/><stop offset="1" stopColor="#4698CA"/></radialGradient>
        <radialGradient id={`${id}-peach`} cx=".25" cy=".2" r=".85"><stop stopColor="#FFF1C6"/><stop offset=".5" stopColor="#FFC690"/><stop offset="1" stopColor="#EA968C"/></radialGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="7"/></filter>
      </defs>
      <ellipse cx="127" cy="185" rx="66" ry="9" fill="#483479" opacity=".19" filter={paint("shadow")}/>
      <g className="studio-object-body">
        {kind === "plane" && <>
          <path d="M31 111 208 37Q218 33 217 44l-25 126q-2 11-12 7l-57-25-33 19q-7 4-10-4l-8-37-34-3q-9-1-7-16Z" fill={paint("edge")}/>
          <path d="M29 104 207 31q9-4 9 6l-26 124q-2 9-10 5l-57-25-35 22-14-43-36-3q-10-1-9-13Z" fill={paint("violet")}/>
          <path d="m32 105 177-72-134 86-38-3q-9-1-5-11Z" fill={paint("face")}/>
          <path d="m76 120 134-86-93 105-27 24Z" fill="#54259F"/>
          <path d="m91 159 26-41 93-84-87 106Z" fill="#B285F3"/>
          <path d="m116 118 94-84-23 126q-1 7-8 4Z" fill={paint("face")}/>
          <path d="m35 103 171-70M120 118l66 44M78 121l11 37" stroke="#E2CFFF" strokeOpacity=".46" strokeWidth="1.6" strokeLinecap="round"/>
        </>}
        {kind === "search" && <>
          <path d="m140 119 43 43q9 10 2 18-8 9-17 0l-44-43Z" fill={paint("edge")}/>
          <path d="m137 111 43 44q8 9 0 16-6 7-14-1l-43-43Z" fill={paint("violet")}/>
          <ellipse cx="103" cy="92" rx="53" ry="57" transform="rotate(-20 103 92)" fill={paint("edge")}/>
          <ellipse cx="100" cy="85" rx="52" ry="56" transform="rotate(-20 100 85)" fill={paint("violet")}/>
          <ellipse cx="100" cy="85" rx="33" ry="37" transform="rotate(-20 100 85)" fill={paint("glass")}/>
          <path d="M66 53c14-17 33-21 52-12M80 68c8-9 18-12 30-10" stroke="#F0E6FF" strokeWidth="4" strokeLinecap="round" strokeOpacity=".85"/>
          <path d="m144 132 24 25" stroke="#D4B0FF" strokeWidth="3" strokeLinecap="round" strokeOpacity=".6"/>
        </>}
        {kind === "browser" && <>
          <path d="m48 43 143 14q11 1 11 13v100q0 12-13 10L47 160q-10-2-10-12V54q0-12 11-11Z" fill={paint("edge")}/>
          <path d="m41 35 142 15q12 1 12 13v99q0 11-12 9L40 152q-11-2-11-13V46q0-12 12-11Z" fill={paint("violet")}/>
          <path d="m40 66 144 15v76L40 139Z" fill={paint("glass")}/>
          <path d="m41 36 139 15" stroke="#E7D4FF" strokeOpacity=".8" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="43" cy="52" r="3" fill="#F9E9FF"/><circle cx="54" cy="53" r="3" fill="#D9B7FA"/><circle cx="65" cy="54" r="3" fill="#C8A1F3"/>
          <path d="m55 86 76 8m-76 6 103 11m-103 7 58 6" stroke="#AB9BD8" strokeWidth="5" strokeLinecap="round"/>
          <path d="m145 117 21 7-8 6-3 12Z" fill="#6B37C8"/><path d="m47 145 129 17" stroke="#51249B" strokeWidth="2"/>
        </>}
        {kind === "layers" && <>
          <path d="m30 134 83-36q9-4 17 0l79 37q8 4 0 9l-77 39q-11 6-20 1l-82-40q-8-4 0-10Z" fill={paint("edge")}/>
          <path d="m30 127 83-36q9-4 17 0l79 37q8 4 0 9l-77 39q-11 6-20 1l-82-40q-8-4 0-10Z" fill={paint("violet")}/>
          <path d="m38 99 77-34q8-4 16 0l69 34q8 4 0 9l-70 34q-9 5-18 0l-74-33q-8-5 0-10Z" fill={paint("edge")}/>
          <path d="m38 91 77-34q8-4 16 0l69 34q8 4 0 9l-70 34q-9 5-18 0l-74-33q-8-5 0-10Z" fill={paint("glass")}/>
          <path d="m46 62 69-31q9-4 17 0l60 30q8 4 0 9l-62 30q-9 4-17 0L46 72q-9-5 0-10Z" fill={paint("violet")}/>
          <path d="m55 63 63-27M41 128l74 36" stroke="#DAC4FF" strokeOpacity=".75" strokeWidth="2" strokeLinecap="round"/>
          <path d="m91 66 19-8 10 10 22-20m-12-1 12 1 1 9" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </>}
      </g>
      <circle className="studio-object-satellite" cx="209" cy="106" r="12" fill={paint("cyan")}/>
      <circle cx="42" cy="44" r="6" fill={paint("peach")}/>
    </svg>
  </span>;
}
