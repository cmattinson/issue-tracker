import { Elysia, t } from "elysia";
import { InsertProjectSchema, SelectProjectSchema } from "./schema";
import { ProjectService } from "./service";

export const project = new Elysia({ prefix: "/projects" })
	.get("/", async () => await ProjectService.list(), {
		response: t.Array(SelectProjectSchema),
		detail: {
			summary: "List all projects",
			tags: ["Projects"],
		},
	})
	.post("/", async ({ body }) => await ProjectService.create(body), {
		body: InsertProjectSchema,
		response: { 201: SelectProjectSchema },
		detail: {
			summary: "Create a new project",
			tags: ["Projects"],
		},
	});
