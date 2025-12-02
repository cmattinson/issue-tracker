import { issueTypesTable } from "@/db/schema";
import type { SelectIssueType } from "./schema";
import { IssueTypeRepository } from "./repository";

export abstract class IssueTypeService {
	static async list(): Promise<SelectIssueType[]> {
		return await IssueTypeRepository.list();
	}
}
