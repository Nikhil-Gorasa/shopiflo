import React from "react";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/hooks/reduxhooks";
import {
	addToCart,
	decreaseQuantity,
	increaseQuantity,
} from "@/redux/Slices/cart/cartSlice";
import { toggleFavourite } from "@/redux/Slices/favourites/favouritesSlice";

interface ProductActionsProps {
	product: {
		id: number;
		title: string;
		price: number;
		description: string;
		images: string[];
		rating: number;
		category: string;
	};
	quantity: number;
	isFavourite: boolean;
}

export default function ProductActions({
	product,
	quantity,
	isFavourite,
}: ProductActionsProps) {
	const dispatch = useAppDispatch();

	return (
		<div className="flex items-center gap-4">
			{quantity > 0 ? (
				<div className="flex items-center justify-between px-2 py-2 rounded-lg bg-primary">
					<button
						onClick={() => dispatch(decreaseQuantity(product.id))}
						className="flex items-center justify-center w-6 h-6 text-white rounded-md bg-primary hover:bg-primary-dark">
						-
					</button>
					<span className="flex-1 text-sm font-medium text-center text-white px-7">
						{quantity}
					</span>
					<button
						onClick={() => dispatch(increaseQuantity(product.id))}
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
									description: product.description,
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
				{isFavourite ? (
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
	);
}
