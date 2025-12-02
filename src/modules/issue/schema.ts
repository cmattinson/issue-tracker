import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { issuesTable } from "@/db/schema";

export const InsertIssueSchema = createInsertSchema(issuesTable);
export const SelectIssueSchema = createSelectSchema(issuesTable);

export type InsertIssue = typeof InsertIssueSchema.static;
export type SelectIssue = typeof SelectIssueSchema.static;
