import { BaseServiceImpl } from "@/modules/base-service";
import type { DenormalizedIssue, IssueWithUser, SearchIssue } from "./dto";
import { issueRepository } from "./repository.ts";
import type { InsertIssue, SelectIssue } from "./schema";
import { issueStatusService } from "../issue-status/service";
import { issueTypeService } from "../issue-type/service";
import { issuePriorityService } from "../issue-priority/service";
import { projectService } from "../project/service";

class IssueService extends BaseServiceImpl<
	InsertIssue,
	SelectIssue,
	SearchIssue
> {
	constructor() {
		super(issueRepository, "Issue");
	}

	override async create(data: InsertIssue): Promise<SelectIssue> {
		const [issueStatus, issueType, priority, project] = await Promise.all([
			issueStatusService.find(data.issueStatusId),
			issueTypeService.find(data.issueTypeId),
			issuePriorityService.find(data.priorityId),
			projectService.find(data.projectId),
		]);

		if (!issueStatus) {
			throw new Error(`Issue status with ID ${data.issueStatusId} not found`);
		}
		if (!issueType) {
			throw new Error(`Issue type with ID ${data.issueTypeId} not found`);
		}
		if (!priority) {
			throw new Error(`Priority with ID ${data.priorityId} not found`);
		}
		if (!project) {
			throw new Error(`Project with ID ${data.projectId} not found`);
		}

		return await super.create(data);
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
		userId?: number,
	): Promise<SelectIssue | null> {
		return await issueRepository.updateStatus(id, issueStatusId, userId);
	}
}

export const issueService = new IssueService();
