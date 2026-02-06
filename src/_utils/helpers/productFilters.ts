import { Product } from "@/types/product.types";

export function filterBySubcategories(
	products: Product[],
	subcategories: string[],
): Product[] {
	if (subcategories.length === 0) return products;
	return products.filter((product) =>
		subcategories.includes(product.category),
	);
}

export function filterBySearch(
	products: Product[],
	searchQuery: string,
): Product[] {
	if (!searchQuery) return products;
	const lowerQuery = searchQuery.toLowerCase();
	return products.filter((product) =>
		product.title.toLowerCase().includes(lowerQuery),
	);
}

export function filterByPriceRange(
	products: Product[],
	minPrice: number,
	maxPrice: number,
): Product[] {
	return products.filter(
		(product) => product.price >= minPrice && product.price <= maxPrice,
	);
}

export function filterByRating(
	products: Product[],
	minRating: number,
): Product[] {
	return products.filter((product) => product.rating >= minRating);
}
