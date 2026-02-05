"use client";
import Products from "@/_components/products/Products";
import CategoriesBar from "@/_components/CategoriesBar/CategoriesBar";
import Sidebar from "@/_components/Sidebar/Sidebar";

export default function Page() {
	return (
		<div className="min-h-screen px-8 text-black bg-gray-100">
			<CategoriesBar />
			<div className="flex">
				<Sidebar />
				<Products />
			</div>
		</div>
	);
}
