import type { SelectIssue } from "@/modules/issue/schema";

interface IssueCardProps {
	issue: SelectIssue;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
	return (
		<div className="border-2 rounded-lg border-solid border-gray-400 flex flex-col mt-2">
			<h1 className="font-bold text-left ml-2">{issue.title}</h1>
		</div>
	);
};
