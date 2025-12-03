import { ProjectRepository } from "./repository.ts";
import type { InsertProject, SelectProject } from "./schema";

export const ProjectService = {
	async create(data: InsertProject): Promise<SelectProject> {
		return await ProjectRepository.create(data);
	},

	async find(id: number): Promise<SelectProject | null> {
		return await ProjectRepository.find(id);
	},

	async list(): Promise<SelectProject[]> {
		return await ProjectRepository.list();
	},
};
