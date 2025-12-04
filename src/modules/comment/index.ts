import { Elysia, t } from "elysia";
import { CommentWithUserDto, SearchCommentDto } from "./dto";
import { InsertCommentSchema, SelectCommentSchema } from "./schema";
import { commentService } from "./service";

export const comment = new Elysia({ prefix: "/comments" })
	.get("/", async ({ query }) => await commentService.list(query), {
		query: SearchCommentDto,
		response: t.Array(SelectCommentSchema),
		detail: {
			summary: "List all comments",
			tags: ["Comments"],
		},
	})
	.post("/", async ({ body }) => await commentService.create(body), {
		body: InsertCommentSchema,
		response: { 201: SelectCommentSchema },
		detail: {
			summary: "Create a new comment",
			tags: ["Comments"],
		},
	})
	.get(
		"/issue/:issueId",
		async ({ params }) => {
			return await commentService.findByIssueId(params.issueId);
		},
		{
			params: t.Object({ issueId: t.String() }),
			response: t.Array(CommentWithUserDto),
			detail: { summary: "Find comments by issue ID", tags: ["Comments"] },
		},
	)
	.get(
		"/:id",
		async ({ params }) => {
			return await commentService.find(params.id);
		},
		{
			params: t.Object({ id: t.Integer() }),
			detail: { summary: "Find a comment by ID", tags: ["Comments"] },
		},
	);
