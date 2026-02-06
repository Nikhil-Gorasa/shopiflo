"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

import {
	MagnifyingGlassIcon,
	ShoppingCartIcon,
	HeartIcon,
	Squares2X2Icon,
	Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import {
	ShoppingCartIcon as ShoppingCartIconSolid,
	HeartIcon as HeartIconSolid,
	Squares2X2Icon as Squares2X2IconSolid,
	Cog6ToothIcon as Cog6ToothIconSolid,
} from "@heroicons/react/24/solid";

export default function Navbar() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [searchQuery, setSearchQuery] = useState("");

	// If user types anything in the search bar
	function handleSearch(value: string) {
		setSearchQuery(value);
		const params = new URLSearchParams(searchParams.toString());
		params.set("search", value);
		router.push(`/dashboard/products?${params.toString()}`);
	}

	// TODO: ABSTRACT LOGIC Buttons
	// if search is empty, remove the search param - but only on products listing page
	useEffect(() => {
		if (searchQuery === "" && pathname === "/dashboard/products") {
			const params = new URLSearchParams(searchParams.toString());
			if (params.has("search")) {
				params.delete("search");
				router.push(`/dashboard/products?${params.toString()}`);
			}
		}
	}, [searchQuery, searchParams, router, pathname]);

	return (
		<nav className="flex items-center justify-between w-full h-16 px-6 mx-auto bg-white border-b ">
			{/* LEFT — Logo */}
			<Link
				href="/dashboard/products"
				className="flex items-center gap-2">
				<Image
					src="/shopiflo-icon.png"
					alt="Shopiflo"
					width={32}
					height={32}
				/>
				<span className="text-xl font-semibold text-text-primary">
					Shopiflo
				</span>
			</Link>

			{/* CENTER — Search */}
			<div className="flex justify-center flex-1 px-10">
				<div className="relative w-full max-w-xl">
					<input
						type="text"
						placeholder="Search products, brands..."
						className="w-full px-4 py-2 text-black border rounded-full border-ui-border bg-ui-bg focus:outline-none focus:ring-2 focus:ring-primary"
						onChange={(e) => handleSearch(e.target.value)}
					/>

					<button className="absolute p-2 text-white -translate-y-1/2 rounded-full right-1 top-1/2 bg-primary">
						<MagnifyingGlassIcon className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* RIGHT — Links */}
			<div className="flex items-center gap-1 text-sm font-medium">
				{/* Categories */}
				<Link
					href="/dashboard/products"
					className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 ease-in-out group ${
						pathname === "/dashboard/products"
							? "text-primary"
							: "text-text-secondary hover:text-primary"
					}`}>
					<div className="relative">
						{pathname === "/dashboard/products" ? (
							<Squares2X2IconSolid className="w-6 h-6" />
						) : (
							<>
								<Squares2X2Icon className="w-6 h-6 transition-opacity duration-300 group-hover:opacity-0" />
								<Squares2X2IconSolid className="absolute inset-0 w-6 h-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
							</>
						)}
					</div>
					<span className="font-medium">Products</span>
				</Link>

				{/* Cart */}
				<Link
					href="/dashboard/cart"
					className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 ease-in-out group ${
						pathname === "/dashboard/cart"
							? "text-primary"
							: "text-text-secondary hover:text-primary"
					}`}>
					<div className="relative">
						{pathname === "/dashboard/cart" ? (
							<ShoppingCartIconSolid className="w-6 h-6" />
						) : (
							<>
								<ShoppingCartIcon className="w-6 h-6 transition-opacity duration-300 group-hover:opacity-0" />
								<ShoppingCartIconSolid className="absolute inset-0 w-6 h-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
							</>
						)}
					</div>
					<span className="font-medium">Cart</span>
				</Link>

				{/* Favourites */}
				<Link
					href="/dashboard/favourites"
					className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 ease-in-out group ${
						pathname === "/dashboard/favourites"
							? "text-primary"
							: "text-text-secondary hover:text-primary"
					}`}>
					<div className="relative">
						{pathname === "/dashboard/favourites" ? (
							<HeartIconSolid className="w-6 h-6" />
						) : (
							<>
								<HeartIcon className="w-6 h-6 transition-opacity duration-300 group-hover:opacity-0" />
								<HeartIconSolid className="absolute inset-0 w-6 h-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
							</>
						)}
					</div>
					<span className="font-medium">Favourites</span>
				</Link>

				{/* Settings */}
				<Link
					href="/dashboard/profile"
					className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 ease-in-out group ${
						pathname === "/dashboard/profile"
							? "text-primary"
							: "text-text-secondary hover:text-primary"
					}`}>
					<div className="relative">
						{pathname === "/dashboard/profile" ? (
							<Cog6ToothIconSolid className="w-6 h-6" />
						) : (
							<>
								<Cog6ToothIcon className="w-6 h-6 transition-opacity duration-300 group-hover:opacity-0" />
								<Cog6ToothIconSolid className="absolute inset-0 w-6 h-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
							</>
						)}
					</div>
					<span className="font-medium">Profile</span>
				</Link>
			</div>
		</nav>
	);
}
