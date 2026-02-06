"use client";
import ProductsCard from "./ProductsCard";
import { useSearchParams } from "next/dist/client/components/navigation";
import { BROAD_CATEGORIES } from "@/_utils/constants/categories";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product, ProductApiResponse } from "@/types/product.types";

interface ProductsProps {
	onMaxPriceChange?: (maxPrice: number) => void;
}

export default function Products({ onMaxPriceChange }: ProductsProps) {
	const searchParams = useSearchParams();
	const categorySlug = searchParams.get("category") ?? "all";
	const router = useRouter();

	// State to hold fetched products
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const [currentPage, setCurrentPage] = useState(1);

	const PRODUCTS_PER_PAGE = 12;

	let endpoints: string[] = [];
	let responses: ProductApiResponse[] = [];

	useEffect(() => {
		// Create controller inside useEffect to prevent recreation on every render
		const controller = new AbortController();

		// If no category param, set it to 'all'
		async function fetchProducts() {
			const categoryObj = Object.values(BROAD_CATEGORIES).find(
				(cat) => cat.slug === categorySlug,
			);

			if (!categoryObj) return;

			const api = categoryObj.api;
			const BASE_URL = "https://dummyjson.com/products";

			// Get selected subcategories from URL
			const selectedSubCategories =
				searchParams.get("subcategories")?.split(",") || [];

			if (typeof api === "string") {
				// For "All Categories", fetch all products
				endpoints = [`${BASE_URL}?limit=0`]; // Get all products by setting limit to 0
			} else {
				// Filter API endpoints based on selected subcategories
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

			// Filter by subcategory if "All Categories" and subcategories are selected
			let categoryFilteredProducts = mergedProducts;
			if (typeof api === "string" && selectedSubCategories.length > 0) {
				categoryFilteredProducts = mergedProducts.filter(
					(product: Product) =>
						selectedSubCategories.includes(product.category),
				);
			}

			// Search filtered products with search param
			const searchQuery = searchParams.get("search")?.toLowerCase() || "";
			const filteredProducts = categoryFilteredProducts.filter(
				(product: Product) =>
					product.title.toLowerCase().includes(searchQuery),
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

			setAllProducts(ratingFilteredProducts);
			setCurrentPage(1); // Reset to first page when filters change

			// Calculate maximum price from filtered products
			if (ratingFilteredProducts.length > 0 && onMaxPriceChange) {
				const maxProductPrice = Math.max(
					...ratingFilteredProducts.map((p) => p.price),
				);
				onMaxPriceChange(Math.ceil(maxProductPrice)); // Round up to nearest whole number
			}
		}

		fetchProducts();

		// Cleanup function to abort request on unmount or dependency change
		return () => {
			controller.abort();
		};
	}, [categorySlug, searchParams]);

	// Calculate pagination
	const totalProducts = allProducts.length;
	const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
	const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
	const endIndex = startIndex + PRODUCTS_PER_PAGE;
	const currentProducts = allProducts.slice(startIndex, endIndex);

	// Pagination handlers
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			handlePageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			handlePageChange(currentPage + 1);
		}
	};

	//Handling onclick on product from parent (Event Delegation)
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
		<div className="min-h-screen mb-6" onClick={handleContainerClick}>
			{totalProducts === 0 && (
				<p className="p-6 text-center text-text-muted">
					No products found.
				</p>
			)}

			{totalProducts > 0 && (
				<>
					{/* Products Info */}
					<div className="mb-4 text-sm text-gray-600">
						Showing {startIndex + 1}-
						{Math.min(endIndex, totalProducts)} of {totalProducts}{" "}
						products
					</div>

					{/* Products Grid */}
					<div className="flex flex-wrap justify-start gap-6">
						{currentProducts.map((product) => (
							<ProductsCard key={product.id} product={product} />
						))}
					</div>

					{/* Pagination Controls */}
					{totalPages > 1 && (
						<div className="flex items-center justify-center gap-2 mt-8 mb-10">
							{/* Previous Button */}
							<button
								onClick={handlePrevPage}
								disabled={currentPage === 1}
								className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
								Previous
							</button>

							{/* Page Numbers */}
							<div className="flex gap-1">
								{Array.from(
									{ length: totalPages },
									(_, i) => i + 1,
								).map((page) => (
									<button
										key={page}
										onClick={() => handlePageChange(page)}
										className={`px-3 py-2 text-sm border rounded-lg ${
											currentPage === page
												? "bg-primary text-white border-primary"
												: "border-gray-300 hover:bg-gray-50"
										}`}>
										{page}
									</button>
								))}
							</div>

							{/* Next Button */}
							<button
								onClick={handleNextPage}
								disabled={currentPage === totalPages}
								className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
								Next
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
