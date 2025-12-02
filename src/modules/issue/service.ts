import type { NormalizedIssue, SearchIssue } from "./dto";
import { IssueRepository } from "./repository.ts";
import type { InsertIssue, SelectIssue } from "./schema";

export abstract class IssueService {
	static async create(data: InsertIssue): Promise<SelectIssue> {
		return await IssueRepository.create(data);
	}

	static async find(id: string): Promise<SelectIssue | null> {
		return await IssueRepository.find(id);
	}

	static async list(query: SearchIssue): Promise<SelectIssue[]> {
		return await IssueRepository.list(query);
	}

	static async normalizedIssues(): Promise<NormalizedIssue[]> {
		return await IssueRepository.normalizedIssues();
	}
}
