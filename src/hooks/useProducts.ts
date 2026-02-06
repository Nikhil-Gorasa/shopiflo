import { useEffect, useState } from "react";
import { Product, ProductApiResponse } from "@/types/product.types";
import { BROAD_CATEGORIES } from "@/_utils/constants/categories";
import { ReadonlyURLSearchParams } from "next/navigation";
import { calculatePriceRange } from "@/_utils/helpers/priceHelpers";
import { usePriceRange } from "@/_utils/context/PriceRangeContext";

interface UseProductsProps {
	categorySlug: string;
	searchParams: ReadonlyURLSearchParams;
}

export function useProducts({ categorySlug, searchParams }: UseProductsProps) {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const { setMinPrice, setMaxPrice } = usePriceRange();

	useEffect(() => {
		const controller = new AbortController();

		async function fetchProducts() {
			setLoading(true);

			const categoryObj = Object.values(BROAD_CATEGORIES).find(
				(cat) => cat.slug === categorySlug,
			);

			if (!categoryObj) {
				setLoading(false);
				return;
			}

			const api = categoryObj.api;
			const BASE_URL = "https://dummyjson.com/products";
			const selectedSubCategories =
				searchParams.get("subcategories")?.split(",") || [];

			let endpoints: string[] = [];

			if (typeof api === "string") {
				endpoints = [`${BASE_URL}?limit=0`];
			} else {
				const filteredApi =
					selectedSubCategories.length > 0
						? api.filter((category) =>
								selectedSubCategories.includes(category),
							)
						: api;

				endpoints = filteredApi.map(
					(cat) => `${BASE_URL}/category/${cat}`,
				);
			}

			try {
				const responses: ProductApiResponse[] = await Promise.all(
					endpoints.map((url) =>
						fetch(url, { signal: controller.signal }).then((res) =>
							res.json(),
						),
					),
				);

				const mergedProducts = responses.flatMap(
					(res) => res.products ?? [],
				);

				// Calculate price range from current category/subcategory products
				if (mergedProducts.length > 0) {
					const { min, max } = calculatePriceRange(mergedProducts);
					console.log("Calculated Price Range:", { min, max });
					setMinPrice(min);
					setMaxPrice(max);
				}

				setProducts(mergedProducts);
			} catch (error) {
				if (
					error &&
					typeof error === "object" &&
					"name" in error &&
					error.name !== "AbortError"
				) {
					console.error("Error fetching products:", error);
				}
				setProducts([]);
			} finally {
				setLoading(false);
			}
		}

		fetchProducts();

		return () => {
			controller.abort();
		};
	}, [categorySlug, searchParams, setMinPrice, setMaxPrice]);

	return { products, loading };
}
