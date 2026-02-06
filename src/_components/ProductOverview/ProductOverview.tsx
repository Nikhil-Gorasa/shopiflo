"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import Image from "next/image";
import {
	StarIcon,
	ShoppingCartIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/solid";
import {
	addToCart,
	decreaseQuantity,
	increaseQuantity,
} from "@/redux/Slices/cart/cartSlice";
import { toggleFavourite } from "@/redux/Slices/favourites/favouritesSlice";
import { CompleteProduct } from "@/types/product.types";
import ProductOverviewSkeleton from "./ProductOverviewSkeleton";

export default function ProductOverview({ productId }: { productId: string }) {
	const [product, setProduct] = useState<CompleteProduct | null>(null);

	const dispatch = useAppDispatch();
	const cartItems = useAppSelector((state) => state.cart.cartItems);
	const favouriteItems = useAppSelector(
		(state) => state.favourites.favouriteItems,
	);

	async function fetchProductDetails(productId: string) {
		const req = await fetch(`https://dummyjson.com/products/${productId}`);
		const data = await req.json();
		setProduct(data);
		console.log("Fetched product data:", data);
	}

	function isProductAlreadyFavourite(id: number) {
		return (
			favouriteItems.find((item) => item.product.id === id) !== undefined
		);
	}

	useEffect(() => {
		fetchProductDetails(productId);
	}, [productId]);

	if (!product) {
		return <ProductOverviewSkeleton />;
	}

	// Finding if the product is already in cart to show quantity
	const curCartItem = cartItems.find(
		(item) => item.product.id === product.id,
	);
	const quantity = curCartItem ? curCartItem.quantity : 0;

	return (
		<div className="flex flex-col min-h-screen gap-3 p-3 sm:gap-4 sm:p-4 md:gap-6 md:p-6 bg-gray-200 shadow-md md:flex-row">
			{/* Image and Tags - Mobile First, Desktop Left */}
			<div className="flex flex-col items-center w-full gap-3 p-3 sm:p-4 bg-white rounded-lg md:items-start md:w-1/3 order-1">
				<div className="relative w-full mb-2 overflow-hidden h-[250px] sm:h-[280px] md:h-[300px] bg-gradient-to-br from-gray-300 to-gray-700 rounded-2xl">
					<Image
						src={product.images[0]}
						alt={product.title}
						fill
						className="object-contain"
						priority
					/>
				</div>
				{/* Tags and Category */}
				<div className="flex flex-wrap gap-2 w-full">
					<span className="px-2.5 py-1 text-xs font-medium rounded-full text-primary bg-primary/10">
						{product.category}
					</span>
					{product.tags.map((tag) => (
						<span
							key={tag}
							className="px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded-full">
							#{tag}
						</span>
					))}
				</div>

				{/* Customer Reviews - Desktop only here, Mobile at bottom */}
				<div className="w-full mt-2 hidden md:block">
					<h2 className="mb-2 text-lg sm:text-xl font-semibold text-black">
						Customer Reviews
					</h2>
					<div className="w-full space-y-2 sm:space-y-3">
						{product.reviews.map((review, idx) => (
							<div
								key={idx}
								className="flex flex-col w-full gap-1 p-2.5 sm:p-3 bg-gray-100 rounded-lg">
								<div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
									<span className="text-sm font-semibold text-text-primary">
										{review.reviewerName}
									</span>
									<span className="text-xs text-gray-400">
										{new Date(
											review.date,
										).toLocaleDateString("en-GB", {
											day: "2-digit",
											month: "2-digit",
											year: "numeric",
										})}
									</span>
									<span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-black bg-white border rounded-full shadow">
										{review.rating}/5
										<StarIcon className="w-4 h-4 fill-yellow-400 stroke-none" />
									</span>
								</div>
								<div className="text-xs text-gray-700">
									{review.comment}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Product Details | Right Side - Second on Mobile, Right on Desktop */}
			<div className="flex flex-col flex-1 gap-3 p-3 sm:p-4 md:gap-4 md:p-6 bg-white rounded-lg order-2">
				<div className="flex flex-col gap-2">
					<div className="flex flex-wrap items-center gap-2">
						<h1 className="text-xl sm:text-2xl font-bold text-text-primary">
							{product.title}
						</h1>
						<span
							className={`text-xs px-2 py-1 rounded-full font-semibold ${product.availabilityStatus === "In Stock" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
							{product.availabilityStatus}
						</span>
					</div>
					<h3 className="font-light text-md text-text-primary/50">
						By {product.brand}
					</h3>

					{/* Star Rating */}
					<div className="flex items-center gap-2">
						<span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-black rounded-full shadow bg-gradient-to-t from-gray-200 to-gray-100 w-fit">
							{product.rating} / 5
							<StarIcon className="w-4 h-4 fill-yellow-400 stroke-none relative bottom-[1px]" />
						</span>
						<span className="text-sm text-gray-500">
							({product.reviews.length} reviews)
						</span>
					</div>
				</div>
				<hr />

				<div className="flex flex-col items-start gap-2 sm:gap-3 mb-2">
					<div className="flex items-center gap-3 sm:gap-4">
						<span className="text-2xl sm:text-3xl font-bold text-primary">
							${product.price}
						</span>
						<span className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
							-{product.discountPercentage}%
							<FireIcon className="w-4 h-4 text-orange-500" />
						</span>
					</div>
					{/* Original Price, Calculate original price from discounted price */}

					<span className="text-gray-500 line-through font-ld text-md">
						$
						{(
							product.price /
							(1 - product.discountPercentage / 100)
						).toFixed(2)}
					</span>

					{/* ADD TO CART & ADD TO FAVOURITES */}
					<div className="flex items-center gap-4">
						{/* If already in cart, show quantity controls */}
						{quantity > 0 ? (
							<div className="flex items-center justify-between px-2 py-2 rounded-lg bg-primary">
								<button
									onClick={() =>
										dispatch(decreaseQuantity(product.id))
									}
									className="flex items-center justify-center w-6 h-6 text-white rounded-md bg-primary hover:bg-primary-dark">
									-
								</button>
								<span className="flex-1 text-sm font-medium text-center text-white px-7">
									{quantity}
								</span>
								<button
									onClick={() =>
										dispatch(increaseQuantity(product.id))
									}
									className="flex items-center justify-center w-6 h-6 text-white rounded-md bg-primary hover:bg-primary-dark">
									+
								</button>
							</div>
						) : (
							<button
								onClick={() =>
									dispatch(
										addToCart({
											product: {
												id: product.id,
												title: product.title,
												price: product.price,
												description:
													product.description,
												image: product.images[0],
											},
											quantity: 1,
										}),
									)
								}
								className="px-3 py-2 md:px-4 md:py-2 text-sm md:text-base text-white rounded-lg bg-primary hover:bg-primary-dark">
								<ShoppingCartIcon className="inline-block w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
								Add to Cart
							</button>
						)}

						{/* If Already Favourite, Showing Remove from favourites button */}
						<button
							onClick={() =>
								dispatch(
									toggleFavourite({
										product: {
											id: product.id,
											title: product.title,
											price: product.price,
											description: product.description,
											images: product.images,
											rating: product.rating,
											category: product.category,
										},
									}),
								)
							}
							className="px-3 py-2 md:px-4 md:py-2 text-sm md:text-sm text-red-500 border border-red-500 rounded-lg hover:bg-primary/10">
							{isProductAlreadyFavourite(product.id) ? (
								<>
									<HeartIcon className="inline-block w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2 fill-red-500" />
									<span className="hidden sm:inline">
										Remove from Favourites
									</span>
									<span className="sm:hidden">Remove</span>
								</>
							) : (
								<>
									<HeartIcon className="inline-block w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2 text-red-500" />
									<span className="hidden sm:inline">
										Add to Favourites
									</span>
									<span className="sm:hidden">Add</span>
								</>
							)}
						</button>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 mb-2 text-xs text-gray-600">
					<div>
						<span className="font-semibold">Weight:</span>{" "}
						{product.weight}g
					</div>
					<div>
						<span className="font-semibold">Dimensions:</span>{" "}
						{product.dimensions.width} x {product.dimensions.height}{" "}
						x {product.dimensions.depth} mm
					</div>
					<div>
						<span className="font-semibold">Warranty:</span>{" "}
						{product.warrantyInformation}
					</div>
					<div>
						<span className="font-semibold">Shipping:</span>{" "}
						{product.shippingInformation}
					</div>
					<div>
						<span className="font-semibold">Return Policy:</span>{" "}
						{product.returnPolicy}
					</div>
				</div>
				<div className="flex items-center gap-4 mb-2">
					<span className="text-xs text-gray-500">
						Barcode: {product.meta.barcode}
					</span>
					<Image
						src={product.meta.qrCode}
						alt="QR Code"
						width={40}
						height={40}
					/>
				</div>
			</div>

			{/* Customer Reviews - Mobile Only at Bottom */}
			<div className="w-full p-3 sm:p-4 bg-white rounded-lg md:hidden order-3">
				<h2 className="mb-2 text-lg sm:text-xl font-semibold text-black">
					Customer Reviews
				</h2>
				<div className="w-full space-y-2 sm:space-y-3">
					{product.reviews.map((review, idx) => (
						<div
							key={idx}
							className="flex flex-col w-full gap-1 p-2.5 sm:p-3 bg-gray-100 rounded-lg">
							<div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
								<span className="text-sm font-semibold text-text-primary">
									{review.reviewerName}
								</span>
								<span className="text-xs text-gray-400">
									{new Date(review.date).toLocaleDateString(
										"en-GB",
										{
											day: "2-digit",
											month: "2-digit",
											year: "numeric",
										},
									)}
								</span>
								<span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-black bg-white border rounded-full shadow">
									{review.rating}/5
									<StarIcon className="w-4 h-4 fill-yellow-400 stroke-none" />
								</span>
							</div>
							<div className="text-xs text-gray-700">
								{review.comment}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
