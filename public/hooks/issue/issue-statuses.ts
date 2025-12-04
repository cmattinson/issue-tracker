import type { SelectIssueStatus } from "@/modules/issue-status/schema";
import { useQuery } from "@tanstack/react-query";

export const useIssueStatuses = () => {
	return useQuery({
		queryKey: ["issue-statuses"],
		queryFn: async (): Promise<SelectIssueStatus[]> => {
			const res = await fetch("/api/v1/issue-statuses");
			return res.json();
		},
	});
};
