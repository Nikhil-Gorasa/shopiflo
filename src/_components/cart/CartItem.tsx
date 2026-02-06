import { useAppDispatch } from "@/hooks/reduxhooks";
import {
	increaseQuantity,
	decreaseQuantity,
	removeFromCart,
} from "@/redux/Slices/cart/cartSlice";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { item as CartItemProps } from "@/types/cart.types";

export default function CartItems({ item }: { item: CartItemProps }) {
	const dispatch = useAppDispatch();
	return (
		<div
			key={item.product.id}
			className="flex gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
			{/* Product Image Placeholder */}
			<div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gradient-to-br from-gray-300 to-gray-500 flex-shrink-0">
				<Image
					src={item.product.image}
					alt={`Product ${item.product.id}`}
					width={80}
					height={80}
					className="object-contain"
				/>
			</div>

			{/* Product Details and Controls Container */}
			<div className="flex flex-col flex-1 gap-2 min-w-0">
				{/* Product Details */}
				<div className="flex-1">
					<Link
						href={`/dashboard/products/${item.product.id}`}
						className="font-medium text-sm sm:text-base text-gray-900 underline line-clamp-2">
						{item.product.title}
					</Link>
					<div className="mt-1">
						<span className="text-base sm:text-lg font-bold text-primary">
							${item.product.price.toFixed(2)}
						</span>
					</div>
				</div>

				{/* Quantity Controls and Total */}
				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-2">
						<button
							onClick={() =>
								dispatch(
									removeFromCart(Number(item.product.id)),
								)
							}
							className="p-1.5 sm:p-2 text-red-500 transition rounded hover:bg-red-50">
							<TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
						</button>
						<div className="flex items-center justify-between px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-lg bg-primary">
							<button
								onClick={() =>
									dispatch(
										decreaseQuantity(
											Number(item.product.id),
										),
									)
								}
								className="flex items-center justify-center w-6 h-6 text-white rounded-md bg-primary hover:bg-primary-dark text-lg">
								-
							</button>
							<span className="flex-1 text-sm font-medium text-center text-white px-3 sm:px-4">
								{item.quantity}
							</span>
							<button
								onClick={() =>
									dispatch(
										increaseQuantity(
											Number(item.product.id),
										),
									)
								}
								className="flex items-center justify-center w-6 h-6 text-white rounded-md bg-primary hover:bg-primary-dark text-lg">
								+
							</button>
						</div>
					</div>

					<div className="text-right">
						<p className="font-semibold text-base sm:text-lg text-gray-900 whitespace-nowrap">
							${(item.product.price * item.quantity).toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
