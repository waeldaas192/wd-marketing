import { site } from "./site";

// WD Marketing operates as a sole trader. Supply the individual's legal name,
// not the name of a separate company used for payment arrangements.
const operator = process.env.WD_LEGAL_NAME?.trim() || site.name;

export const legal = {
  operator,
  tradingIdentity: operator === site.name ? site.name : `${operator}, trading as ${site.name}`,
  correspondenceAddress: process.env.WD_CORRESPONDENCE_ADDRESS?.trim() || "",
  updated: "11 September 2026",
  email: site.email,
};
