import { eq } from "drizzle-orm";
import { issuesTable, projectsTable } from "@/db/schema";
import { db } from "@/index";
import type { InsertProject, SelectProject } from "./schema";

export const ProjectRepository = {
	async create(data: InsertProject): Promise<SelectProject> {
		const [result] = await db.insert(projectsTable).values(data).returning();
		return result as SelectProject;
	},

	async find(id: number): Promise<SelectProject | null> {
		const [row] = await db
			.select()
			.from(projectsTable)
			.where(eq(projectsTable.id, id));

		return row ?? null;
	},

	async list(): Promise<SelectProject[]> {
		return await db.select().from(projectsTable);
	},
};
