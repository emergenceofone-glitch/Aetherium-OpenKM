import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Deterministic number formatter (thousands separator with commas)
 * Guaranteed to produce identical strings across SSR (Node) and CSR (Browser),
 * preventing hydration mismatches caused by locale divergence in toLocaleString.
 */
export function formatNumber(num: number): string {
  if (isNaN(num) || !isFinite(num)) return "0";
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDecimal(num: number, digits: number = 2): string {
  if (isNaN(num) || !isFinite(num)) return "0.00";
  const parts = num.toFixed(digits).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
