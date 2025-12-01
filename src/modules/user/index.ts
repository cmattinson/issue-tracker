import { Elysia, status, t } from "elysia";
import { type InsertUser, InsertUserSchema, SelectUserSchema } from "./schema";
import { UserService } from "./service";

export const user = new Elysia({ prefix: "/users" })
	.post(
		"/",
		async ({ body }: { body: InsertUser }) => await UserService.create(body),
		{
			body: InsertUserSchema,
			response: { 201: SelectUserSchema },
		},
	)
	.get(
		"/:id",
		async ({ params }: { params: { id: number } }) => {
			const user = await UserService.find(Number(params.id));
			return user ?? status(404, "User not found");
		},
		{
			params: t.Object({ id: t.Integer() }),
			response: { 200: SelectUserSchema, 404: t.String() },
		},
	)
	.get("/", async () => await UserService.list(), {
		response: t.Array(SelectUserSchema),
	});
