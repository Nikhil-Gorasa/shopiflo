import { Product } from "@/types/product.types";

export function calculatePriceRange(products: Product[]): {
	min: number;
	max: number;
} {
	if (products.length === 0) {
		return { min: 0, max: 2000 };
	}

	const prices = products.map((p) => p.price);
	return {
		min: Math.floor(Math.min(...prices)),
		max: Math.ceil(Math.max(...prices)),
	};
}
