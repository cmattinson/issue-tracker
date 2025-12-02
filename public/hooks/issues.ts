import { useQuery } from "@tanstack/react-query";
import type { SelectIssue } from "../../src/modules/issue/schema";

export const useIssues = () => {
	return useQuery({
		queryKey: ["issues"],
		queryFn: async (): Promise<SelectIssue[]> => {
			const res = await fetch("/api/v1/issues");
			return res.json();
		},
	});
};
