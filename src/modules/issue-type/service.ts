import { issueTypesTable } from "@/db/schema";
import type { SelectIssueType } from "./schema";
import { IssueTypeRepository } from "./repository";

export const IssueTypeService = {
	async list(): Promise<SelectIssueType[]> {
		return await IssueTypeRepository.list();
	},
};
