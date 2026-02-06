import { useAppDispatch } from "@/hooks/reduxhooks";
import {
	increaseQuantity,
	decreaseQuantity,
	removeFromCart,
} from "@/redux/Slices/cart/cartSlice";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface CartItemProps {
	product: {
		id: string;
		name?: string;
		title?: string;
		price: number;
		image: string;
		description?: string;
		category?: string;
	};
	quantity: number;
}

export default function CartItems({ item }: { item: CartItemProps }) {
	const dispatch = useAppDispatch();
	return (
		<div
			key={item.product.id}
			className="flex gap-4 p-4 border border-gray-200 rounded-lg">
			{/* Product Image Placeholder */}
			<div className="flex items-center justify-center w-24 h-24 rounded-lg bg-gradient-to-br from-gray-300 to-gray-500">
				<Image
					src={item.product.image}
					alt={`Product ${item.product.id}`}
					width={80}
					height={80}
					className="object-contain"
				/>
			</div>

			{/* Product Details */}
			<div className="flex-1">
				<Link
					href={`/dashboard/products/${item.product.id}`}
					className="font-medium text-gray-900 underline">
					{item.product.name || item.product.title}
				</Link>
				<div className="mt-2">
					<span className="text-lg font-bold text-primary">
						${item.product.price.toFixed(2)}
					</span>
				</div>
			</div>

			{/* Quantity Controls */}

			<div className="flex flex-col items-end gap-3">
				<div className="flex gap-2">
					<button
						onClick={() =>
							dispatch(
								removeFromCart(
									typeof item.product.id === "string"
										? parseInt(item.product.id)
										: item.product.id,
								),
							)
						}
						className="p-3 text-red-500 transition rounded hover:bg-red-50 h-fit">
						<TrashIcon className="w-5 h-5" />
					</button>
					<div className="flex items-center justify-between px-2 py-2 rounded-lg bg-primary">
						<button
							onClick={() =>
								dispatch(
									decreaseQuantity(
										typeof item.product.id === "string"
											? parseInt(item.product.id)
											: item.product.id,
									),
								)
							}
							className="flex items-center justify-center w-6 h-6 text-white rounded-md bg-primary hover:bg-primary-dark">
							-
						</button>
						<span className="flex-1 text-sm font-medium text-center text-white px-7">
							{item.quantity}
						</span>
						<button
							onClick={() =>
								dispatch(
									increaseQuantity(
										typeof item.product.id === "string"
											? parseInt(item.product.id)
											: item.product.id,
									),
								)
							}
							className="flex items-center justify-center w-6 h-6 text-white rounded-md bg-primary hover:bg-primary-dark">
							+
						</button>
					</div>
				</div>

				<div className="text-right">
					<p className="font-semibold text-gray-900">
						${(item.product.price * item.quantity).toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
}
