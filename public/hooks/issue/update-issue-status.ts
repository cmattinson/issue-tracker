import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateIssueStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			issueStatusId,
		}: {
			id: string;
			issueStatusId: number;
		}) => {
			const res = await fetch(`/api/v1/issues/${id}/status`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ issueStatusId }),
			});

			if (!res.ok) {
				throw new Error("Failed to update issue status");
			}

			return res.json();
		},
		onSuccess: () => {
			// Invalidate and refetch issues
			queryClient.invalidateQueries({ queryKey: ["issues"] });
		},
	});
};
