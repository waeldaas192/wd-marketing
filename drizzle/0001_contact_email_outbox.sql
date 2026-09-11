CREATE TABLE `contact_email_outbox` (
	`id` text PRIMARY KEY NOT NULL,
	`enquiry_id` text NOT NULL,
	`kind` text NOT NULL,
	`payload` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`first_attempt_at` integer,
	`next_attempt_at` integer NOT NULL,
	`provider_id` text,
	`accepted_at` integer,
	`last_error` text,
	FOREIGN KEY (`enquiry_id`) REFERENCES `contact_enquiries`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "contact_email_kind" CHECK("contact_email_outbox"."kind" IN ('notification','confirmation')),
	CONSTRAINT "contact_email_status" CHECK("contact_email_outbox"."status" IN ('pending','sending','accepted','review')),
	CONSTRAINT "contact_email_attempts" CHECK("contact_email_outbox"."attempts" BETWEEN 0 AND 3)
);
--> statement-breakpoint
CREATE INDEX `contact_email_due` ON `contact_email_outbox` (`status`,`next_attempt_at`,`created_at`);--> statement-breakpoint
CREATE INDEX `contact_email_enquiry` ON `contact_email_outbox` (`enquiry_id`);