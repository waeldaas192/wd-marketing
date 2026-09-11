import { site } from "./site";
export const legal = {
  operator: process.env.WD_LEGAL_NAME || site.name,
  correspondenceAddress: process.env.WD_CORRESPONDENCE_ADDRESS || "",
  companyNumber: process.env.WD_COMPANY_NUMBER || "",
  updated: "11 September 2026",
  email: site.email,
};
