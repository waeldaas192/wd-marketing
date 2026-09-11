import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, index, check } from "drizzle-orm/sqlite-core";

export const contactEnquiries = sqliteTable("contact_enquiries", {
  id: text("id").primaryKey(),
  payloadHash: text("payload_hash").notNull(),
  reference: text("reference").notNull().unique(),
  createdAt: integer("created_at").notNull(),
  service: text("service").notNull(), budget: text("budget").notNull(),
  name: text("name").notNull(), email: text("email").notNull(),
  phone: text("phone").notNull(), company: text("company").notNull(),
  website: text("website").notNull(), message: text("message").notNull(),
  country: text("country").notNull(), postcode: text("postcode").notNull(),
  addressLine1: text("address_line_1").notNull(), addressLine2: text("address_line_2").notNull(),
  city: text("city").notNull(), region: text("region").notNull(),
}, table => [
  index("contact_created_at").on(table.createdAt),
  check("contact_message_length", sql`length(${table.message}) BETWEEN 10 AND 5000`),
  check("contact_name_length", sql`length(${table.name}) BETWEEN 1 AND 150`),
]);
export const formRateLimits = sqliteTable("form_rate_limits", {
  key: text("key").primaryKey(),
  count: integer("count").notNull(),
  expiresAt: integer("expires_at").notNull(),
}, table => [
  index("form_rate_expiry").on(table.expiresAt),
  check("form_rate_positive", sql`${table.count} > 0`),
]);

export const contactEmailOutbox = sqliteTable("contact_email_outbox", {
  id: text("id").primaryKey(),
  enquiryId: text("enquiry_id").notNull().references(() => contactEnquiries.id, { onDelete: "cascade" }),
  kind: text("kind").notNull(),
  // Frozen JSON preserves identical content across provider-idempotent retries.
  // Cleared after provider acceptance to avoid retaining another copy of the brief.
  payload: text("payload").notNull(),
  status: text("status").notNull().default("pending"),
  attempts: integer("attempts").notNull().default(0),
  createdAt: integer("created_at").notNull(),
  firstAttemptAt: integer("first_attempt_at"),
  nextAttemptAt: integer("next_attempt_at").notNull(),
  providerId: text("provider_id"),
  acceptedAt: integer("accepted_at"),
  lastError: text("last_error"),
}, table => [
  index("contact_email_due").on(table.status, table.nextAttemptAt, table.createdAt),
  index("contact_email_enquiry").on(table.enquiryId),
  check("contact_email_kind", sql`${table.kind} IN ('notification','confirmation')`),
  check("contact_email_status", sql`${table.status} IN ('pending','sending','accepted','review')`),
  check("contact_email_attempts", sql`${table.attempts} BETWEEN 0 AND 3`),
]);
