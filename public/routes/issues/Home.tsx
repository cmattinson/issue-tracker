import { IssueCard } from "public/components/IssueCard";
import type { SelectIssue } from "@/modules/issue/schema";
import { useIssues } from "../../hooks/issues";

export function Home() {
	const { data: issues, isLoading } = useIssues();

	return (
		<div className="flex">
			<div className="bg-gray-800 text-white w-64 min-h-screen">
				<div className="p-4">
					<h1 className="text-2xl font-bold">Sidebar Title</h1>
				</div>
				<nav>
					<ul>
						<li className="hover:bg-gray-700">
							<a href="#" className="block p-4">
								All Issues
							</a>
						</li>

						<li className="hover:bg-gray-700">
							<a href="#" className="block p-4">
								My Issues
							</a>
						</li>
					</ul>
				</nav>
			</div>
			<div className="flex-1 p-6">
				<h2 className="text-2xl font-semibold">Main Content Area</h2>
				<ul>
					{issues?.map((issue: SelectIssue) => (
						<IssueCard key={issue.id} issue={issue} />
					))}
				</ul>
			</div>
		</div>
	);
}
