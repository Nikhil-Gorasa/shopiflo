import React from "react";
import { StarIcon } from "@heroicons/react/24/outline";

interface ProductInfoProps {
	title: string;
	brand: string;
	rating: number;
	reviewCount: number;
	availabilityStatus: string;
}

export default function ProductInfo({
	title,
	brand,
	rating,
	reviewCount,
	availabilityStatus,
}: ProductInfoProps) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-wrap items-center gap-2">
				<h1 className="text-xl sm:text-2xl font-bold text-text-primary">
					{title}
				</h1>
				<span
					className={`text-xs px-2 py-1 rounded-full font-semibold ${availabilityStatus === "In Stock" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
					{availabilityStatus}
				</span>
			</div>
			<h3 className="font-light text-md text-text-primary/50">
				By {brand}
			</h3>

			<div className="flex items-center gap-2">
				<span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-black rounded-full shadow bg-gradient-to-t from-gray-200 to-gray-100 w-fit">
					{rating} / 5
					<StarIcon className="w-4 h-4 fill-yellow-400 stroke-none relative bottom-[1px]" />
				</span>
				<span className="text-sm text-gray-500">
					({reviewCount} reviews)
				</span>
			</div>
		</div>
	);
}
