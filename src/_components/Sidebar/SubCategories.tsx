export default function SubCategories() {
	const subcategories = [
		{ name: "Adidas", icon: "▲" },
		{ name: "Columbia", icon: "◆" },
		{ name: "Demix", icon: "▶" },
		{ name: "New Balance", icon: "N" },
		{ name: "Nike", icon: "✓" },
		{ name: "Xiaomi", icon: "◉" },
	];
	return (
		<div className="p-6 bg-white shadow-sm rounded-3xl h-fit">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-text-primary">
					Sub Categories
				</h3>
				<button className="text-sm text-text-muted hover:text-text-secondary">
					Reset
				</button>
			</div>
			<div className="space-y-3">
				{subcategories.map((subcategory) => (
					<label
						key={subcategory.name}
						className="flex items-center gap-3 cursor-pointer group">
						<div className="relative flex items-center">
							<input
								type="checkbox"
								className="sr-only peer"
								defaultChecked
							/>
							<div className="flex items-center justify-center w-5 h-5 transition-all border-2 border-gray-300 rounded peer-checked:bg-primary peer-checked:border-primary">
								<svg
									className="w-3 h-3 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={3}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
						</div>
						<span className="text-sm font-medium transition-colors text-text-primary group-hover:text-primary">
							{subcategory.icon} {subcategory.name}
						</span>
					</label>
				))}
			</div>
			<button className="mt-4 text-sm font-medium text-primary hover:underline">
				More Categories
			</button>
		</div>
	);
}
