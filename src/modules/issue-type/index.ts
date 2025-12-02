import { Elysia, t } from "elysia";
import { SelectIssueTypeSchema, type SelectIssueType } from "./schema";
import { IssueTypeService } from "./service";

export const issueType = new Elysia({ prefix: "/issue-types" }).get(
	"/",
	async () => await IssueTypeService.list(),
	{
		response: t.Array(SelectIssueTypeSchema),
		detail: {
			summary: "List all issue types",
			tags: ["Issue Types"],
		},
	},
);
