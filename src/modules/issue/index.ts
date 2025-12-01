import { Elysia, t } from "elysia";
import { IssueService } from "./service";

export const issue = new Elysia({ prefix: "/issues" })
	.get("/", async () => await IssueService.list())
	.get(
		"/:id",
		async ({ params }) => {
			const user = await IssueService.find(params.id);
			return user;
		},
		{ params: t.Object({ id: t.Number({ coerce: true }) }) },
	);
