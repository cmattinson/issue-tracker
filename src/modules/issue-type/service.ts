import { BaseServiceImpl } from "@/modules/base-service";
import type { SearchIssueType } from "./dto";
import { issueTypeRepository } from "./repository";
import type { InsertIssueType, SelectIssueType } from "./schema";

class IssueTypeService extends BaseServiceImpl<
	InsertIssueType,
	SelectIssueType,
	SearchIssueType
> {
	constructor() {
		super(issueTypeRepository);
	}
}

export const issueTypeService = new IssueTypeService();
