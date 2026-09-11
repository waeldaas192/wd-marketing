export const contactServices = ["Website / Conversion", "SEO / Organic Growth", "Google Ads / Paid Acquisition", "Analytics / CRM / Automation", "Multiple services"] as const;
export const contactBudgets = ["£1k–£3k", "£3k–£7.5k", "£7.5k–£15k", "£15k+", "Not sure yet"] as const;
export type Brief = { service: string; budget: string; name: string; email: string; phone: string; company: string; website: string; message: string; country: string; postcode: string; addressLine1: string; addressLine2: string; city: string; region: string };
export type BriefErrors = Partial<Record<keyof Brief, string>>;
export const emptyBrief: Brief = { service: "", budget: "Not sure yet", name: "", email: "", phone: "", company: "", website: "", message: "", country: "United Kingdom", postcode: "", addressLine1: "", addressLine2: "", city: "", region: "" };
export const ukPostcodePattern = /^(GIR 0AA|[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2})$/;
export function normalisePostcode(value: string) {
  const compact = value.trim().toUpperCase().replace(/\s/g, "");
  return compact.length > 3 ? `${compact.slice(0, -3)} ${compact.slice(-3)}` : compact;
}
export function normaliseWebsite(value: string) {
  const clean = value.trim();
  return clean && !/^[a-z][a-z\d+.-]*:/i.test(clean) ? `https://${clean}` : clean;
}
export function formatBrief(data: Brief) {
  return [`Service: ${data.service}`, `Budget: ${data.budget}`, `Name: ${data.name}`, `Email: ${data.email}`, data.phone && `Phone: ${data.phone}`, data.company && `Company: ${data.company}`, data.website && `Website: ${data.website}`, `Location: ${[data.addressLine1, data.addressLine2, data.city, data.region, data.postcode, data.country].filter(Boolean).join(", ")}`, "", data.message].join("\n");
}
export function validateBrief(input: unknown): { data: Brief; errors: BriefErrors; valid: boolean } {
  const source = input && typeof input === "object" && !Array.isArray(input) ? input as Record<string, unknown> : {};
  const data = { ...emptyBrief }; const errors: BriefErrors = {};
  for (const key of Object.keys(data) as (keyof Brief)[]) {
    const value = source[key];
    if (value !== undefined && typeof value !== "string") errors[key] = "Enter a text value.";
    data[key] = typeof value === "string" ? value.trim() : emptyBrief[key];
  }
  // Accept the two labels used by the original contact API; normalise before delivery.
  if (data.service === "SEO") data.service = "SEO / Organic Growth";
  if (data.budget === "Not sure") data.budget = "Not sure yet";
  data.website = normaliseWebsite(data.website);
  if (data.country === "United Kingdom") data.postcode = normalisePostcode(data.postcode);
  if (!contactServices.includes(data.service as typeof contactServices[number])) errors.service = "Choose the service you need.";
  if (!contactBudgets.includes(data.budget as typeof contactBudgets[number])) errors.budget = "Choose a budget, or select Not sure yet.";
  if (!data.name || data.name.length > 150 || /[\r\n\x00]/.test(data.name)) errors.name = "Enter your name (up to 150 characters).";
  if (data.email.length > 254 || /[\x00-\x1f\x7f]/.test(data.email) || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.company.length > 200 || /[\r\n\x00]/.test(data.company)) errors.company = "Enter a company name of up to 200 characters.";
  if (data.phone && (data.phone.length > 40 || !/^[+\d\s().-]+$/.test(data.phone) || data.phone.replace(/\D/g, "").length < 7 || data.phone.replace(/\D/g, "").length > 15)) errors.phone = "Enter a phone number, including the country code if outside the UK.";
  for (const key of ["country", "city", "region", "addressLine1", "addressLine2", "postcode"] as const) {
    const limit = key === "postcode" ? 20 : key.startsWith("address") ? 200 : 100;
    if (data[key].length > limit || /[\r\n\x00]/.test(data[key])) errors[key] = `Use up to ${limit} characters.`;
  }
  if (!data.country) errors.country = "Enter your country.";
  if (data.country === "United Kingdom" && data.postcode && !ukPostcodePattern.test(data.postcode)) errors.postcode = "Enter a complete UK postcode, for example SW1A 1AA.";
  if (data.website) {
    try { const url = new URL(data.website); if (!["https:", "http:"].includes(url.protocol) || !url.hostname.includes(".") || url.username || url.password || data.website.length > 2000) throw new Error(); }
    catch { errors.website = "Enter a full website address, for example https://example.com."; }
  }
  if (data.message.length < 10 || data.message.length > 5000 || data.message.includes("\x00")) errors.message = "Describe your goal in 10–5,000 characters.";
  return { data, errors, valid: Object.keys(errors).length === 0 };
}
