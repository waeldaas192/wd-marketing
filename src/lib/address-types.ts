export type AddressOption = { id: string; label: string; line1: string; line2: string; city: string; region: string; postcode: string; country: string };
export type AddressResult = {
  ok: boolean; mode?: "addresses" | "postcode"; addresses?: AddressOption[];
  postcode?: string; district?: string; region?: string; more?: boolean;
  error?: string; code?: string;
};
export type ContactConfig = { accepting: boolean; addressMode: "addresses" | "postcode"; turnstileSiteKey?: string };
