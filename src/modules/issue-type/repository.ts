import { issueTypesTable } from "@/db/schema";
import { db } from "@/index";
import type { SelectIssueType } from "./schema";

export const IssueTypeRepository = {
	async list(): Promise<SelectIssueType[]> {
		return await db.select().from(issueTypesTable);
	},
};
