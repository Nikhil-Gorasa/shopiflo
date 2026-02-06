import { useMemo } from "react";
import { Product } from "@/types/product.types";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
	filterBySubcategories,
	filterBySearch,
	filterByPriceRange,
	filterByRating,
} from "@/_utils/helpers/productFilters";

interface UseProductFiltersProps {
	products: Product[];
	searchParams: ReadonlyURLSearchParams;
	isAllCategories: boolean;
}

export function useProductFilters({
	products,
	searchParams,
	isAllCategories,
}: UseProductFiltersProps) {
	const filteredProducts = useMemo(() => {
		const selectedSubCategories =
			searchParams.get("subcategories")?.split(",") || [];

		// Step 1: Filter by subcategory
		let filtered =
			isAllCategories && selectedSubCategories.length > 0
				? filterBySubcategories(products, selectedSubCategories)
				: products;

		// Step 2: Filter by search query
		const searchQuery = searchParams.get("search") || "";
		filtered = filterBySearch(filtered, searchQuery);

		// Step 3: Filter by price range
		const minPrice = parseInt(searchParams.get("minPrice") || "0");
		const maxPrice = parseInt(searchParams.get("maxPrice") || "1000000");
		filtered = filterByPriceRange(filtered, minPrice, maxPrice);

		// Step 4: Filter by rating
		const minRating = parseInt(searchParams.get("minRating") || "0");
		filtered = filterByRating(filtered, minRating);

		return filtered;
	}, [products, searchParams, isAllCategories]);

	return filteredProducts;
}
