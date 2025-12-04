import { Elysia, t } from "elysia";
import { SearchIssueTypeDto } from "./dto";
import { SelectIssueTypeSchema } from "./schema";
import { issueTypeService } from "./service";

export const issueType = new Elysia({ prefix: "/issue-types" }).get(
	"/",
	async ({ query }) => await issueTypeService.list(query),
	{
		query: SearchIssueTypeDto,
		response: t.Array(SelectIssueTypeSchema),
		detail: {
			summary: "List all issue types",
			tags: ["Issue Types"],
		},
	},
);
