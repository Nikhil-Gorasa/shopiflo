import Image from "next/image";

import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";

interface Product {
	id: number;
	title: string;
	description: string;
	images: string[];
	rating: number;
	price: number;
	category: string;
}

export default function ProductsCard({ product }: { product: Product }) {
	return (
		<div
			data-product-id={product.id}
			className="relative flex flex-col cursor-pointer transition-shadow w-[250px] h-fit hover:shadow-lg">
			{/* Product Image */}
			<div className="relative flex justify-end overflow-hidden rounded-lg aspect-square bg-gradient-to-br from-gray-100 to-gray-300">
				{/* Favorite Icon Circle*/}
				<div className="flex justify-between w-full h-[20%] items-center px-3">
					{/* Rating Badge */}
					<span className="relative z-10 flex justify-center gap-1 px-2 py-1 text-xs font-medium bg-white border rounded-full shadow h-fit ">
						{product.rating} / 5
						<StarIcon className="w-4 h-4 fill-yellow-400 stroke-none" />
					</span>

					<div className="relative top-0 z-10 p-2 bg-white rounded-full shadow-md w-fit h-fit">
						<div className="">
							<HeartIcon className="w-5 h-5 transition-colors text-primary hover:text-primary" />
						</div>
					</div>
				</div>
				<Image
					src={product.images[0]}
					alt={product.title}
					fill
					className="object-contain w-full h-full"
				/>
			</div>

			{/* Product */}
			<div className="p-4 bg-white rounded-lg shadow">
				{/* Product Title */}
				<h3 className="mb-1 text-lg font-semibold truncate text-text-primary">
					{product.title}
				</h3>

				{/* Description */}
				<p className="mb-2 text-sm text-gray-600 line-clamp-2">
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

					<span className="text-lg font-bold text-primary">
						${product.price}
					</span>
				</div>
			</div>
		</div>
	);
}
