export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="46" height="46" rx="13" stroke="currentColor" strokeOpacity=".2" />
      <path d="M10 15l6.6 18L24 17l7.4 16L38 15" stroke="currentColor" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="38" cy="15" r="2.2" fill="currentColor" />
    </svg>
  );
}
