"use client";
import Products from "@/_components/products/Products";
import CategoriesBar from "@/_components/CategoriesBar/CategoriesBar";
import Sidebar from "@/_components/Sidebar/Sidebar";
import { Suspense, useState } from "react";

export const dynamic = "force-dynamic";

export default function Page() {
	const [maxPrice, setMaxPrice] = useState(2000);

	return (
		<div className="min-h-screen px-8 text-black bg-gray-100">
			<Suspense fallback={<div>Loading categories...</div>}>
				<CategoriesBar />
			</Suspense>
			<div className="flex">
				<Suspense fallback={<div>Loading filters...</div>}>
					<Sidebar maxPrice={maxPrice} />
				</Suspense>
				<Suspense fallback={<div>Loading products...</div>}>
					<Products onMaxPriceChange={setMaxPrice} />
				</Suspense>
			</div>
		</div>
	);
}
