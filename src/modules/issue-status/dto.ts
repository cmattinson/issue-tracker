import { t } from "elysia";

export const SearchIssueStatusDto = t.Object({
	page: t.Optional(t.Number()),
});

export type SearchIssueStatus = typeof SearchIssueStatusDto.static;
