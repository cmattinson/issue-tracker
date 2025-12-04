import { issueStatusTable } from "@/db/schema";
import { BaseRepositoryImpl } from "@/modules/base-repository";
import type { SearchIssueStatus } from "./dto";
import type { InsertIssueStatus, SelectIssueStatus } from "./schema";

class IssueStatusRepository extends BaseRepositoryImpl<
	InsertIssueStatus,
	SelectIssueStatus,
	SearchIssueStatus
> {
	constructor() {
		super(issueStatusTable);
	}
}

export const issueStatusRepository = new IssueStatusRepository();
