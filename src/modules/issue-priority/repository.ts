import { BaseRepositoryImpl } from "@/modules/base-repository";
import { issuePrioritiesTable } from "@/db/schema";
import type { InsertIssuePriority, SelectIssuePriority } from "./schema";
import type { SearchIssuePriority } from "./dto";

class IssuePriorityRepository extends BaseRepositoryImpl<
	InsertIssuePriority,
	SelectIssuePriority,
	SearchIssuePriority
> {
	constructor() {
		super(issuePrioritiesTable);
	}
}

export const issuePriorityRepository = new IssuePriorityRepository();
