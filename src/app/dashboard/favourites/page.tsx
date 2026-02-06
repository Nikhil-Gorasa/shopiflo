"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { addToCart } from "@/redux/Slices/cart/cartSlice";
import {
	loadUserFavourites,
	removeFromFavourites,
	clearFavourites,
} from "@/redux/Slices/favourites/favouritesSlice";
import {
	HeartIcon,
	ShoppingCartIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { Product } from "@/types/product.types";

export default function FavouritesPage() {
	const dispatch = useAppDispatch();
	const [currentUser, setCurrentUser] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const { favouriteItems = [] } = useAppSelector(
		(state) => state.favourites || { favouriteItems: [] },
	);

	useEffect(() => {
		// Check localStorage only on client side
		const savedUser =
			typeof window !== "undefined"
				? localStorage.getItem("currentUser")
				: null;
		setCurrentUser(savedUser);

		// Load favourites from Redux when user is found
		if (savedUser) {
			const userEmail = JSON.parse(savedUser).email;
			dispatch(loadUserFavourites(userEmail));
		}
		setIsLoading(false);
	}, [dispatch]);

	const handleRemoveFromFavourites = (productId: number) => {
		dispatch(removeFromFavourites(productId));
	};

	const addToCartHandler = (product: Product) => {
		dispatch(
			addToCart({
				product: {
					...product,
					title: product.title || product.name,
					description: product.description || "",
				},
				quantity: 1,
			}),
		);
		// Toast Notification for adding to cart
		toast.success(`${product.title || product.name} added to cart!`);
		// Removing from the favourites
		dispatch(removeFromFavourites(product.id));
	};

	const handleClearAllFavourites = () => {
		dispatch(clearFavourites());
	};

	// Show loading state while checking authentication
	if (isLoading) {
		return (
			<div className="min-h-screen px-8 py-12 text-black bg-gray-100">
				<div className="flex flex-col items-center justify-center h-96">
					<div className="w-8 h-8 border-2 rounded-full border-primary border-t-transparent animate-spin"></div>
					<p className="mt-4 text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	if (!currentUser) {
		return (
			<div className="min-h-screen px-8 py-12 text-black bg-gray-100">
				<div className="flex flex-col items-center justify-center h-96">
					<HeartIcon className="w-16 h-16 mb-4 text-gray-400" />
					<h2 className="mb-2 text-2xl font-bold text-gray-600">
						Please Login to View Favourites
					</h2>
					<p className="text-gray-500">
						You need to be logged in to access your favourites.
					</p>
				</div>
			</div>
		);
	}

	if (favouriteItems.length === 0) {
		return (
			<div className="min-h-screen px-8 py-12 text-black bg-gray-100">
				<div className="max-w-6xl mx-auto">
					<h1 className="mb-8 text-3xl font-bold">My Favourites</h1>
					<div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm h-96">
						<HeartIcon className="w-16 h-16 mb-4 text-gray-400" />
						<h2 className="mb-2 text-2xl font-bold text-gray-600">
							No favourites yet
						</h2>
						<p className="text-gray-500">
							Start browsing and add products to your favourites!
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen px-8 py-12 text-black bg-gray-100">
			<div className="max-w-6xl mx-auto">
				{/* Head of Favourites */}
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-3xl font-bold">My Favourites</h1>
					<button
						onClick={handleClearAllFavourites}
						className="px-4 py-2 text-red-600 transition border border-red-200 rounded-lg hover:bg-red-50">
						<TrashIcon className="inline-block w-5 h-5 mr-2" />
						Clear All
					</button>
				</div>

				{/* Favourites Items - Full Width */}
				<div className="p-6 bg-white rounded-lg shadow-sm">
					<h2 className="mb-6 text-xl font-semibold">
						Favourites ({favouriteItems.length})
					</h2>

					{/* Favourites Grid */}
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{favouriteItems.map((item) => (
							<div
								key={item.product.id}
								className="relative p-4 transition-shadow border border-gray-200 rounded-lg hover:shadow-md">
								{/* Product Image */}
								<div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-gray-300 to-gray-500">
									<img
										src={item.product.image}
										alt={item.product.title}
										className="object-cover w-full h-full"
										onError={(e) => {
											(e.target as HTMLImageElement).src =
												"";
											(
												e.target as HTMLElement
											).style.display = "none";
											const parent = (
												e.target as HTMLElement
											).parentElement;
											if (parent) {
												parent.innerHTML = `<div class="flex items-center justify-center h-full text-white text-xs">ID: ${item.product.id}</div>`;
											}
										}}
									/>

									{/* Unfavourite Button */}
									<button
										onClick={() =>
											handleRemoveFromFavourites(
												item.product.id,
											)
										}
										className="absolute p-2 transition-colors rounded-full top-2 right-2 bg-white/80 hover:bg-white">
										<HeartIconSolid className="w-5 h-5 text-red-500" />
									</button>
								</div>

								{/* Product Details */}
								<div className="space-y-2">
									<h3 className="font-medium text-gray-900 line-clamp-2">
										{item.product.title}
									</h3>
									<p className="text-sm text-gray-500 line-clamp-2">
										{item.product.description}
									</p>
									<div className="flex items-center gap-2">
										<span className="text-lg font-bold text-primary">
											$
											{item.product.price?.toFixed(2) ||
												"0.00"}
										</span>
									</div>

									{/* Add to Cart Button */}
									<button
										onClick={() =>
											addToCartHandler({
												...item.product,
												name: item.product.title,
											})
										}
										className="w-full px-4 py-2 mt-3 text-white transition rounded-lg bg-primary hover:bg-primary-dark">
										<ShoppingCartIcon className="inline-block w-4 h-4 mr-2" />
										Add to Cart
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
