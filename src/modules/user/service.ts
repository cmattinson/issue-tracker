import { BaseServiceImpl } from "@/modules/base-service";
import type { SelectIssue } from "../issue/schema";
import type { SearchUser } from "./dto";
import { userRepository } from "./repository";
import type { InsertUser, SelectUser } from "./schema";

class UserService extends BaseServiceImpl<InsertUser, SelectUser, SearchUser> {
	constructor() {
		super(userRepository);
	}

	async getIssues(id: number): Promise<SelectIssue[]> {
		return await userRepository.getIssues(id);
	}
}

export const userService = new UserService();
