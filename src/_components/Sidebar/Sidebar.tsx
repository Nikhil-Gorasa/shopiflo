"use client";
import PriceRange from "./PriceRange";
import StarRating from "./StarRating";
import SubCategories from "./SubCategories";

interface SidebarProps {
	maxPrice?: number;
}

export default function Sidebar({ maxPrice }: SidebarProps) {
	return (
		<div>
			<aside className="flex flex-col gap-2 p-6 bg-transparent w-80 rounded-3xl h-fit">
				<PriceRange maxValue={maxPrice} />
				<StarRating />
				<SubCategories />
			</aside>
		</div>
	);
}
