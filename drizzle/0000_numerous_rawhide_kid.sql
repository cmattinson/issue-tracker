CREATE TABLE "comments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "comments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"issueId" integer NOT NULL,
	"userId" integer NOT NULL,
	"comment" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "issue_priorities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "issue_priorities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "issue_priorities_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "issue_statuses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "issue_statuses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "issue_statuses_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "issue_types" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "issue_types_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "issue_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "issues" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "issues_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"issueTypeId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"userId" integer,
	"issueStatusId" integer NOT NULL,
	"priorityId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_issueTypeId_issue_types_id_fk" FOREIGN KEY ("issueTypeId") REFERENCES "public"."issue_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_issueStatusId_issue_statuses_id_fk" FOREIGN KEY ("issueStatusId") REFERENCES "public"."issue_statuses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_priorityId_issue_priorities_id_fk" FOREIGN KEY ("priorityId") REFERENCES "public"."issue_priorities"("id") ON DELETE no action ON UPDATE no action;