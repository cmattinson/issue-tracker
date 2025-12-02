import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { usersTable } from "@/db/schema";

const BaseUserSchema = createInsertSchema(usersTable, {
	age: t.Number({
		minimum: 13,
		maximum: 100,
		error: "Age must be between 13 and 100",
	}),
	email: t.String({ format: "email" }),
});

export const InsertUserSchema = t.Omit(BaseUserSchema, [
	"id",
	"createdAt",
	"updatedAt",
]);
export const SelectUserSchema = createSelectSchema(usersTable);
export type InsertUser = typeof InsertUserSchema.static;
export type SelectUser = typeof SelectUserSchema.static;
