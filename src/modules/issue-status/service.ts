import { issueStatusRepository } from "./repository.ts";
import { BaseServiceImpl } from "@/modules/base-service";
import type { SearchIssueStatus } from "./dto";
import type { InsertIssueStatus, SelectIssueStatus } from "./schema";

class IssueStatusService extends BaseServiceImpl<
	InsertIssueStatus,
	SelectIssueStatus,
	SearchIssueStatus
> {
	constructor() {
		super(issueStatusRepository);
	}
}

export const issueStatusService = new IssueStatusService();
