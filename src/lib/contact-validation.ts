export const contactServices = ["Website / Conversion", "SEO / Organic Growth", "Google Ads / Paid Acquisition", "Analytics / CRM / Automation", "Multiple services"] as const;
export const contactBudgets = ["£1k–£3k", "£3k–£7.5k", "£7.5k–£15k", "£15k+", "Not sure yet"] as const;
export type Brief = { service: string; budget: string; name: string; email: string; company: string; website: string; message: string };
export type BriefErrors = Partial<Record<keyof Brief, string>>;
export const emptyBrief: Brief = { service: "", budget: "", name: "", email: "", company: "", website: "", message: "" };
export function validateBrief(input: unknown): { data: Brief; errors: BriefErrors; valid: boolean } {
  const source = input && typeof input === "object" && !Array.isArray(input) ? input as Record<string, unknown> : {};
  const data = { ...emptyBrief }; const errors: BriefErrors = {};
  for (const key of Object.keys(data) as (keyof Brief)[]) {
    const value = source[key];
    if (value !== undefined && typeof value !== "string") errors[key] = "Enter a text value.";
    data[key] = typeof value === "string" ? value.trim() : "";
  }
  // Accept the two labels used by the original contact API; normalise before delivery.
  if (data.service === "SEO") data.service = "SEO / Organic Growth";
  if (data.budget === "Not sure") data.budget = "Not sure yet";
  if (!contactServices.includes(data.service as typeof contactServices[number])) errors.service = "Choose the service you need.";
  if (!contactBudgets.includes(data.budget as typeof contactBudgets[number])) errors.budget = "Choose a budget, or select Not sure yet.";
  if (!data.name || data.name.length > 150 || /[\r\n\x00]/.test(data.name)) errors.name = "Enter your name (up to 150 characters).";
  if (data.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.company.length > 200 || /[\r\n\x00]/.test(data.company)) errors.company = "Enter a company name of up to 200 characters.";
  if (data.website) {
    try { const url = new URL(data.website); if (!["https:", "http:"].includes(url.protocol) || !url.hostname.includes(".") || url.username || url.password || data.website.length > 2000) throw new Error(); }
    catch { errors.website = "Enter a full website address, for example https://example.com."; }
  }
  if (data.message.length < 10 || data.message.length > 5000 || data.message.includes("\x00")) errors.message = "Describe your goal in 10–5,000 characters.";
  return { data, errors, valid: Object.keys(errors).length === 0 };
}
