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
} from "@heroicons/react/24/outline";

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
			<Link href="/" className="flex items-center gap-2">
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
			<div className="flex items-center gap-6 text-sm font-medium">
				{/* Categories */}
				<div className="flex items-center gap-1 hover:text-primary">
					<button>
						<Squares2X2Icon className="w-6 h-6 text-text-secondary" />
					</button>
					<Link
						href="/categories"
						className="transition text-text-secondary hover:text-primary">
						Categories
					</Link>
				</div>

				{/* Cart */}
				<div className="flex items-center gap-1">
					<button>
						<ShoppingCartIcon className="w-6 h-6 text-text-secondary hover:text-primary" />
					</button>

					<Link
						href="/dashboard/cart"
						className="transition text-text-secondary hover:text-primary">
						Cart
					</Link>
				</div>

				{/* Favourites */}
				<div className="flex items-center gap-1">
					<button>
						<HeartIcon className="w-6 h-6 text-text-secondary hover:text-primary" />
					</button>
					<Link
						href="/dashboard/favourites"
						className="transition text-text-secondary hover:text-primary">
						Favourites
					</Link>
				</div>

				{/* Settings */}
				<div className="flex items-center gap-1">
					<button>
						<Squares2X2Icon className="w-6 h-6 text-text-secondary hover:text-primary" />
					</button>
					<Link
						href="/dashboard/settings"
						className="transition text-text-secondary hover:text-primary">
						Settings
					</Link>
				</div>
			</div>
		</nav>
	);
}
