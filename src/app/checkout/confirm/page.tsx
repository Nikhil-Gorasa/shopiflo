"use client";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/Slices/cart/cartSlice";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

import {
	ShippingAddress,
	PaymentDetails,
	CheckoutState,
} from "@/types/checkout.types";
export default function ConfirmPage() {
	useProtectedRoute(); // Protect this route

	const [address, setAddress] = useState<ShippingAddress | null>(null);
	const [payment, setPayment] = useState<PaymentDetails | null>(null);
	const router = useRouter();
	const dispatch = useDispatch();
	useEffect(() => {
		const CheckoutData = localStorage.getItem("checkouts");
		const currentUser = JSON.parse(
			localStorage.getItem("currentUser") || "null",
		);
		// Searching for the current logged in user's checkout data
		const CheckoutObj = JSON.parse(CheckoutData || "[]").find(
			(checkout: CheckoutState) => {
				return currentUser && checkout.email === currentUser.email;
			},
		);
		console.log(CheckoutObj);

		if (CheckoutObj) {
			setAddress(CheckoutObj.shippingAddress);
			setPayment(CheckoutObj.paymentDetails);
		}

		// Clearing Cart
		dispatch(clearCart());
	}, [dispatch]);

	return (
		<div className="max-w-2xl mx-auto">
			<div className="p-6 text-black bg-white border rounded-lg shadow-sm border-ui-border md:p-8">
				<div className="flex items-center mb-6">
					<CheckCircleIcon className="w-10 h-10 mr-3 text-green-500" />
					<div>
						<h2 className="text-xl font-semibold text-text-primary">
							Order Confirmed!
						</h2>
						<p className="text-text-secondary">
							Thank you for your purchase.
						</p>
					</div>
				</div>
				<div className="mb-6">
					<h3 className="mb-2 text-lg font-medium text-text-primary">
						Shipping Address
					</h3>
					{address ? (
						<div className="text-text-secondary">
							<div>
								{address.firstName} {address.lastName}
							</div>
							<div>
								{address.address}
								{address.apartment && `, ${address.apartment}`}
							</div>
							<div>
								{address.city}, {address.state}{" "}
								{address.postalCode}
							</div>
							<div>{address.country}</div>
							<div>
								{address.countryCode} {address.phone}
							</div>
						</div>
					) : (
						<p className="text-status-error">No address found.</p>
					)}
				</div>
				<div className="mb-6">
					<h3 className="mb-2 text-lg font-medium text-text-primary">
						Payment Info
					</h3>
					{payment ? (
						<div className="text-text-secondary">
							<div>Cardholder: {payment.cardName}</div>
							<div>
								Card: **** **** ****{" "}
								{payment.cardNumber?.slice(-4)}
							</div>
							<div>Expiry: {payment.expiry}</div>
						</div>
					) : (
						<p className="text-status-error">
							No payment info found.
						</p>
					)}
				</div>
				<div className="pt-6 border-t border-ui-border">
					<button
						onClick={() =>
							router.push("/dashboard/products?category=all")
						}
						className="w-full px-6 py-3 font-medium text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark">
						Continue Shopping
					</button>
				</div>
			</div>
		</div>
	);
}
