import React from "react";
import { FireIcon } from "@heroicons/react/24/solid";

interface ProductPricingProps {
	price: number;
	discountPercentage: number;
}

export default function ProductPricing({
	price,
	discountPercentage,
}: ProductPricingProps) {
	const originalPrice = (price / (1 - discountPercentage / 100)).toFixed(2);

	return (
		<div className="flex flex-col items-start gap-2 sm:gap-3 mb-2">
			<div className="flex items-center gap-3 sm:gap-4">
				<span className="text-2xl sm:text-3xl font-bold text-primary">
					${price}
				</span>
				<span className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
					-{discountPercentage}%
					<FireIcon className="w-4 h-4 text-orange-500" />
				</span>
			</div>
			<span className="text-gray-500 line-through font-ld text-md">
				${originalPrice}
			</span>
		</div>
	);
}
