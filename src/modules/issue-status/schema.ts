import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { issueStatusTable } from "@/db/schema";

const BaseInsertIssueStatusSchema = createInsertSchema(issueStatusTable);

export const InsertIssueStatusSchema = t.Omit(BaseInsertIssueStatusSchema, [
	"id",
	"createdAt",
	"updatedAt",
]);
export const SelectIssueStatusSchema = createSelectSchema(issueStatusTable);

export type InsertIssueStatus = typeof InsertIssueStatusSchema.static;
export type SelectIssueStatus = typeof SelectIssueStatusSchema.static;
