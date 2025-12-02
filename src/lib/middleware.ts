import type { BunRequest } from "bun";
import type { InferSelectModel } from "drizzle-orm";
import type { PgColumn, PgDatabase } from "drizzle-orm/pg-core";
import type { z } from "zod";

enum DatabaseError {
	FOREIGN_KEY_VIOLATION = "23503",
	UNIQUE_CONSTRAINT_VIOLATION = "23505",
	CHECK_VIOLATION = "23514",
}

export function withValidation<T>(
	schema: z.ZodSchema<T>,
	handler: (data: T, req: BunRequest) => Response | Promise<Response>,
) {
	return async (req: BunRequest) => {
		try {
			const body = await req.json();
			const result = schema.safeParse(body);

			if (!result.success) {
				return Response.json(
					{
						error: "Validation failed",
						details: JSON.parse(result.error.message),
					},
					{
						status: 400,
					},
				);
			}

			return await handler(result.data, req);
		} catch (error: any) {
			switch (error.cause?.code) {
				case DatabaseError.UNIQUE_CONSTRAINT_VIOLATION:
					return Response.json(
						{
							error: "Unique constraint violation",
							details: error.cause.meta,
						},
						{
							status: 400,
						},
					);
				case DatabaseError.FOREIGN_KEY_VIOLATION:
					return Response.json(
						{
							error: "Foreign key violation",
							details: error.cause.meta,
						},
						{
							status: 400,
						},
					);
				case DatabaseError.CHECK_VIOLATION:
					return Response.json(
						{
							error: "Check violation",
							details: error.cause.meta,
						},
						{
							status: 400,
						},
					);
			}

			return new Response("Unknown error occured", { status: 500 });
		}
	};
}
