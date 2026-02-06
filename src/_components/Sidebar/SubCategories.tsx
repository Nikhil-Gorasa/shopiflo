"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { BROAD_CATEGORIES } from "@/_utils/constants/categories";
import { useState, useEffect } from "react";

export default function SubCategories() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const categorySlug = searchParams.get("category") ?? "all";
	const [selectedSubCategories, setSelectedSubCategories] = useState<
		string[]
	>([]);

	// Get subcategories for current main category
	const getCurrentSubCategories = () => {
		const categoryObj = Object.values(BROAD_CATEGORIES).find(
			(cat) => cat.slug === categorySlug,
		);

		if (!categoryObj) return [];

		// For "All Categories", show all available categories as subcategories
		if (typeof categoryObj.api === "string") {
			// Get all categories from all category objects
			const allCategories = Object.values(BROAD_CATEGORIES)
				.filter((cat) => typeof cat.api !== "string") // Exclude "All Categories" itself
				.flatMap((cat) => cat.api as string[]);

			// Remove duplicates and return
			return Array.from(new Set(allCategories));
		}

		return categoryObj.api as string[];
	};

	const subCategories = getCurrentSubCategories();

	// Update URL with selected subcategories
	const updateURL = (newSubCategories: string[]) => {
		const params = new URLSearchParams(searchParams.toString());

		if (newSubCategories.length > 0) {
			params.set("subcategories", newSubCategories.join(","));
		} else {
			params.delete("subcategories");
		}

		router.push(`?${params.toString()}`);
	};

	// Handle subcategory selection
	const handleSubCategoryChange = (subCategory: string, checked: boolean) => {
		const newSelection = checked
			? [...selectedSubCategories, subCategory]
			: selectedSubCategories.filter((cat) => cat !== subCategory);

		setSelectedSubCategories(newSelection);
		updateURL(newSelection);
	};

	// Reset all subcategories
	const handleReset = () => {
		setSelectedSubCategories([]);
		updateURL([]);
	};

	// Load selected subcategories from URL on component mount
	useEffect(() => {
		const urlSubCategories = searchParams.get("subcategories");
		if (urlSubCategories) {
			// If URL has subcategories, use those
			setSelectedSubCategories(urlSubCategories.split(","));
		} else {
			// Default to empty array (no checkboxes selected)
			setSelectedSubCategories([]);
		}
	}, [categorySlug]);

	// Format category name for display
	const formatCategoryName = (category: string) => {
		return category
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};

	// Don't render if no subcategories
	if (subCategories.length === 0) {
		return null;
	}

	return (
		<div className="p-6 bg-white shadow-sm rounded-3xl h-fit">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-text-primary">
					Sub Categories
				</h3>
				<button
					onClick={handleReset}
					className="text-sm text-text-muted hover:text-text-secondary">
					Reset
				</button>
			</div>
			<div className="space-y-3">
				{subCategories.map((subCategory) => (
					<label
						key={subCategory}
						className="flex items-center gap-3 cursor-pointer group">
						<div className="relative flex items-center">
							<input
								type="checkbox"
								className="sr-only peer"
								checked={selectedSubCategories.includes(
									subCategory,
								)}
								onChange={(e) =>
									handleSubCategoryChange(
										subCategory,
										e.target.checked,
									)
								}
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
							{formatCategoryName(subCategory)}
						</span>
					</label>
				))}
			</div>
			{selectedSubCategories.length > 0 && (
				<div className="mt-4 text-xs text-gray-500">
					{selectedSubCategories.length} selected
				</div>
			)}
		</div>
	);
}
