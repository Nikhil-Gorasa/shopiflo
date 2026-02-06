"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/hooks/reduxhooks";

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
	const [mounted, setMounted] = useState(false);

	// Get cart and favourites counts from Redux
	const cartItems = useAppSelector((state) => state.cart.cartItems);
	const favouriteItems = useAppSelector(
		(state) => state.favourites.favouriteItems,
	);
	const cartCount = cartItems.length;
	const favouritesCount = favouriteItems.length;

	useEffect(() => {
		setMounted(true);
	}, []);

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
		<nav className="flex flex-col w-screen max-w-full bg-white border-b lg:flex-row lg:items-center lg:justify-between lg:h-16 lg:px-6 overflow-x-hidden">
			{/* Mobile Header - Logo + Search */}
			<div className="flex items-center justify-between w-full gap-1.5 px-2 py-3 lg:w-auto lg:px-0 lg:py-0 lg:gap-2">
				{/* Logo */}
				<Link
					href="/dashboard/products"
					className="flex items-center gap-1.5 flex-shrink-0">
					<Image
						src="/shopiflo-icon.png"
						alt="Shopiflo"
						width={28}
						height={28}
					/>
					<span className="text-base sm:text-lg lg:text-xl font-semibold text-text-primary whitespace-nowrap">
						Shopiflo
					</span>
				</Link>

				{/* Search Bar - Mobile */}
				<div className="relative flex-1 min-w-0 ml-1.5 lg:hidden">
					<input
						type="text"
						placeholder="Search..."
						className="w-full px-2.5 py-1.5 pr-9 text-sm text-black border rounded-full border-ui-border bg-ui-bg focus:outline-none focus:ring-2 focus:ring-primary"
						onChange={(e) => handleSearch(e.target.value)}
					/>
					<button className="absolute p-1.5 text-white -translate-y-1/2 rounded-full right-1 top-1/2 bg-primary">
						<MagnifyingGlassIcon className="w-3.5 h-3.5" />
					</button>
				</div>
			</div>

			{/* CENTER — Search - Desktop */}
			<div className="justify-center flex-1 hidden px-10 lg:flex">
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

			{/* RIGHT — Links - Desktop Only */}
			<div className="items-center hidden gap-1 text-sm font-medium lg:flex">
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
					<span className="hidden font-medium xl:block">
						Products
					</span>
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
						{mounted && cartCount > 0 && (
							<span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full">
								{cartCount > 99 ? "99+" : cartCount}
							</span>
						)}
					</div>
					<span className="hidden font-medium xl:block">Cart</span>
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
						{mounted && favouritesCount > 0 && (
							<span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full">
								{favouritesCount > 99 ? "99+" : favouritesCount}
							</span>
						)}
					</div>
					<span className="hidden font-medium xl:block">
						Favourites
					</span>
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
					<span className="hidden font-medium xl:block">Profile</span>
				</Link>
			</div>
		</nav>
	);
}
