import { and, eq, ilike, type SQL } from "drizzle-orm";
import { issuesTable, usersTable } from "@/db/schema";
import { db } from "@/index.ts";
import { BaseRepositoryImpl } from "@/modules/base-repository";
import type { SelectIssue } from "../issue/schema";
import type { SearchUser } from "./dto";
import type { InsertUser, SelectUser } from "./schema";

class UserRepository extends BaseRepositoryImpl<
	InsertUser,
	SelectUser,
	SearchUser
> {
	constructor() {
		super(usersTable);
	}

	override async list(query: SearchUser): Promise<SelectUser[]> {
		const conditions: SQL[] = [];

		if (query.name) {
			conditions.push(ilike(usersTable.name, `%${query.name}%`));
		}
		if (query.email) {
			conditions.push(ilike(usersTable.email, `%${query.email}%`));
		}

		const filter = conditions.length > 0 ? and(...conditions) : undefined;

		return await db
			.select()
			.from(usersTable)
			.where(filter)
			.limit(10)
			.offset(((query.page as number) ?? 0) * 10);
	}

	async getIssues(id: number): Promise<SelectIssue[]> {
		return await db
			.select()
			.from(issuesTable)
			.where(eq(issuesTable.userId, id));
	}
}

export const userRepository = new UserRepository();
