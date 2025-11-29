import type { BunRequest } from "bun";
import { eq } from "drizzle-orm";
import type { z } from "zod";
import { withValidation } from "@/lib/middleware.ts";
import { insertIssuesSchema, issuesTable } from "../db/schema";
import { db } from "../index.tsx";

/**
 * GET /api/issues/:id */
export const getIssue = async (req: BunRequest<"/api/issues/:id">) => {
	const user = await db
		.select()
		.from(issuesTable)
		.where(eq(issuesTable.id, Number.parseInt(req.params.id, 10)));

	if (user.length === 0) {
		return Response.json(
			{ message: `User with id ${req.params.id} not found` },
			{ status: 404 },
		);
	}

	return Response.json(user, { status: 200 });
};

const issueCreate = async (
	data: z.infer<typeof insertIssuesSchema>,
	_req: BunRequest<"/api/issues">,
) => {
	const user = await db.insert(issuesTable).values(data);
	return Response.json({ created: true, user });
};

export const getIssues = async () => {
	const issues = await db.select().from(issuesTable);
	return Response.json(issues);
};

export const createIssue = withValidation(insertIssuesSchema, issueCreate);
