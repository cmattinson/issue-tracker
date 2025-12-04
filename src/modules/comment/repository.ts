import { eq } from "drizzle-orm";
import { commentsTable, usersTable } from "@/db/schema";
import { db } from "@/index";
import { BaseRepositoryImpl } from "@/modules/base-repository";
import type { CommentWithUser, SearchComment } from "./dto";
import type { InsertComment, SelectComment } from "./schema";

class CommentRepository extends BaseRepositoryImpl<
	InsertComment,
	SelectComment,
	SearchComment
> {
	constructor() {
		super(commentsTable);
	}

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
	}
}

export const commentRepository = new CommentRepository();
