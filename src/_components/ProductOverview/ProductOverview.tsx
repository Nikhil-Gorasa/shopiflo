"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/reduxhooks";
import { CompleteProduct } from "@/types/product.types";
import ProductOverviewSkeleton from "./ProductOverviewSkeleton";
import ProductImage from "./ProductImage";
import ProductTags from "./ProductTags";
import ProductReviews from "./ProductReviews";
import ProductInfo from "./ProductInfo";
import ProductPricing from "./ProductPricing";
import ProductActions from "./ProductActions";
import ProductSpecs from "./ProductSpecs";

export default function ProductOverview({ productId }: { productId: string }) {
	const [product, setProduct] = useState<CompleteProduct | null>(null);

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

	const isFavourite =
		favouriteItems.find((item) => item.product.id === product.id) !==
		undefined;

	return (
		<div className="flex flex-col min-h-screen gap-3 p-3 sm:gap-4 sm:p-4 md:gap-6 md:p-6 bg-gray-200 shadow-md md:flex-row">
			{/* Image and Tags - Mobile First, Desktop Left */}
			<div className="flex flex-col items-center w-full gap-3 p-3 sm:p-4 bg-white rounded-lg md:items-start md:w-1/3 order-1">
				<ProductImage src={product.images[0]} alt={product.title} />
				<ProductTags category={product.category} tags={product.tags} />

				{/* Customer Reviews - Desktop only here, Mobile at bottom */}
				<ProductReviews
					reviews={product.reviews}
					className="mt-2 hidden md:block"
				/>
			</div>

			{/* Product Details | Right Side - Second on Mobile, Right on Desktop */}
			<div className="flex flex-col flex-1 gap-3 p-3 sm:p-4 md:gap-4 md:p-6 bg-white rounded-lg order-2">
				<ProductInfo
					title={product.title}
					brand={product.brand}
					rating={product.rating}
					reviewCount={product.reviews.length}
					availabilityStatus={product.availabilityStatus}
				/>
				<hr />

				<ProductPricing
					price={product.price}
					discountPercentage={product.discountPercentage}
				/>

				<ProductActions
					product={product}
					quantity={quantity}
					isFavourite={isFavourite}
				/>

				<ProductSpecs
					weight={product.weight}
					dimensions={product.dimensions}
					warrantyInformation={product.warrantyInformation}
					shippingInformation={product.shippingInformation}
					returnPolicy={product.returnPolicy}
					barcode={product.meta.barcode}
					qrCode={product.meta.qrCode}
				/>
			</div>

			{/* Customer Reviews - Mobile Only at Bottom */}
			<ProductReviews
				reviews={product.reviews}
				className="p-3 sm:p-4 bg-white rounded-lg md:hidden order-3"
			/>
		</div>
	);
}
