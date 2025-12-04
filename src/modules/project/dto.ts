import { t } from "elysia";

export const SearchProjectDto = t.Object({
	ownerId: t.Optional(t.Integer()),
	key: t.Optional(t.String()),
	page: t.Optional(t.Number()),
});

export type SearchProject = typeof SearchProjectDto.static;
