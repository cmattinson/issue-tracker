import { BaseServiceImpl } from "@/modules/base-service";
import { hashPassword } from "@/utils/password";
import type { SelectIssue } from "../issue/schema";
import type { SearchUser } from "./dto";
import { userRepository } from "./repository";
import type { InsertUser, SelectUser } from "./schema";

class UserService extends BaseServiceImpl<InsertUser, SelectUser, SearchUser> {
	constructor() {
		super(userRepository, "User");
	}

	override async create(data: InsertUser): Promise<SelectUser> {
		const hashedPassword = await hashPassword(data.password);
		const userWithHashedPassword = { ...data, password: hashedPassword };
		return await this.repository.create(userWithHashedPassword);
	}

	async getIssues(id: number): Promise<SelectIssue[]> {
		return await userRepository.getIssues(id);
	}
}

export const userService = new UserService();
