"use client";
import PriceRange from "./PriceRange";
import StarRating from "./StarRating";
import SubCategories from "./SubCategories";

export default function Sidebar() {
	return (
		<div>
			<aside className="flex flex-col gap-2 p-6 bg-transparent w-80 rounded-3xl h-fit">
				<PriceRange />
				<StarRating />
				<SubCategories />
			</aside>
		</div>
	);
}
