import { Elysia, t } from "elysia";
import { NormalizedIssueDto, SearchIssueDto } from "./dto";
import { InsertIssueSchema, SelectIssueSchema } from "./schema";
import { IssueService } from "./service";

export const issue = new Elysia({ prefix: "/issues" })
	.get("/", async ({ query }) => await IssueService.list(query), {
		query: SearchIssueDto,
		response: t.Array(SelectIssueSchema),
		detail: {
			summary: "List all issues",
			tags: ["Issues"],
		},
	})
	.post("/", async ({ body }) => await IssueService.create(body), {
		body: InsertIssueSchema,
		response: { 201: SelectIssueSchema },
		detail: {
			summary: "Create a new issue",
			tags: ["Issues"],
		},
	})
	.get("/normalized", async () => await IssueService.normalizedIssues(), {
		response: t.Array(NormalizedIssueDto),
		detail: {
			summary: "List all normalized issues",
			tags: ["Issues"],
		},
	})
	.get(
		"/:id",
		async ({ params, query }) => {
			return await IssueService.find(params.id);
		},
		{
			params: t.Object({ id: t.String() }),
			detail: { summary: "Find an issue by ID", tags: ["Issues"] },
		},
	);
