import { BaseServiceImpl } from "@/modules/base-service";
import type { SearchIssuePriority } from "./dto";
import { issuePriorityRepository } from "./repository";
import type { InsertIssuePriority, SelectIssuePriority } from "./schema";

class IssuePriorityService extends BaseServiceImpl<
	InsertIssuePriority,
	SelectIssuePriority,
	SearchIssuePriority
> {
	constructor() {
		super(issuePriorityRepository, "Issue Priority");
	}
}

export const issuePriorityService = new IssuePriorityService();
