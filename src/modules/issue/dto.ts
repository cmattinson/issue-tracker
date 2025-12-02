import { t } from "elysia";

export const NormalizedIssueDto = t.Object({
	title: t.String(),
	description: t.String(),
	userId: t.Union([t.String(), t.Null()]),
	userName: t.Union([t.String(), t.Null()]),
	issueTypeId: t.Number(),
	issueTypeName: t.String(),
	issueStatusId: t.Number(),
	issueStatusName: t.String(),
});

export const CreateIssueDto = t.Object({
	userId: t.Union([t.String(), t.Null()]),
	userName: t.Union([t.String(), t.Null()]),
	issueTypeId: t.Number(),
	issueTypeName: t.String(),
	issueStatusId: t.Number(),
	issueStatusName: t.String(),
	title: t.String(),
	description: t.String(),
});

export const SearchIssueDto = t.Object({
	userId: t.Optional(t.String()),
	statusId: t.Optional(t.Number()),
	type: t.Optional(t.Number()),
	page: t.Optional(t.Number()),
});

export type CreateIssue = typeof CreateIssueDto.static;
export type NormalizedIssue = typeof NormalizedIssueDto.static;
export type SearchIssue = typeof SearchIssueDto.static;
