import { createElement } from "react";
import nodes from "@/vendor/lucide/nodes.json";

export type LibraryIconName = keyof typeof nodes;
type IconNode = readonly [string, Record<string, string>];
const icons = nodes as unknown as Record<LibraryIconName, readonly IconNode[]>;

/** A local subset of original Lucide SVGs. Source hashes and ISC/MIT notices
 * live in src/vendor/lucide. Geometry is unmodified; only size/colour/stroke vary.
 * Decorative only: the neighbouring heading/link supplies the accessible name. */
export function LibraryIcon({ name, size = 32, className }: {
  name: LibraryIconName;
  size?: number;
  className?: string;
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"
    className={["library-icon", className].filter(Boolean).join(" ")}
    data-icon-library="lucide" data-icon-name={name}>
    {icons[name].map(([tag, attributes], index) => createElement(tag, { ...attributes, key: index }))}
  </svg>;
}
