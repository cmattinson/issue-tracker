import { t } from "elysia";

export const SearchUserDto = t.Object({
	name: t.Optional(t.String()),
	email: t.Optional(t.String()),
	page: t.Optional(t.Number()),
});

export type SearchUser = typeof SearchUserDto.static;
