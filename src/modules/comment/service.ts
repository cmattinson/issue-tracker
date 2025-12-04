import { BaseServiceImpl } from "@/modules/base-service";
import type { CommentWithUser, SearchComment } from "./dto";
import { commentRepository } from "./repository.ts";
import type { InsertComment, SelectComment } from "./schema";

class CommentService extends BaseServiceImpl<
	InsertComment,
	SelectComment,
	SearchComment
> {
	constructor() {
		super(commentRepository);
	}

	async findByIssueId(issueId: string): Promise<CommentWithUser[]> {
		return await commentRepository.findByIssueId(issueId);
	}
}

export const commentService = new CommentService();
