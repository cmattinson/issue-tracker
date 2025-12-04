import { Elysia, t } from "elysia";
import { SearchIssueStatusDto } from "./dto";
import { SelectIssueStatusSchema } from "./schema";
import { issueStatusService } from "./service";

export const issueStatus = new Elysia({ prefix: "/issue-statuses" }).get(
	"/",
	async ({ query }) => await issueStatusService.list(query),
	{
		query: SearchIssueStatusDto,
		response: t.Array(SelectIssueStatusSchema),
		detail: {
			summary: "List all issue statuses",
			tags: ["Issue Statuses"],
		},
	},
);
