import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { projectsTable } from "../../db/schema";

const BaseProjectSchema = createInsertSchema(projectsTable);

export const InsertProjectSchema = t.Omit(BaseProjectSchema, [
	"id",
	"createdAt",
	"updatedAt",
]);

export const SelectProjectSchema = createSelectSchema(projectsTable);

export type InsertProject = typeof InsertProjectSchema.static;
export type SelectProject = typeof SelectProjectSchema.static;
