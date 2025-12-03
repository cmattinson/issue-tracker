import { and, eq } from "drizzle-orm";
import {
	issueStatusTable,
	issuesTable,
	issueTypesTable,
	projectsTable,
	usersTable,
} from "@/db/schema";
import { db } from "@/index";
import type { IssueWithUser, NormalizedIssue, SearchIssue } from "./dto";
import type { InsertIssue, SelectIssue } from "./schema";

const generateIssueId = async (projectId: number): Promise<string> => {
	const [project] = await db
		.select({ key: projectsTable.key })
		.from(projectsTable)
		.where(eq(projectsTable.id, projectId));

	if (!project) {
		throw new Error(`Project with ID ${projectId} not found`);
	}

	const existingIssues = await db
		.select({ id: issuesTable.id })
		.from(issuesTable)
		.where(eq(issuesTable.projectId, projectId))
		.orderBy(issuesTable.id);

	let nextNumber = 1;

	if (existingIssues.length > 0) {
		const lastIssue = existingIssues[existingIssues.length - 1];
		if (lastIssue) {
			const lastNumber = Number.parseInt(lastIssue.id.split("-")[1] || "0", 10);
			nextNumber = lastNumber + 1;
		}
	}

	return `${project.key}-${nextNumber.toString().padStart(4, "0")}`;
};

export const IssueRepository = {
	async create(data: InsertIssue): Promise<SelectIssue> {
		const id = await generateIssueId(data.projectId);
		const [result] = await db
			.insert(issuesTable)
			.values({ ...data, id })
			.returning();
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

	async assignedIssues(): Promise<IssueWithUser[]> {
		return await db
			.select({
				id: issuesTable.id,
				createdAt: issuesTable.createdAt,
				updatedAt: issuesTable.updatedAt,
				title: issuesTable.title,
				description: issuesTable.description,
				assignee: {
					id: usersTable.id,
					name: usersTable.name,
					email: usersTable.email,
				},
			})
			.from(issuesTable)
			.innerJoin(usersTable, eq(issuesTable.userId, usersTable.id));
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
