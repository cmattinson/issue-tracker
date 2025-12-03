import type { CommentWithUser, SearchComment } from "./dto";
import { CommentRepository } from "./repository.ts";
import type { InsertComment, SelectComment } from "./schema";

export const CommentService = {
	async create(data: InsertComment): Promise<SelectComment> {
		return await CommentRepository.create(data);
	},

	async find(id: number): Promise<SelectComment | null> {
		return await CommentRepository.find(id);
	},

	async list(query: SearchComment): Promise<SelectComment[]> {
		return await CommentRepository.list(query);
	},

	async findByIssueId(issueId: string): Promise<CommentWithUser[]> {
		return await CommentRepository.findByIssueId(issueId);
	},
};
