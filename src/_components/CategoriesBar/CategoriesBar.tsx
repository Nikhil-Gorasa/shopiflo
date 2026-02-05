"use client";

import { useState, useEffect } from "react";
import CategoryPills from "./CategoryPills";
import { BROAD_CATEGORIES } from "@/_utils/constants/categories";

export default function CategoriesBar() {
	const [activeCategory, setActiveCategory] = useState("All Categories");

	useEffect(() => {
		// Reset active category to "All Categories" when the component mounts
		setActiveCategory("All Categories");
		console.log(BROAD_CATEGORIES);
	}, []);

	return (
		<div className="flex items-center gap-3 px-6 py-4 overflow-x-auto">
			{Object.entries(BROAD_CATEGORIES).map(([key, value]) => (
				<CategoryPills
					key={key}
					categoryKey={key}
					category={value}
					setActiveCategory={setActiveCategory}
					activeCategory={activeCategory}
				/>
			))}
		</div>
	);
}
