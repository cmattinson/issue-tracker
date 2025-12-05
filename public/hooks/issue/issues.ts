import { useQuery } from "@tanstack/react-query";
import type { DenormalizedIssue } from "@/modules/issue/dto";

export const useIssues = () => {
	return useQuery({
		queryKey: ["issues"],
		queryFn: async (): Promise<DenormalizedIssue[]> => {
			const res = await fetch("/api/v1/issues/denormalized");
			return res.json();
		},
	});
};
