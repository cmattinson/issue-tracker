import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { commentsTable } from "@/db/schema";

const BaseInsertCommentSchema = createInsertSchema(commentsTable);

export const InsertCommentSchema = t.Omit(BaseInsertCommentSchema, [
	"id",
	"createdAt",
	"updatedAt",
]);
export const SelectCommentSchema = createSelectSchema(commentsTable);

export type InsertComment = typeof InsertCommentSchema.static;
export type SelectComment = typeof SelectCommentSchema.static;
