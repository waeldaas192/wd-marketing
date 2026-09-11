"use client";
import { useEffect, useRef, useState } from "react";
import { normalisePostcode, ukPostcodePattern, type Brief, type BriefErrors } from "@/lib/contact-validation";
import type { AddressResult, AddressOption } from "@/lib/address-types";
import styles from "./ContactForm.module.css";

type Props = { brief: Brief; errors: BriefErrors; update: (key: keyof Brief, value: string) => void; replaceAddress: (address: Partial<Brief>) => void; mode: "addresses" | "postcode"; disabled: boolean };
export function BusinessAddress({ brief, errors, update, replaceAddress, mode, disabled }: Props) {
  const [expanded, setExpanded] = useState(Boolean(brief.addressLine1 || brief.postcode));
  const [loading, setLoading] = useState(false), [notice, setNotice] = useState("");
  const [options, setOptions] = useState<AddressOption[]>([]), [selected, setSelected] = useState("");
  const controller = useRef<AbortController | null>(null), generation = useRef(0);
  const postcodeRef = useRef<HTMLInputElement>(null);
  function cancelLookup() { controller.current?.abort(); generation.current++; setLoading(false); setOptions([]); setSelected(""); setNotice(""); }
  useEffect(() => () => { controller.current?.abort(); generation.current++; }, []);
  useEffect(() => { if (["country", "postcode", "addressLine1", "addressLine2", "city", "region"].some(key => errors[key as keyof Brief])) setExpanded(true); }, [errors]);
  async function lookup() {
    cancelLookup(); const current = generation.current;
    const postcode = normalisePostcode(brief.postcode); update("postcode", postcode);
    if (!ukPostcodePattern.test(postcode)) { setNotice("Enter a complete UK postcode, for example SW1A 1AA."); postcodeRef.current?.focus(); return; }
    const abort = new AbortController(); controller.current = abort; setLoading(true);
    const timer = setTimeout(() => abort.abort(), 12000);
    try {
      const response = await fetch("/api/address-lookup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postcode }), signal: abort.signal });
      const result: AddressResult = await response.json();
      if (current !== generation.current) return;
      if (!response.ok || !result.ok) { setNotice(result.error || "Address search is unavailable. You can enter the address below."); return; }
      if (result.mode === "addresses" && result.addresses?.length) {
        setOptions(result.addresses); setNotice(result.more ? "Choose an address. If yours is not listed, enter it below." : "Choose your business address from the list.");
      } else {
        // Administrative districts are not postal towns. Never silently put
        // an authority such as Westminster into the customer's town field.
        setNotice(`Postcode found${result.district ? ` in ${result.district}` : ""}. Add the street and town below if you would like to share them.`);
      }
    } catch { if (current === generation.current) setNotice("Address search is unavailable. Your entries are safe; enter the address below."); }
    finally { clearTimeout(timer); if (current === generation.current) setLoading(false); }
  }
  function choose(id: string) {
    const address = options.find(item => item.id === id); setSelected(id); if (!address) return;
    replaceAddress({ addressLine1: address.line1, addressLine2: address.line2, city: address.city, region: address.region, postcode: address.postcode, country: address.country });
    setNotice("Address added. You can edit any of the details below.");
  }
  return <div className={styles.address}>
    <button type="button" className={styles.disclosure} aria-expanded={expanded} aria-controls="business-address-fields" disabled={disabled} onClick={() => setExpanded(value => !value)}><span>Business location <small>Optional</small></span><span aria-hidden="true">{expanded ? "−" : "+"}</span></button>
    <div id="business-address-fields" hidden={!expanded}>
      <p className={styles.hint}>Helpful for local SEO and service-area planning. You can skip this section.</p>
      <div className={styles.field}><label htmlFor="project-country">Country</label><input id="project-country" name="country" autoComplete="country-name" list="country-suggestions" value={brief.country} maxLength={100} disabled={disabled} onChange={event => { cancelLookup(); update("country", event.target.value); }} aria-invalid={!!errors.country} aria-describedby={errors.country ? "error-country" : undefined}/><datalist id="country-suggestions"><option value="United Kingdom"/><option value="Ireland"/><option value="United Arab Emirates"/><option value="United States"/></datalist>{errors.country && <span id="error-country" className={styles.error}>{errors.country}</span>}</div>
      <div className={styles.postcodeRow}><div className={styles.field}><label htmlFor="project-postcode">{brief.country === "United Kingdom" ? "UK postcode" : "Postcode / ZIP code"}</label><input ref={postcodeRef} id="project-postcode" name="postcode" autoComplete="postal-code" autoCapitalize="characters" spellCheck={false} maxLength={20} value={brief.postcode} disabled={disabled} onChange={event => { cancelLookup(); update("postcode", event.target.value); }} onKeyDown={event => { if (event.key === "Enter" && brief.country === "United Kingdom") { event.preventDefault(); void lookup(); } }} aria-invalid={!!errors.postcode} aria-describedby={errors.postcode ? "error-postcode" : "address-lookup-notice"}/>{errors.postcode && <span id="error-postcode" className={styles.error}>{errors.postcode}</span>}</div>{brief.country === "United Kingdom" && <button type="button" className={styles.lookup} disabled={disabled || loading} onClick={lookup}>{loading ? "Searching…" : mode === "addresses" ? "Find address" : "Check postcode"}</button>}</div>
      <p id="address-lookup-notice" className={styles.hint} role="status" aria-live="polite">{notice || (brief.country === "United Kingdom" ? mode === "addresses" ? "Search by postcode or enter your address manually." : "Check your postcode and area, then add the address manually." : "Enter your address manually. Postcode search is available for UK addresses.")}</p>
      {options.length > 0 && <div className={styles.field}><label htmlFor="address-results">Choose your address</label><select id="address-results" value={selected} onChange={event => choose(event.target.value)} disabled={disabled}><option value="">Select an address…</option>{options.map(option => <option value={option.id} key={option.id}>{option.label}</option>)}</select></div>}
      <div className={styles.fields}>{([{ key: "addressLine1", label: "Building and street", auto: "address-line1", max: 200 }, { key: "addressLine2", label: "Address line 2", auto: "address-line2", max: 200 }, { key: "city", label: "Town / city", auto: "address-level2", max: 100 }, { key: "region", label: "County / region", auto: "address-level1", max: 100 }] as const).map(field => <div className={styles.field} key={field.key}><label htmlFor={`project-${field.key}`}>{field.label}</label><input id={`project-${field.key}`} name={field.key} value={brief[field.key]} autoComplete={field.auto} maxLength={field.max} disabled={disabled} onChange={event => { cancelLookup(); update(field.key, event.target.value); }} aria-invalid={!!errors[field.key]} aria-describedby={errors[field.key] ? `error-${field.key}` : undefined}/>{errors[field.key] && <span id={`error-${field.key}`} className={styles.error}>{errors[field.key]}</span>}</div>)}</div>
    </div>
  </div>;
}
