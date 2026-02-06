"use client";
import Products from "@/_components/products/Products";
import { PriceRangeProvider } from "@/_utils/context/PriceRangeContext";
import { Suspense, useState, lazy } from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import Loader from "@/_components/Loader/Loader";

const CategoriesBar = lazy(
	() => import("@/_components/CategoriesBar/CategoriesBar"),
);
const Sidebar = lazy(() => import("@/_components/Sidebar/Sidebar"));
import {
	FunnelIcon,
	Squares2X2Icon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

export const dynamic = "force-dynamic";

export default function Page() {
	useProtectedRoute(); // Protect this route
	const [showCategories, setShowCategories] = useState(false);
	const [showFilters, setShowFilters] = useState(false);

	return (
		<PriceRangeProvider>
			<div className="min-h-screen px-4 sm:px-6 md:px-8 text-black bg-gray-100">
				{/* Mobile Filter Buttons */}
				<div className="flex gap-2 py-3 lg:hidden">
					<button
						onClick={() => setShowCategories(true)}
						className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary hover:bg-primary/90">
						<Squares2X2Icon className="w-5 h-5" />
						Categories
					</button>
					<button
						onClick={() => setShowFilters(true)}
						className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary hover:bg-primary/90">
						<FunnelIcon className="w-5 h-5" />
						Filters
					</button>
				</div>

				{/* Desktop Categories Bar */}
				<div className="hidden lg:block">
					<Suspense fallback={<Loader />}>
						<CategoriesBar />
					</Suspense>
				</div>

				{/* Categories Modal - Mobile */}
				{showCategories && (
					<div
						onClick={() => setShowCategories(false)}
						className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 lg:hidden">
						<div
							onClick={(e) => e.stopPropagation()}
							className="w-full max-h-[60vh] bg-white rounded-t-2xl shadow-xl animate-slide-up overflow-hidden flex flex-col">
							<div className="flex items-center justify-between p-4 bg-white border-b flex-shrink-0">
								<h2 className="text-lg font-semibold">
									Categories
								</h2>
								<button
									onClick={() => setShowCategories(false)}
									className="p-1 rounded-full hover:bg-gray-100">
									<XMarkIcon className="w-6 h-6" />
								</button>
							</div>
							<div className="p-4 overflow-y-auto flex-1">
								<Suspense fallback={<Loader />}>
									<CategoriesBar />
								</Suspense>
							</div>
						</div>
					</div>
				)}

				{/* Filters Modal - Mobile */}
				{showFilters && (
					<div
						onClick={() => setShowFilters(false)}
						className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 lg:hidden">
						<div
							onClick={(e) => e.stopPropagation()}
							className="w-full max-h-[75vh] bg-white rounded-t-2xl shadow-xl animate-slide-up overflow-hidden flex flex-col">
							<div className="flex items-center justify-between p-4 bg-white border-b flex-shrink-0">
								<h2 className="text-lg font-semibold">
									Filters
								</h2>
								<button
									onClick={() => setShowFilters(false)}
									className="p-1 rounded-full hover:bg-gray-100">
									<XMarkIcon className="w-6 h-6" />
								</button>
							</div>
							<div className="p-4 overflow-y-auto flex-1">
								<Suspense fallback={<Loader />}>
									<Sidebar />
								</Suspense>
							</div>
							<div className="p-4 bg-white border-t flex-shrink-0">
								<button
									onClick={() => setShowFilters(false)}
									className="w-full px-4 py-3 font-medium text-white rounded-lg bg-primary hover:bg-primary/90">
									Apply Filters
								</button>
							</div>
						</div>
					</div>
				)}

				<div className="flex flex-col lg:flex-row gap-4">
					{/* Desktop Sidebar */}
					<div className="hidden lg:block">
						<Suspense fallback={<Loader />}>
							<Sidebar />
						</Suspense>
					</div>
					<Suspense fallback={<Loader />}>
						<Products />
					</Suspense>
				</div>
			</div>
		</PriceRangeProvider>
	);
}
