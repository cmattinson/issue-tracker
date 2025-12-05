import { BaseServiceImpl } from "@/modules/base-service";
import type { CommentWithUser, SearchComment } from "./dto";
import { commentRepository } from "./repository.ts";
import type { InsertComment, SelectComment } from "./schema";
import { db } from "@/db";
import { issuesTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

class CommentService extends BaseServiceImpl<
	InsertComment,
	SelectComment,
	SearchComment
> {
	constructor() {
		super(commentRepository, "Comment");
	}

	override async create(data: InsertComment): Promise<SelectComment> {
		const [issue, user] = await Promise.all([
			db
				.select()
				.from(issuesTable)
				.where(eq(issuesTable.id, data.issueId))
				.limit(1),
			db
				.select()
				.from(usersTable)
				.where(eq(usersTable.id, data.userId))
				.limit(1),
		]);

		if (issue.length === 0) {
			throw new Error(`Issue with ID ${data.issueId} not found`);
		}

		if (user.length === 0) {
			throw new Error(`User with ID ${data.userId} not found`);
		}

		return super.create(data);
	}

	async findByIssueId(issueId: string): Promise<CommentWithUser[]> {
		return await commentRepository.findByIssueId(issueId);
	}
}

export const commentService = new CommentService();
