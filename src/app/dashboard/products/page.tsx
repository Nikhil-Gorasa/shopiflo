"use client";
import Products from "@/_components/products/Products";
import CategoriesBar from "@/_components/CategoriesBar/CategoriesBar";
import Sidebar from "@/_components/Sidebar/Sidebar";
import { Suspense } from "react";

export default function Page() {
	return (
		<div className="min-h-screen px-8 text-black bg-gray-100">
			<Suspense fallback={<div>Loading...</div>}>
				<CategoriesBar />
				<div className="flex">
					<Sidebar />
					<Products />
				</div>
			</Suspense>
		</div>
	);
}
