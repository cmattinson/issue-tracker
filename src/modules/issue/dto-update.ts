import { t } from "elysia";

export const UpdateIssueDto = t.Object({
	issueStatusId: t.Number(),
	userId: t.Optional(t.Integer()),
});
