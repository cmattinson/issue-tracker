import { t } from "elysia";

export namespace UserModel {
	export const user = t.Object({
		id: t.Number({ coerce: true }),
		createdAt: t.Date(),
		updatedAt: t.Date(),
		name: t.String(),
		age: t.Number(),
		email: t.String(),
	});

	export type user = typeof user.static;
}
