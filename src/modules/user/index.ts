import { Elysia, status, t } from "elysia";
import { SelectIssueSchema } from "../issue/schema";
import { SearchUserDto } from "./dto";
import { type InsertUser, InsertUserSchema, SelectUserSchema } from "./schema";
import { userService } from "./service";

export const user = new Elysia({ prefix: "/users" })
	.get("/", async ({ query }) => await userService.list(query), {
		query: SearchUserDto,
		response: t.Array(SelectUserSchema),
		detail: {
			summary: "List all users",
			tags: ["Users"],
		},
	})
	.post(
		"/",
		async ({ body }: { body: InsertUser }) => await userService.create(body),
		{
			body: InsertUserSchema,
			response: { 201: SelectUserSchema },
			detail: {
				summary: "Create a new user",
				tags: ["Users"],
			},
		},
	)
	.get(
		"/:id",
		async ({ params }: { params: { id: number } }) => {
			const user = await userService.find(params.id);
			return user ?? status(404, "User not found");
		},
		{
			params: t.Object({ id: t.Integer() }),
			response: { 200: SelectUserSchema, 404: t.String() },
			detail: {
				summary: "Find a user by their ID",
				tags: ["Users"],
			},
		},
	)
	.get(
		"/:id/issues",
		async ({ params }: { params: { id: number } }) =>
			await userService.getIssues(params.id),
		{
			params: t.Object({ id: t.Integer() }),
			response: t.Array(SelectIssueSchema),
			detail: {
				summary: "List all issues assigned to a user",
				tags: ["Users"],
			},
		},
	);
