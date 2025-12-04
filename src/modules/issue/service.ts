import { BaseServiceImpl } from "@/modules/base-service";
import type { DenormalizedIssue, IssueWithUser, SearchIssue } from "./dto";
import { issueRepository } from "./repository.ts";
import type { InsertIssue, SelectIssue } from "./schema";

class IssueService extends BaseServiceImpl<
	InsertIssue,
	SelectIssue,
	SearchIssue
> {
	constructor() {
		super(issueRepository);
	}

	async assignedIssues(): Promise<IssueWithUser[]> {
		return await issueRepository.assignedIssues();
	}

	async denormalizedIssues(): Promise<DenormalizedIssue[]> {
		return await issueRepository.denormalizedIssues();
	}

	async updateStatus(
		id: string,
		issueStatusId: number,
	): Promise<SelectIssue | null> {
		return await issueRepository.updateStatus(id, issueStatusId);
	}
}

export const issueService = new IssueService();
