import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp(),
	name: varchar({ length: 255 }).notNull(),
	age: integer().notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
});

export const issueTypesTable = pgTable("issue_types", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull().unique(),
});

export const issuePrioritiesTable = pgTable("issue_priorities", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull().unique(),
});

export const issuesTable = pgTable("issues", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	issueTypeId: integer()
		.notNull()
		.references(() => issueTypesTable.id),
	title: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	status: varchar({ length: 255 }).notNull(),
	userId: integer()
		.notNull()
		.references(() => usersTable.id),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp(),
});

export const commentsTable = pgTable("comments", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	issueId: integer().notNull(),
	userId: integer().notNull(),
	comment: varchar({ length: 255 }).notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp(),
});
