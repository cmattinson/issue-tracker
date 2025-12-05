import { Elysia, t } from "elysia";
import { SearchIssuePriorityDto } from "./dto";
import { SelectIssuePrioritySchema } from "./schema";
import { issuePriorityService } from "./service";

export const issuePriority = new Elysia({ prefix: "/issue-priorities" }).get(
	"/",
	async ({ query }) => await issuePriorityService.list(query),
	{
		query: SearchIssuePriorityDto,
		response: t.Array(SelectIssuePrioritySchema),
		detail: {
			summary: "List all issue priorities",
			tags: ["Issue Priorities"],
		},
	},
);
