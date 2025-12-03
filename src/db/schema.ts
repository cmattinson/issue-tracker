import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp(),
	name: varchar({ length: 255 }).notNull(),
	age: integer().notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
});

export const projectsTable = pgTable("projects", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp(),
	name: varchar({ length: 255 }).notNull(),
	key: varchar({ length: 6 }).notNull().unique(),
	description: varchar({ length: 255 }).notNull(),
	ownerId: integer().references(() => usersTable.id),
});

export const issueTypesTable = pgTable("issue_types", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp(),
	name: varchar({ length: 255 }).notNull().unique(),
});

export const issuePrioritiesTable = pgTable("issue_priorities", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp(),
	name: varchar({ length: 255 }).notNull().unique(),
});

export const issueStatusTable = pgTable("issue_statuses", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp(),
	name: varchar({ length: 255 }).notNull().unique(),
});

export const issuesTable = pgTable("issues", {
	id: varchar({ length: 25 }).primaryKey().notNull().unique(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp(),
	projectId: integer()
		.notNull()
		.references(() => projectsTable.id),
	issueTypeId: integer()
		.notNull()
		.references(() => issueTypesTable.id),
	title: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	userId: integer().references(() => usersTable.id),
	issueStatusId: integer()
		.notNull()
		.references(() => issueStatusTable.id),
	priorityId: integer()
		.notNull()
		.references(() => issuePrioritiesTable.id),
});

export const commentsTable = pgTable("comments", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp(),
	issueId: varchar({ length: 25 })
		.notNull()
		.references(() => issuesTable.id),
	userId: integer()
		.notNull()
		.references(() => usersTable.id),
	comment: varchar({ length: 255 }).notNull(),
});
