import Image from "next/image";

import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { toggleFavourite } from "@/redux/Slices/favourites/favouritesSlice";
import { Product } from "@/types/product.types";

export default function ProductsCard({ product }: { product: Product }) {
	const dispatch = useAppDispatch();

	// Check if product is in favourites
	const { favouriteItems = [] } = useAppSelector(
		(state) => state.favourites || { favouriteItems: [] },
	);
	const isFavourite = favouriteItems.some(
		(item) => item.product.id === product.id,
	);

	// Handle favourite toggle
	const handleFavouriteClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(
			toggleFavourite({
				product: {
					...product,
				},
			}),
		);
	};

	return (
		<div
			data-product-id={product.id}
			className="relative flex flex-col cursor-pointer transition-shadow w-full max-w-[340px] sm:max-w-[260px] lg:max-w-[250px] h-fit hover:shadow-lg mx-auto lg:mx-0">
			{/* Product Image */}
			<div className="relative flex justify-end overflow-hidden rounded-lg aspect-square bg-gradient-to-br from-gray-100 to-gray-300">
				{/* Favorite Icon Circle*/}
				<div className="flex justify-between w-full h-[20%] items-center px-3 z-20">
					{/* Rating Badge */}
					<span className="relative z-10 flex justify-center gap-1 px-2 py-1 text-xs font-medium bg-white border rounded-full shadow h-fit ">
						{product.rating} / 5
						<StarIcon className="w-4 h-4 fill-yellow-400 stroke-none" />
					</span>

					<button
						onClick={handleFavouriteClick}
						className="relative top-0 p-2 transition-all duration-200 bg-white rounded-full shadow-md w-fit h-fit hover:scale-110 hover:shadow-lg">
						{isFavourite ? (
							<HeartIconSolid className="w-5 h-5 text-red-500" />
						) : (
							<HeartIcon className="w-5 h-5 text-gray-400 transition-colors hover:text-red-500" />
						)}
					</button>
				</div>
				<Image
					src={product.images[0]}
					alt={product.title}
					fill
					className="object-contain w-full h-full"
				/>
			</div>

			{/* Product */}
			<div className="p-3 lg:p-4 bg-white rounded-lg shadow">
				{/* Product Title */}
				<h3 className="mb-1 text-base lg:text-lg font-semibold truncate text-text-primary">
					{product.title}
				</h3>

				{/* Description */}
				<p className="mb-2 text-xs lg:text-sm text-gray-600 line-clamp-2">
					{product.description}
				</p>
				{/* Price and Category Row */}
				<div className="flex items-center justify-between mt-auto">
					<div className="flex justify-center gap-3">
						{/* Category */}
						<span className="px-3 py-1 text-xs font-medium rounded-full text-primary bg-primary/10 w-fit">
							{product.category}
						</span>
					</div>

					<span className="text-base lg:text-lg font-bold text-primary">
						${product.price}
					</span>
				</div>
			</div>
		</div>
	);
}
