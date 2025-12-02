import { and, eq } from "drizzle-orm";
import {
	issueStatusTable,
	issuesTable,
	issueTypesTable,
	usersTable,
} from "@/db/schema";
import { db } from "@/index";
import type { NormalizedIssue, SearchIssue } from "./dto";
import type { InsertIssue, SelectIssue } from "./schema";

export const IssueRepository = {
	async create(data: InsertIssue): Promise<SelectIssue> {
		const [result] = await db.insert(issuesTable).values(data).returning();
		return result as SelectIssue;
	},
	async find(id: string): Promise<SelectIssue | null> {
		const [row] = await db
			.select()
			.from(issuesTable)
			.where(eq(issuesTable.id, id));

		return row ?? null;
	},
	async list(query: SearchIssue): Promise<SelectIssue[]> {
		const conditions = [];
		if (query.userId) conditions.push(eq(issuesTable.userId, query.userId));
		if (query.statusId)
			conditions.push(eq(issuesTable.issueStatusId, query.statusId));
		if (query.type) conditions.push(eq(issuesTable.issueTypeId, query.type));
		const filter = conditions.length > 0 ? and(...conditions) : undefined;

		return await db
			.select()
			.from(issuesTable)
			.where(filter)
			.limit(10)
			.offset((query.page ?? 0) * 10);
	},
	async normalizedIssues(): Promise<NormalizedIssue[]> {
		const rows = await db
			.select({
				title: issuesTable.title,
				description: issuesTable.description,
				userId: usersTable.id,
				userName: usersTable.name,
				issueTypeId: issueTypesTable.id,
				issueTypeName: issueTypesTable.name,
				issueStatusId: issueStatusTable.id,
				issueStatusName: issueStatusTable.name,
			})
			.from(issuesTable)
			.leftJoin(usersTable, eq(issuesTable.userId, usersTable.id))
			.innerJoin(
				issueTypesTable,
				eq(issuesTable.issueTypeId, issueTypesTable.id),
			)
			.innerJoin(
				issueStatusTable,
				eq(issuesTable.issueStatusId, issueStatusTable.id),
			);
		return rows;
	},
};
