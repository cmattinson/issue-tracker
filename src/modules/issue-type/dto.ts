import { t } from "elysia";

export const SearchIssueTypeDto = t.Object({
	name: t.Optional(t.String()),
	page: t.Optional(t.Number()),
});

export type SearchIssueType = typeof SearchIssueTypeDto.static;
