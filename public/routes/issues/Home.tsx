import { IssueBoard } from "../../components/IssueBoard";

export function Home() {
	return (
		<div className="flex bg-gray-950 min-h-screen">
			<div className="w-60 bg-gray-900 border-r border-gray-800">
				<div className="p-6">
					<div className="flex items-center gap-3 mb-8">
						<div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg"></div>
						<h1 className="text-xl font-semibold text-white">Issue Tracker</h1>
					</div>
					<nav>
						<ul className="space-y-1">
							<li>
								<a
									href="#"
									className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
								>
									<div className="w-4 h-4" />
									All Issues
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
								>
									<div className="w-4 h-4" />
									My Issues
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="flex-1">
				<div className="border-b border-gray-800 px-8 py-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-medium text-white">Board</h2>
						<div className="flex items-center gap-2">
							<button
								type="button"
								className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
							>
								Filter
							</button>
							<button
								type="button"
								className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
							>
								Sort
							</button>
						</div>
					</div>
				</div>
				<IssueBoard />
			</div>
		</div>
	);
}
