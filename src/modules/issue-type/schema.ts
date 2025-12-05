import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { issueTypesTable } from "@/db/schema";

const BaseInsertIssueTypeSchema = createInsertSchema(issueTypesTable);

export const InsertIssueTypeSchema = t.Omit(BaseInsertIssueTypeSchema, [
	"id",
	"createdAt",
	"updatedAt",
]);
export const SelectIssueTypeSchema = createSelectSchema(issueTypesTable);

export type InsertIssueType = typeof InsertIssueTypeSchema.static;
export type SelectIssueType = typeof SelectIssueTypeSchema.static;
