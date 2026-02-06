"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import {
	ShoppingBagIcon,
	TruckIcon,
	CreditCardIcon,
	CheckCircleIcon,
} from "@heroicons/react/24/outline";

const features = [
	{
		icon: TruckIcon,
		title: "Free Shipping",
		description: "Free delivery on orders over $50",
	},
	{
		icon: CreditCardIcon,
		title: "Secure Payment",
		description: "Your payment information is safe with us",
	},
	{
		icon: CheckCircleIcon,
		title: "Easy Returns",
		description: "30-day return policy on all items",
	},
];

export default function CheckoutPage() {
	useProtectedRoute(); // Protect this route

	// TODO: To change this page into a proper intro page for checkout steps
	const router = useRouter();

	useEffect(() => {
		// Auto-redirect to first step after showing this page briefly
		const timer = setTimeout(() => {
			router.push("/checkout/address");
		}, 2000);

		return () => clearTimeout(timer);
	}, [router]);

	return (
		<div className="max-w-4xl mx-auto">
			{/* Welcome Section */}
			<div className="mb-8 text-center">
				<div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
					<ShoppingBagIcon className="w-8 h-8 text-primary" />
				</div>
				<h1 className="mb-2 text-3xl font-bold text-text-primary">
					Secure Checkout
				</h1>
				<p className="text-lg text-text-secondary">
					Complete your purchase in just a few simple steps
				</p>
			</div>

			{/* Features Grid */}
			<div className="grid gap-6 mb-8 md:grid-cols-3">
				{features.map((feature, index) => {
					const IconComponent = feature.icon;
					return (
						<div
							key={index}
							className="p-6 text-center bg-white border rounded-lg shadow-sm border-ui-border">
							<div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-accent-lavenderLight">
								<IconComponent className="w-6 h-6 text-primary" />
							</div>
							<h3 className="mb-2 text-lg font-semibold text-text-primary">
								{feature.title}
							</h3>
							<p className="text-text-secondary">
								{feature.description}
							</p>
						</div>
					);
				})}
			</div>

			{/* Getting Started */}
			<div className="p-8 text-center bg-white border rounded-lg shadow-sm border-ui-border">
				<h2 className="mb-4 text-xl font-semibold text-text-primary">
					Redirecting to shipping address...
				</h2>
				<div className="inline-flex items-center space-x-2">
					<div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
					<div
						className="w-2 h-2 rounded-full bg-primary animate-bounce"
						style={{ animationDelay: "0.1s" }}></div>
					<div
						className="w-2 h-2 rounded-full bg-primary animate-bounce"
						style={{ animationDelay: "0.2s" }}></div>
				</div>
				<p className="mt-4 text-text-secondary">
					Or{" "}
					<button
						onClick={() => router.push("/checkout/address")}
						className="font-medium underline text-primary hover:text-primary-dark">
						click here to continue
					</button>
				</p>
			</div>
		</div>
	);
}
