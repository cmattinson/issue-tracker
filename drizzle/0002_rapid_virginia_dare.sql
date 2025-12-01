ALTER TABLE "issues" RENAME COLUMN "typeId" TO "issueTypeId";--> statement-breakpoint
ALTER TABLE "issues" DROP CONSTRAINT "issues_typeId_issue_types_id_fk";
--> statement-breakpoint
ALTER TABLE "issues" ADD CONSTRAINT "issues_issueTypeId_issue_types_id_fk" FOREIGN KEY ("issueTypeId") REFERENCES "public"."issue_types"("id") ON DELETE no action ON UPDATE no action;