import { t } from "elysia";

export const CommentWithUserDto = t.Object({
	id: t.Integer(),
	createdAt: t.Date(),
	updatedAt: t.Union([t.Date(), t.Null()]),
	comment: t.String(),
	issueId: t.String(),
	userId: t.Integer(),
	user: t.Object({
		id: t.Integer(),
		name: t.String(),
		email: t.String(),
	}),
});

export const CreateCommentDto = t.Object({
	comment: t.String(),
	issueId: t.String(),
	userId: t.Integer(),
});

export const SearchCommentDto = t.Object({
	issueId: t.Optional(t.String()),
	userId: t.Optional(t.Integer()),
	page: t.Optional(t.Number()),
});

export type CommentWithUser = typeof CommentWithUserDto.static;
export type CreateComment = typeof CreateCommentDto.static;
export type SearchComment = typeof SearchCommentDto.static;
