import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateIssueStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			issueStatusId,
			userId,
		}: {
			id: string;
			issueStatusId: number;
			userId?: number;
		}) => {
			const requestBody: any = { issueStatusId };
			if (userId !== undefined) {
				requestBody.userId = userId;
			}
			const res = await fetch(`/api/v1/issues/${id}/status`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
			});

			if (!res.ok) {
				throw new Error("Failed to update issue status");
			}

			return res.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["issues"] });
		},
	});
};
