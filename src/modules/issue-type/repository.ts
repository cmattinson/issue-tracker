import { issueTypesTable } from "@/db/schema";
import { BaseRepositoryImpl } from "@/modules/base-repository";
import type { SearchIssueType } from "./dto";
import type { SelectIssueType } from "./schema";

// Create a minimal InsertType since issue-types likely don't need inserts
type InsertIssueType = Omit<SelectIssueType, "id" | "createdAt" | "updatedAt">;

class IssueTypeRepository extends BaseRepositoryImpl<
	InsertIssueType,
	SelectIssueType,
	SearchIssueType
> {
	constructor() {
		super(issueTypesTable);
	}
}

export const issueTypeRepository = new IssueTypeRepository();
