CREATE TABLE `contact_enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`payload_hash` text NOT NULL,
	`reference` text NOT NULL,
	`created_at` integer NOT NULL,
	`service` text NOT NULL,
	`budget` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`company` text NOT NULL,
	`website` text NOT NULL,
	`message` text NOT NULL,
	`country` text NOT NULL,
	`postcode` text NOT NULL,
	`address_line_1` text NOT NULL,
	`address_line_2` text NOT NULL,
	`city` text NOT NULL,
	`region` text NOT NULL,
	CONSTRAINT "contact_message_length" CHECK(length("contact_enquiries"."message") BETWEEN 10 AND 5000),
	CONSTRAINT "contact_name_length" CHECK(length("contact_enquiries"."name") BETWEEN 1 AND 150)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contact_enquiries_reference_unique` ON `contact_enquiries` (`reference`);--> statement-breakpoint
CREATE INDEX `contact_created_at` ON `contact_enquiries` (`created_at`);--> statement-breakpoint
CREATE TABLE `form_rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires_at` integer NOT NULL,
	CONSTRAINT "form_rate_positive" CHECK("form_rate_limits"."count" > 0)
);
--> statement-breakpoint
CREATE INDEX `form_rate_expiry` ON `form_rate_limits` (`expires_at`);