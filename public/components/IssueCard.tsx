import type { DenormalizedIssue } from "@/modules/issue/dto";

interface IssueCardProps {
	issue: DenormalizedIssue;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
	const getPriorityColor = (priority: string) => {
		switch (priority.toLowerCase()) {
			case "critical":
				return "bg-red-500/20 text-red-400 border-red-500/30";
			case "high":
				return "bg-orange-500/20 text-orange-400 border-orange-500/30";
			case "medium":
				return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
			case "low":
				return "bg-green-500/20 text-green-400 border-green-500/30";
			default:
				return "bg-gray-500/20 text-gray-400 border-gray-500/30";
		}
	};

	const getTypeColor = (type: string) => {
		switch (type.toLowerCase()) {
			case "bug":
				return "bg-red-500/20 text-red-400";
			case "feature":
				return "bg-blue-500/20 text-blue-400";
			case "improvement":
				return "bg-purple-500/20 text-purple-400";
			default:
				return "bg-gray-500/20 text-gray-400";
		}
	};

	return (
		<div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all cursor-move group hover:shadow-lg hover:shadow-blue-500/10">
			<div className="text-xs text-gray-500 mb-2 font-mono">{issue.id}</div>
			<h3 className="font-medium text-white text-sm mb-2 leading-tight group-hover:text-blue-400 transition-colors">
				{issue.title}
			</h3>
			<p className="text-gray-400 text-xs mb-3 line-clamp-2">
				{issue.description}
			</p>
			<div className="flex items-center gap-2 flex-wrap">
				<span
					className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(issue.priorityName)}`}
				>
					{issue.priorityName}
				</span>
				<span
					className={`text-xs px-2 py-0.5 rounded ${getTypeColor(issue.issueTypeName)}`}
				>
					{issue.issueTypeName}
				</span>
			</div>
		</div>
	);
};
