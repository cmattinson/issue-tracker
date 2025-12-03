import { eq } from "drizzle-orm";
import { issuesTable, usersTable } from "@/db/schema";
import { db } from "@/index.ts";
import type { InsertUser, SelectUser } from "./schema";
import type { IssueWithUser } from "../issue/dto";
import type { SelectIssue } from "../issue/schema";

export const UserRepository = {
	async create(data: InsertUser): Promise<SelectUser> {
		const [result] = await db.insert(usersTable).values(data).returning();
		return result as SelectUser;
	},

	async find(id: number): Promise<SelectUser | null> {
		const [row] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, id));

		return row ?? null;
	},

	async list(): Promise<SelectUser[]> {
		return await db.select().from(usersTable);
	},

	async getIssues(id: number): Promise<SelectIssue[]> {
		return await db
			.select()
			.from(issuesTable)
			.where(eq(issuesTable.userId, id));
	},
};
