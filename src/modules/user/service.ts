import type { SelectIssue } from "../issue/schema";
import { UserRepository } from "./repository";
import type { InsertUser, SelectUser } from "./schema";

export const UserService = {
	async create(data: InsertUser): Promise<SelectUser> {
		return await UserRepository.create(data);
	},

	async find(id: number): Promise<SelectUser | null> {
		return await UserRepository.find(id);
	},

	async list(): Promise<SelectUser[]> {
		return await UserRepository.list();
	},

	async getIssues(id: number): Promise<SelectIssue[]> {
		return await UserRepository.getIssues(id);
	},
};
