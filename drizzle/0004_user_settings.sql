CREATE TABLE "user_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"currency" text DEFAULT 'usd',
	"date_format" text DEFAULT 'mm-dd-yyyy',
	"fiscal_year" text DEFAULT 'january',
	"theme" text DEFAULT 'light',
	"chart_style" text DEFAULT 'modern',
	"notification_transactions" integer DEFAULT 1,
	"notification_budgets" integer DEFAULT 1,
	"notification_reports" integer DEFAULT 0,
	"two_factor_enabled" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_settings_user_id_unique" UNIQUE("user_id")
);