import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { issuesTable } from "@/db/schema";

const BaseInsertIssueSchema = createInsertSchema(issuesTable);

export const InsertIssueSchema = t.Omit(BaseInsertIssueSchema, [
	"id",
	"createdAt",
	"updatedAt",
]);
export const SelectIssueSchema = createSelectSchema(issuesTable);

export type InsertIssue = typeof InsertIssueSchema.static;
export type SelectIssue = typeof SelectIssueSchema.static;
