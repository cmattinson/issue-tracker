import { t } from "elysia";

export const SearchIssuePriorityDto = t.Object({
	name: t.Optional(t.String()),
	page: t.Optional(t.Number()),
});

export type SearchIssuePriority = typeof SearchIssuePriorityDto.static;
