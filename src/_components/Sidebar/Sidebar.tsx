"use client";
import PriceRange from "./PriceRange";
import StarRating from "./StarRating";
import SubCategories from "./SubCategories";

export default function Sidebar() {
	return (
		<div className="w-full lg:w-auto">
			<aside className="flex flex-col gap-2 p-4 sm:p-6 bg-transparent w-full lg:w-80 rounded-3xl h-fit">
				<PriceRange />
				<StarRating />
				<SubCategories />
			</aside>
		</div>
	);
}
