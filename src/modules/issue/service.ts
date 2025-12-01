import { status } from "elysia";
import { db } from "../../index.ts";
import { issuesTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import type { InsertIssue, SelectIssue } from "./schema";

export const IssueService = {
	async create(data: InsertIssue): Promise<SelectIssue> {
		const [result] = await db.insert(issuesTable).values(data).returning();
		return result as SelectIssue;
	},
	async find(id: number): Promise<SelectIssue | null> {
		const [row] = await db
			.select()
			.from(issuesTable)
			.where(eq(issuesTable.id, id));

		return row ?? null;
	},
	async list(): Promise<SelectIssue[]> {
		return await db.select().from(issuesTable);
	},
};
