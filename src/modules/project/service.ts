import { BaseServiceImpl } from "@/modules/base-service";
import { issueRepository } from "../issue/repository";
import type { SelectIssue } from "../issue/schema";
import type { SearchProject } from "./dto";
import { projectRepository } from "./repository.ts";
import type { InsertProject, SelectProject } from "./schema";

class ProjectService extends BaseServiceImpl<
	InsertProject,
	SelectProject,
	SearchProject
> {
	constructor() {
		super(projectRepository, "Project");
	}

	async getIssues(projectId: number): Promise<SelectIssue[]> {
		return await issueRepository.findByProject(projectId);
	}
}

export const projectService = new ProjectService();
