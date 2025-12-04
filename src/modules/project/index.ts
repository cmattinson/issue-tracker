import { Elysia, t } from "elysia";
import { SelectIssueSchema } from "../issue/schema";
import { SearchProjectDto } from "./dto";
import { InsertProjectSchema, SelectProjectSchema } from "./schema";
import { projectService } from "./service";

export const project = new Elysia({ prefix: "/projects" })
	.get("/", async ({ query }) => await projectService.list(query), {
		query: SearchProjectDto,
		response: t.Array(SelectProjectSchema),
		detail: {
			summary: "List projects with filters",
			tags: ["Projects"],
		},
	})
	.post("/", async ({ body }) => await projectService.create(body), {
		body: InsertProjectSchema,
		response: { 201: SelectProjectSchema },
		detail: {
			summary: "Create a new project",
			tags: ["Projects"],
		},
	})
	.get(
		"/:projectId/issues",
		async ({ params }) => {
			return await projectService.getIssues(Number(params.projectId));
		},
		{
			params: t.Object({ projectId: t.String() }),
			response: t.Array(SelectIssueSchema),
			detail: {
				summary: "List all issues for a given project",
				tags: ["Projects"],
			},
		},
	);
