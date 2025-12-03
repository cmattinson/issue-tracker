import type { IssueWithUser, NormalizedIssue, SearchIssue } from "./dto";
import { IssueRepository } from "./repository.ts";
import type { InsertIssue, SelectIssue } from "./schema";

export const IssueService = {
	async create(data: InsertIssue): Promise<SelectIssue> {
		return await IssueRepository.create(data);
	},

	async find(id: string): Promise<SelectIssue | null> {
		return await IssueRepository.find(id);
	},

	async list(query: SearchIssue): Promise<SelectIssue[]> {
		return await IssueRepository.list(query);
	},

	async assignedIssues(): Promise<IssueWithUser[]> {
		return await IssueRepository.assignedIssues();
	},

	async normalizedIssues(): Promise<NormalizedIssue[]> {
		return await IssueRepository.normalizedIssues();
	},
};
