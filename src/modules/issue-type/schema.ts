import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { issueTypesTable } from "@/db/schema";

const BaseInsertIssueTypeSchema = createInsertSchema(issueTypesTable);

export const InsertIssueTypeSchema = BaseInsertIssueTypeSchema;
export const SelectIssueTypeSchema = createSelectSchema(issueTypesTable);

export type InsertIssueType = typeof InsertIssueTypeSchema.static;
export type SelectIssueType = typeof SelectIssueTypeSchema.static;
