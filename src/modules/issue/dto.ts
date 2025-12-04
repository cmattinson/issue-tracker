import { t } from "elysia";

export const DenormalizedIssueDto = t.Object({
	id: t.String(),
	title: t.String(),
	description: t.String(),
	userId: t.Union([t.Integer(), t.Null()]),
	userName: t.Union([t.String(), t.Null()]),
	projectId: t.Number(),
	projectName: t.String(),
	projectKey: t.String(),
	issueTypeId: t.Number(),
	issueTypeName: t.String(),
	issueStatusId: t.Number(),
	issueStatusName: t.String(),
	priorityId: t.Number(),
	priorityName: t.String(),
});

export const CreateIssueDto = t.Object({
	userId: t.Union([t.Integer(), t.Null()]),
	userName: t.Union([t.String(), t.Null()]),
	issueTypeId: t.Number(),
	issueTypeName: t.String(),
	issueStatusId: t.Number(),
	issueStatusName: t.String(),
	title: t.String(),
	description: t.String(),
});

export const SearchIssueDto = t.Object({
	userId: t.Optional(t.Integer()),
	statusId: t.Optional(t.Number()),
	type: t.Optional(t.Number()),
	page: t.Optional(t.Number()),
});

export const IssueWithUserDto = t.Object({
	id: t.String(),
	createdAt: t.Date(),
	updatedAt: t.Union([t.Date(), t.Null()]),
	title: t.String(),
	description: t.String(),
	assignee: t.Object({
		id: t.Integer(),
		name: t.String(),
		email: t.String(),
	}),
});

export type CreateIssue = typeof CreateIssueDto.static;
export type DenormalizedIssue = typeof DenormalizedIssueDto.static;
export type SearchIssue = typeof SearchIssueDto.static;
export type IssueWithUser = typeof IssueWithUserDto.static;
