"use client";
import ProductsCard from "./ProductsCard";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { BROAD_CATEGORIES } from "@/_utils/constants/categories";
import { useProducts } from "@/hooks/useProducts";
import { useProductFilters } from "@/hooks/useProductFilters";
import { usePagination } from "@/hooks/usePagination";

const PRODUCTS_PER_PAGE = 12;

export default function Products() {
	const searchParams = useSearchParams();
	const categorySlug = searchParams.get("category") ?? "all";
	const router = useRouter();

	// Fetch products
	const { products } = useProducts({ categorySlug, searchParams });

	// Check if current category is "All Categories"
	const categoryObj = Object.values(BROAD_CATEGORIES).find(
		(cat) => cat.slug === categorySlug,
	);
	const isAllCategories = typeof categoryObj?.api === "string";

	// Apply filters
	const filteredProducts = useProductFilters({
		products,
		searchParams,
		isAllCategories,
	});

	// Handle pagination
	const {
		currentPage,
		totalPages,
		startIndex,
		endIndex,
		currentItems: currentProducts,
		handlePageChange,
		handlePrevPage,
		handleNextPage,
	} = usePagination({
		items: filteredProducts,
		itemsPerPage: PRODUCTS_PER_PAGE,
	});

	const totalProducts = filteredProducts.length;

	// Event delegation for product clicks
	function handleContainerClick(e: React.MouseEvent<HTMLDivElement>) {
		const target = e.target as HTMLElement;
		const productCard = target.closest("[data-product-id]") as HTMLElement;
		if (productCard) {
			const productId = productCard.getAttribute("data-product-id");
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
