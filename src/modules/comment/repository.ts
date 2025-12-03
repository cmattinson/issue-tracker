import { and, eq } from "drizzle-orm";
import { commentsTable, usersTable } from "@/db/schema";
import { db } from "@/index";
import type { CommentWithUser, SearchComment } from "./dto";
import type { InsertComment, SelectComment } from "./schema";

export const CommentRepository = {
	async create(data: InsertComment): Promise<SelectComment> {
		const [result] = await db.insert(commentsTable).values(data).returning();
		return result as SelectComment;
	},

	async find(id: number): Promise<SelectComment | null> {
		const [row] = await db
			.select()
			.from(commentsTable)
			.where(eq(commentsTable.id, id));

		return row ?? null;
	},

	async list(query: SearchComment): Promise<SelectComment[]> {
		const conditions = [];
		if (query.issueId)
			conditions.push(eq(commentsTable.issueId, query.issueId));
		if (query.userId) conditions.push(eq(commentsTable.userId, query.userId));
		const filter = conditions.length > 0 ? and(...conditions) : undefined;

		return await db
			.select()
			.from(commentsTable)
			.where(filter)
			.limit(10)
			.offset((query.page ?? 0) * 10);
	},

	async findByIssueId(issueId: string): Promise<CommentWithUser[]> {
		return await db
			.select({
				id: commentsTable.id,
				createdAt: commentsTable.createdAt,
				updatedAt: commentsTable.updatedAt,
				comment: commentsTable.comment,
				issueId: commentsTable.issueId,
				userId: commentsTable.userId,
				user: {
					id: usersTable.id,
					name: usersTable.name,
					email: usersTable.email,
				},
			})
			.from(commentsTable)
			.innerJoin(usersTable, eq(commentsTable.userId, usersTable.id))
			.where(eq(commentsTable.issueId, issueId));
	},
};
