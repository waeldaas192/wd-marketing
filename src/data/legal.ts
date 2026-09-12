import { site } from "./site";

// The owner confirmed WAEL DAAS as the sole trader's legal name.
// Use an override only for a subsequently confirmed change of operator.
const operator = process.env.WD_LEGAL_NAME?.trim() || "WAEL DAAS";

export const legal = {
  operator,
  tradingIdentity: operator === site.name ? site.name : `${operator}, trading as ${site.name}`,
  correspondenceAddress: process.env.WD_CORRESPONDENCE_ADDRESS?.trim() || "",
  updated: "11 September 2026",
  email: site.email,
};
