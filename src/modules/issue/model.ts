import { t } from "elysia";

export namespace IssueModel {
	export const issue = t.Object({
		id: t.Number({ coerce: true }),
		createdAt: t.Date(),
		updatedAt: t.Date(),
		title: t.String(),
		description: t.Number(),
	});

	export type user = typeof issue.static;
}
