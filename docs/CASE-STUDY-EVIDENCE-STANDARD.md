# Case-study results: evidence and publication standard

## Proof before claims

Do **not** present campaign-platform leads as qualified enquiries, booked appointments, sales or revenue unless independent client-side evidence confirms the definition. A campaign screenshot only supports the metrics, selected scope and date settings visible on that screen. It does not establish account ownership, WD Marketing's role, the underlying lead quality or permission to publish.

## Private evidence ledger (must remain off public GitHub)

1. Confirm the client, account and campaign identity.
2. Obtain permission to publish the exact metrics and client name.
3. Capture the exact reporting start/end dates and timezone; never infer dates from a "Maximum" filter.
4. Record the platform's metric definition and its limitations (e.g. Meta lead vs CRM-qualified enquiry).
5. Record source screenshot, capture date, raw report reference and authorised reviewer.
6. Confirm what work WD Marketing actually performed on this campaign.
7. Separate platform attribution from independently tracked revenue, appointments and sales.
8. Record explicit publication sign-off and evidence reference.

**Confidentiality:** Client spend, ad account identifiers, personal contacts and unapproved screenshots must not be committed to this public repository, even in draft pull requests. Store them in access-controlled client records.

## Code

`VerifiedProjectResult` from `src/data/projects.ts` requires label, value, source, reporting period, evidence reference and `approvalStatus: "approved"`. The approval status must reflect genuine verified sign-off, not a placeholder. An empty or absent `verifiedResults` array displays nothing.

Historic MB Legacy Roofing PageSpeed lab snapshot metrics remain separate and retain their existing caveat; never interpret lab scores or SEO route counts as enquiries.

## Review checklist

- Source and exact reporting period visible in the case study.
- Numeric claim consistent with source without added promises or inferred causality.
- No invented testimonials, awards, ad results, conversions or rankings.
- Baseline and comparable period documented for any uplift percentage.
- Correct accessibility, image ownership and personal-data redaction.
- Client approval recorded before merging public claims.
