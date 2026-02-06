"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";

const steps = [
	{ id: 1, name: "Shipping Address", path: "/checkout/address" },
	{ id: 2, name: "Payment", path: "/checkout/payment" },
	{ id: 3, name: "Confirmation", path: "/checkout/confirm" },
];

function StepIndicator() {
	const pathname = usePathname();

	const getCurrentStep = () => {
		if (pathname.includes("/address")) return 1;
		if (pathname.includes("/payment")) return 2;
		if (pathname.includes("/confirm")) return 3;
		return 1;
	};

	const currentStep = getCurrentStep();

	return (
		<div className="w-full max-w-4xl px-4 py-8 mx-auto">
			<div className="flex items-center justify-between">
				{steps.map((step, index) => (
					<React.Fragment key={step.id}>
						<div className="flex flex-col items-center">
							{/* Step Circle */}
							<div
								className={`
									w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-2 transition-all duration-200
									${
										currentStep > step.id
											? "bg-primary text-white"
											: currentStep === step.id
												? "bg-primary text-white ring-4 ring-primary/20"
												: "bg-ui-border text-text-muted"
									}
								`}>
								{currentStep > step.id ? (
									<CheckIcon className="w-5 h-5" />
								) : (
									step.id
								)}
							</div>

							{/* Step Label */}
							<span
								className={`
									text-sm font-medium transition-colors duration-200
									${currentStep >= step.id ? "text-text-primary" : "text-text-muted"}
								`}>
								{step.name}
							</span>
						</div>

						{/* Connector Line */}
						{index < steps.length - 1 && (
							<div
								className={`
									flex-1 h-0.5 mx-4 transition-colors duration-200
									${currentStep > step.id ? "bg-primary" : "bg-ui-border"}
								`}
							/>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}

export default function CheckoutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-ui-bg">
			{/* Header */}
			<div className="bg-white border-b border-ui-border">
				<div className="px-4 py-4 mx-auto max-w-7xl">
					<Link
						href="/"
						className="inline-flex items-center gap-2 transition-colors text-primary hover:text-primary-dark">
						<Image
							src="/shopiflo-icon.png"
							alt="Shopiflo"
							width={32}
							height={32}
						/>
						<span className="text-xl font-bold">Shopiflo</span>
					</Link>
				</div>
			</div>

			{/* Step Indicator */}
			<StepIndicator />

			{/* Main Content */}
			<div className="max-w-5xl px-4 pb-12 mx-auto">{children}</div>
		</div>
	);
}
