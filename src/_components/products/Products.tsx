"use client";
import ProductsCard from "./ProductsCard";
import { useSearchParams } from "next/dist/client/components/navigation";
import { BROAD_CATEGORIES } from "@/_utils/constants/categories";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
	id: number;
	title: string;
	description: string;
	images: string[];
	rating: number;
	price: number;
	category: string;
}

export default function Products() {
	const searchParams = useSearchParams();
	const categorySlug = searchParams.get("category") ?? "all";
	const controller = new AbortController();
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		// If no category param, set it to 'all'

		async function fetchProducts() {
			const categoryObj = Object.values(BROAD_CATEGORIES).find(
				(cat) => cat.slug === categorySlug,
			);

			if (!categoryObj) return;

			const api = categoryObj.api;
			const BASE_URL = "https://dummyjson.com/products";

			let endpoints: string[] = [];

			if (typeof api === "string") {
				endpoints = [`${BASE_URL}`]; // All products
			} else {
				endpoints = api.map((cat) => `${BASE_URL}/category/${cat}`);
			}

			let responses: any[] = [];
			try {
				responses = await Promise.all(
					endpoints.map((url) =>
						fetch(url, { signal: controller.signal }).then((res) =>
							res.json(),
						),
					),
				);
			} catch (error) {
				if (
					typeof error === "object" &&
					error !== null &&
					"name" in error &&
					(error as { name?: string }).name === "AbortError"
				) {
					console.log("Fetch aborted");
				}
			}

			const mergedProducts = responses.flatMap(
				(res) => res.products ?? [],
			);

			// Search Merged Products with search param
			const searchQuery = searchParams.get("search")?.toLowerCase() || "";
			const filteredProducts = mergedProducts.filter(
				(product: Product) =>
					product.title.toLowerCase().includes(searchQuery) ||
					product.description.toLowerCase().includes(searchQuery),
			);

			// Filter products based on price range
			const minPrice = 0;
			const maxPrice = parseInt(
				searchParams.get("maxPrice") || "1000000",
			);

			const priceFilteredProducts = filteredProducts.filter(
				(product: Product) =>
					product.price >= minPrice && product.price <= maxPrice,
			);

			// Filter Products based on Star Rating
			const minRating = parseInt(searchParams.get("minRating") || "2");
			const ratingFilteredProducts = priceFilteredProducts.filter(
				(product: Product) => product.rating >= minRating,
			);

			setProducts(ratingFilteredProducts);
		}

		fetchProducts();
		return () => {
			// controller.abort();
		};
	}, [categorySlug, searchParams]);

	//Handling onclick on product from parent (Event Delegation)

	const router = useRouter();

	function handleContainerClick(e: React.MouseEvent<HTMLDivElement>) {
		const target = e.target as HTMLElement;
		const productCard = target.closest("[data-product-id]") as HTMLElement;
		if (productCard) {
			const productId = productCard.getAttribute("data-product-id");
			console.log("Clicked product ID:", productId);
			router.push(`/dashboard/products/${productId}`);
		}
	}

	return (
		<div className="min-h-screen" onClick={handleContainerClick}>
			{products.length === 0 && (
				<p className="p-6 text-center text-text-muted">
					No products found.
				</p>
			)}

			<div className="flex flex-wrap justify-around gap-6">
				{products.map((product) => (
					<ProductsCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
