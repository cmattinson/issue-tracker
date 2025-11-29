import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	age: integer().notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp(),
});

export const insertUsersSchema = createInsertSchema(usersTable);

export const issuesTable = pgTable("issues", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	title: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	status: varchar({ length: 255 }).notNull(),
	userId: integer()
		.notNull()
		.references(() => usersTable.id),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp(),
});

export const insertIssuesSchema = createInsertSchema(issuesTable);

export const commentsTable = pgTable("comments", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	issueId: integer().notNull(),
	userId: integer().notNull(),
	comment: varchar({ length: 255 }).notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp(),
});

export const insertCommentsSchema = createInsertSchema(commentsTable);
