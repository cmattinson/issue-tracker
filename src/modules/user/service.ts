import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schema";
import { db } from "../../index.ts";
import type { InsertUser, SelectUser } from "./schema";

export const UserService = {
	async create(data: InsertUser): Promise<SelectUser> {
		const [result] = await db.insert(usersTable).values(data).returning();
		return result as SelectUser;
	},
	async find(id: number): Promise<SelectUser | null> {
		const [row] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, id));

		return row ?? null;
	},
	async list(): Promise<SelectUser[]> {
		return await db.select().from(usersTable);
	},
};
