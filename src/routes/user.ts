import type { BunRequest } from "bun";
import { eq } from "drizzle-orm";
import type { z } from "zod";
import { withValidation } from "@/lib/middleware.ts";
import { insertUsersSchema, usersTable } from "../db/schema";
import { db } from "../index.tsx";

export const getUser = async (req: BunRequest<"/api/users/:id">) => {
	const user = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, Number.parseInt(req.params.id, 10)));

	if (user.length === 0) {
		return Response.json(
			{ message: `User with id ${req.params.id} not found` },
			{ status: 404 },
		);
	}

	return Response.json(user, { status: 200 });
};

export const getUsers = async () => {
	const users = await db.select().from(usersTable);
	return Response.json(users);
};

export const createUser = withValidation(
	insertUsersSchema,
	async (
		data: z.infer<typeof insertUsersSchema>,
		_req: BunRequest<"/api/users">,
	) => {
		await db.insert(usersTable).values(data);
		return Response.json({ created: true, data });
	},
);
