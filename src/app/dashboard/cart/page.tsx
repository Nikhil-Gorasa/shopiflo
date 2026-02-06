"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { clearCart } from "@/redux/Slices/cart/cartSlice";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

import Link from "next/link";

import {
	TrashIcon,
	ShoppingBagIcon,
	CreditCardIcon,
} from "@heroicons/react/24/outline";
import CartItem from "@/_components/cart/CartItem";
import { useEffect, useState } from "react";

export default function CartPage() {
	useProtectedRoute(); // Protect this route

	const dispatch = useAppDispatch();
	const [currentUser, setCurrentUser] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const { cartItems, totalPrice, email } = useAppSelector(
		(state) => state.cart,
	);

	useEffect(() => {
		// Check localStorage only on client side
		const savedUser =
			typeof window !== "undefined"
				? localStorage.getItem("currentUser")
				: null;
		setCurrentUser(savedUser);
		setIsLoading(false);
	}, []);

	const taxRate = 0.08;
	const tax = totalPrice * taxRate;
	const final = totalPrice + tax;

	// Show loading state while checking authentication
	if (isLoading) {
		return (
			<div className="min-h-screen px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-12 text-black bg-gray-100">
				<div className="flex flex-col items-center justify-center h-64 sm:h-80 lg:h-96">
					<div className="w-6 h-6 sm:w-8 sm:h-8 border-2 rounded-full border-primary border-t-transparent animate-spin"></div>
					<p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
						Loading...
					</p>
				</div>
			</div>
		);
	}

	if (!currentUser) {
		return (
			<div className="min-h-screen px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-12 text-black bg-gray-100">
				<div className="flex flex-col items-center justify-center h-64 sm:h-80 lg:h-96">
					<ShoppingBagIcon className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 text-gray-400" />
					<h2 className="mb-2 text-lg sm:text-xl lg:text-2xl font-bold text-gray-600">
						Please Login to View Cart
					</h2>
					<p className="text-sm sm:text-base text-gray-500">
						You need to be logged in to access your cart.
					</p>
				</div>
			</div>
		);
	}

	if (cartItems.length === 0) {
		return (
			<div className="min-h-screen px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-12 text-black bg-gray-100">
				<div className="max-w-6xl mx-auto">
					<h1 className="mb-4 sm:mb-6 lg:mb-8 text-xl sm:text-2xl lg:text-3xl font-bold">
						Shopping Cart
					</h1>
					<div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 bg-white rounded-lg shadow-sm h-64 sm:h-80 lg:h-96">
						<ShoppingBagIcon className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 text-gray-400" />
						<h2 className="mb-2 text-lg sm:text-xl lg:text-2xl font-bold text-gray-600">
							Your cart is empty
						</h2>
						<p className="text-sm sm:text-base text-gray-500">
							Add some products to get started!
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-12 text-black bg-gray-100">
			<div className="max-w-6xl mx-auto">
				{/* Head of Cart */}
				<div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
					<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
						Shopping Cart
					</h1>
					<button
						onClick={() => dispatch(clearCart())}
						className="px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base text-red-600 transition border border-red-200 rounded-lg hover:bg-red-50">
						<TrashIcon className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
						<span className="hidden sm:inline">Clear Cart</span>
						<span className="sm:hidden">Clear</span>
					</button>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-3">
					{/* Cart Items */}
					<div className="lg:col-span-2">
						<div className="p-3 sm:p-4 lg:p-6 bg-white rounded-lg shadow-sm">
							<h2 className="mb-3 sm:mb-4 lg:mb-6 text-base sm:text-lg lg:text-xl font-semibold">
								Items ({cartItems.length})
							</h2>
							{/* Cart Items List */}
							<div className="space-y-3 sm:space-y-4 lg:space-y-6">
								{cartItems
									.filter((item) => item && item.product)
									.map((item) => (
										<CartItem
											key={item.product.id}
											item={{
												...item,
												product: {
													...item.product,
													id: item.product.id,
												},
											}}
										/>
									))}
							</div>
						</div>
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div className="p-3 sm:p-4 lg:p-6 bg-white rounded-lg shadow-sm">
							<h2 className="mb-3 sm:mb-4 lg:mb-6 text-base sm:text-lg lg:text-xl font-semibold">
								Order Summary
							</h2>

							<div className="space-y-3 sm:space-y-4">
								<div className="flex justify-between">
									<span className="text-gray-600">
										Subtotal
									</span>
									<span className="font-medium">
										${totalPrice.toFixed(2)}
									</span>
								</div>

								<div className="flex justify-between">
									<span className="text-gray-600">
										Tax (8%)
									</span>
									<span className="font-medium">
										${tax.toFixed(2)}
									</span>
								</div>

								<div className="flex justify-between">
									<span className="text-gray-600">
										Shipping
									</span>
									<span className="font-medium text-green-600">
										Free
									</span>
								</div>

								<hr className="my-4" />

								<div className="flex justify-between text-lg font-bold">
									<span>Total</span>
									<span className="text-primary">
										${final.toFixed(2)}
									</span>
								</div>

								<button className="flex w-full">
									<Link
										href="/checkout"
										className="w-full px-6 py-3 mt-2 text-white transition rounded-lg bg-primary hover:bg-primary-dark">
										<CreditCardIcon className="inline-block w-5 h-5 mr-2" />
										Proceed to Checkout
									</Link>
								</button>

								<div className="mt-4 text-xs text-center text-gray-500">
									<p className="mt-1">
										Logged in as: {email}
									</p>
								</div>
							</div>
						</div>

						{/* Promo Code
						<div className="p-6 mt-6 bg-white rounded-lg shadow-sm">
							<h3 className="mb-4 font-medium">Promo Code</h3>
							<div className="flex gap-2">
								<input
									type="text"
									placeholder="Enter code"
									className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
								/>
								<button className="px-4 py-2 text-white transition rounded-lg bg-primary hover:bg-primary-dark">
									Apply
								</button>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
