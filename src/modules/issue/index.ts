import { Elysia, t } from "elysia";
import { DenormalizedIssueDto, SearchIssueDto } from "./dto";
import { UpdateIssueDto } from "./dto-update";
import { InsertIssueSchema, SelectIssueSchema } from "./schema";
import { issueService } from "./service";

export const issue = new Elysia({ prefix: "/issues" })
	.get("/", async ({ query }) => await issueService.list(query), {
		query: SearchIssueDto,
		response: t.Array(SelectIssueSchema),
		detail: {
			summary: "List all issues",
			tags: ["Issues"],
		},
	})
	.post("/", async ({ body }) => await issueService.create(body), {
		body: InsertIssueSchema,
		response: { 201: SelectIssueSchema },
		detail: {
			summary: "Create a new issue",
			tags: ["Issues"],
		},
	})
	.get("/denormalized", async () => await issueService.denormalizedIssues(), {
		response: t.Array(DenormalizedIssueDto),
		detail: {
			summary: "List all denormalized issues",
			tags: ["Issues"],
		},
	})
	.patch(
		"/:id/status",
		async ({ params, body }) => {
			const result = await issueService.updateStatus(
				params.id,
				body.issueStatusId,
				body.userId,
			);
			if (!result) {
				throw new Error("Issue not found");
			}
			return result;
		},
		{
			params: t.Object({ id: t.String() }),
			body: UpdateIssueDto,
			response: SelectIssueSchema,
			detail: {
				summary: "Update issue status",
				tags: ["Issues"],
			},
		},
	);
