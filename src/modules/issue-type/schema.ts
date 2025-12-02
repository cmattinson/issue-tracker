import { createSelectSchema } from "drizzle-typebox";
import { issueTypesTable } from "@/db/schema";

export const SelectIssueTypeSchema = createSelectSchema(issueTypesTable);
export type SelectIssueType = typeof SelectIssueTypeSchema.static;
