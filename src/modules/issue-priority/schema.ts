import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { issuePrioritiesTable } from "@/db/schema";

const BaseInsertIssuePrioritySchema = createInsertSchema(issuePrioritiesTable);

export const InsertIssuePrioritySchema = t.Omit(BaseInsertIssuePrioritySchema, [
	"id",
	"createdAt",
	"updatedAt",
]);
export const SelectIssuePrioritySchema =
	createSelectSchema(issuePrioritiesTable);

export type InsertIssuePriority = typeof InsertIssuePrioritySchema.static;
export type SelectIssuePriority = typeof SelectIssuePrioritySchema.static;
