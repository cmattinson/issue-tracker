import { sql } from "drizzle-orm";
import {
	integer,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid ()`),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp(),
	name: varchar({ length: 255 }).notNull(),
	age: integer().notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
});

export const issueTypesTable = pgTable("issue_types", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp(),
	name: varchar({ length: 255 }).notNull().unique(),
});

export const issuePrioritiesTable = pgTable("issue_priorities", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp(),
	name: varchar({ length: 255 }).notNull().unique(),
});

export const issueStatusTable = pgTable("issue_statuses", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp(),
	name: varchar({ length: 255 }).notNull().unique(),
});

export const issuesTable = pgTable("issues", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid ()`),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp(),
	issueTypeId: integer()
		.notNull()
		.references(() => issueTypesTable.id),
	title: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	userId: uuid().references(() => usersTable.id),
	issueStatusId: integer()
		.notNull()
		.references(() => issueStatusTable.id),
	priorityId: integer()
		.notNull()
		.references(() => issuePrioritiesTable.id),
});

export const commentsTable = pgTable("comments", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp(),
	issueId: uuid()
		.notNull()
		.references(() => issuesTable.id),
	userId: uuid()
		.notNull()
		.references(() => usersTable.id),
	comment: varchar({ length: 255 }).notNull(),
});
