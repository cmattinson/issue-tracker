import { and, eq, ilike } from "drizzle-orm";
import { projectsTable } from "@/db/schema";
import { db } from "@/index";
import { BaseRepositoryImpl } from "@/modules/base-repository";
import type { SearchProject } from "./dto";
import type { InsertProject, SelectProject } from "./schema";

class ProjectRepository extends BaseRepositoryImpl<
	InsertProject,
	SelectProject,
	SearchProject
> {
	constructor() {
		super(projectsTable);
	}

	override async list(query: SearchProject): Promise<SelectProject[]> {
		const conditions = [];
		if (query.ownerId)
			conditions.push(eq(projectsTable.ownerId, query.ownerId));
		if (query.key) conditions.push(ilike(projectsTable.key, `%${query.key}%`));
		const filter = conditions.length > 0 ? and(...conditions) : undefined;

		return await db
			.select()
			.from(projectsTable)
			.where(filter)
			.limit(10)
			.offset((query.page ?? 0) * 10);
	}
}

export const projectRepository = new ProjectRepository();
