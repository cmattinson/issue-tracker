import { IssueCard } from "public/components/IssueCard";
import type { DenormalizedIssue } from "@/modules/issue/dto";
import type { SelectIssueStatus } from "@/modules/issue-status/schema";
import { useIssues } from "../hooks/issue/issues";
import { useIssueStatuses } from "../hooks/issue/issue-statuses";
import { useUpdateIssueStatus } from "../hooks/issue/update-issue-status";

export function IssueBoard() {
	const { data: issues } = useIssues();
	const { data: statuses } = useIssueStatuses();
	const updateIssueStatus = useUpdateIssueStatus();

	const groupIssuesByStatus = () => {
		if (!issues || !statuses) return {};

		return statuses.reduce(
			(acc: Record<number, DenormalizedIssue[]>, status: SelectIssueStatus) => {
				acc[status.id] = issues.filter(
					(issue: DenormalizedIssue) => issue.issueStatusId === status.id,
				);
				return acc;
			},
			{} as Record<number, DenormalizedIssue[]>,
		);
	};

	const groupedIssues = groupIssuesByStatus();

	const handleDragStart = (e: React.DragEvent, issue: DenormalizedIssue) => {
		console.log(
			"Starting drag for issue:",
			issue.id,
			"current status:",
			issue.issueStatusId,
		);
		e.dataTransfer.setData("issueId", issue.id);
		e.dataTransfer.setData("currentStatusId", issue.issueStatusId.toString());
		e.dataTransfer.effectAllowed = "move";
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		e.dataTransfer.dropEffect = "move";
	};

	const handleDrop = (e: React.DragEvent, newStatusId: number) => {
		e.preventDefault();
		e.stopPropagation();

		const issueId = e.dataTransfer.getData("issueId");
		const currentStatusId = Number.parseInt(
			e.dataTransfer.getData("currentStatusId"),
			10,
		);

		console.log(
			"Dropping issue:",
			issueId,
			"from status:",
			currentStatusId,
			"to status:",
			newStatusId,
		);

		if (issueId && currentStatusId !== newStatusId) {
			// Set userId to 1 when moving to "In Progress" (status ID 2)
			const userId = newStatusId === 2 ? 1 : undefined;
			updateIssueStatus.mutate({
				id: issueId,
				issueStatusId: newStatusId,
				userId,
			});
		}
	};

	return (
		<div className="p-6">
			<div className="flex gap-4 overflow-x-auto">
				{statuses?.map((status: SelectIssueStatus) => (
					<div key={status.id} className="flex-shrink-0 w-80">
						{/* Column Header */}
						<div className="flex items-center gap-2 mb-4 px-1">
							<div
								className={`w-1 h-4 rounded-full ${
									status.name === "Open"
										? "bg-gray-400"
										: status.name === "In Progress"
											? "bg-blue-500"
											: status.name === "Resolved"
												? "bg-green-500"
												: "bg-gray-600"
								}`}
							></div>
							<h3 className="font-medium text-sm text-gray-300">
								{status.name}
							</h3>
							<span className="text-xs text-gray-500">
								{groupedIssues[status.id]?.length || 0}
							</span>
						</div>

						{/* Issues Column */}
						<div
							className="min-h-[400px] space-y-2 rounded-lg border-2 border-dashed border-gray-800 p-2 transition-colors hover:border-gray-600"
							onDragOver={handleDragOver}
							onDragEnter={(e) => {
								e.preventDefault();
								e.currentTarget.classList.add(
									"border-blue-500",
									"bg-blue-500/5",
								);
							}}
							onDragLeave={(e) => {
								e.preventDefault();
								e.currentTarget.classList.remove(
									"border-blue-500",
									"bg-blue-500/5",
								);
							}}
							onDrop={(e) => {
								e.currentTarget.classList.remove(
									"border-blue-500",
									"bg-blue-500/5",
								);
								handleDrop(e, status.id);
							}}
						>
							{groupedIssues[status.id]?.length === 0 ? (
								<div className="text-gray-600 text-sm text-center py-8">
									Drop issues here
								</div>
							) : (
								groupedIssues[status.id]?.map((issue: DenormalizedIssue) => (
									<div
										key={issue.id}
										draggable
										onDragStart={(e) => handleDragStart(e, issue)}
										className="cursor-move"
									>
										<IssueCard issue={issue} />
									</div>
								))
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
