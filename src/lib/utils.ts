import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Shared shadcn-compatible class composition without conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
