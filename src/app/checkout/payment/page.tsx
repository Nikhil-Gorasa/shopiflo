"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CreditCardIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { savePaymentDetails } from "@/redux/Slices/checkout/checkoutSlice";
import { useAppDispatch } from "@/hooks/reduxhooks";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import toast from "react-hot-toast";
import { PaymentDetails, CheckoutState } from "@/types/checkout.types";

export default function PaymentPage() {
	useProtectedRoute(); // Protect this route

	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<PaymentDetails>();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const CheckoutData = localStorage.getItem("checkouts");
		const currentUser = JSON.parse(
			localStorage.getItem("currentUser") || "null",
		);
		const CheckoutObj = JSON.parse(CheckoutData || "[]").find(
			(checkout: CheckoutState) =>
				currentUser && checkout.email === currentUser.email,
		);

		if (CheckoutObj && CheckoutObj.shippingAddress) {
			toast.success("Restored your previous card Information");
			const payment = CheckoutObj.paymentDetails;
			// Populate form fields with formatting applied
			setValue("cardName", payment?.cardName || "");
			setValue(
				"cardNumber",
				formatCardNumber(payment?.cardNumber?.replace(/\s/g, "") || ""),
			);
			setValue(
				"expiry",
				formatExpiryDate(payment?.expiry?.replace(/\D/g, "") || ""),
			);
			setValue("cvv", payment?.cvv || "");
		}
	}, [setValue]);

	// Format card number with spaces after every 4 digits
	const formatCardNumber = (value: string) => {
		const cleaned = value.replace(/\s/g, "");
		const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
		return formatted;
	};

	// Format expiry date with auto "/" after 2 digits
	const formatExpiryDate = (value: string) => {
		const cleaned = value.replace(/\D/g, "");
		if (cleaned.length === 0) return "";
		if (cleaned.length <= 2) return cleaned;
		return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
	};

	const onSubmit = (data: PaymentDetails) => {
		setIsSubmitting(true);

		dispatch(savePaymentDetails(data));
		router.push("/checkout/confirm");
	};

	return (
		<div className="max-w-2xl mx-auto">
			<div className="p-6 text-black bg-white border rounded-lg shadow-sm border-ui-border md:p-8">
				<div className="flex items-center mb-6">
					<div className="flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-primary/10">
						<CreditCardIcon className="w-5 h-5 text-primary" />
					</div>
					<div>
						<h2 className="text-xl font-semibold text-text-primary">
							Payment Details
						</h2>
						<p className="text-text-secondary">
							Securely pay for your order
						</p>
					</div>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div>
						<label className="block mb-2 text-sm font-medium text-text-primary">
							Name on Card *
						</label>
						<input
							{...register("cardName", {
								required: "Cardholder name is required",
							})}
							type="text"
							className={`w-full px-3 py-2.5 border rounded-lg ${errors.cardName ? "border-status-error" : "border-ui-border"}`}
							placeholder="John Doe"
						/>
						{errors.cardName && (
							<p className="mt-1 text-sm text-status-error">
								{errors.cardName.message}
							</p>
						)}
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium text-text-primary">
							Card Number *
						</label>
						<input
							{...register("cardNumber", {
								required: "Card number is required",
								validate: (value) => {
									const cleaned = value.replace(/\s/g, "");
									if (!/^\d{16}$/.test(cleaned)) {
										return "Card number must be 16 digits";
									}
									return true;
								},
							})}
							type="text"
							maxLength={19}
							onChange={(e) => {
								const cleaned = e.target.value.replace(
									/\D/g,
									"",
								);
								const formatted = formatCardNumber(cleaned);
								setValue("cardNumber", formatted);
							}}
							onInput={(e) => {
								const target = e.target as HTMLInputElement;
								const cleaned = target.value.replace(/\D/g, "");
								target.value = formatCardNumber(cleaned);
							}}
							className={`w-full px-3 py-2.5 border rounded-lg ${errors.cardNumber ? "border-status-error" : "border-ui-border"}`}
							placeholder="1234 5678 9012 3456"
						/>
						{errors.cardNumber && (
							<p className="mt-1 text-sm text-status-error">
								{errors.cardNumber.message}
							</p>
						)}
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block mb-2 text-sm font-medium text-text-primary">
								Expiry Date *
							</label>
							<input
								{...register("expiry", {
									required: "Expiry date is required",
									validate: (value) => {
										if (
											!/^(0[1-9]|1[0-2])\/\d{2}$/.test(
												value,
											)
										) {
											return "Format MM/YY";
										}
										const [month, year] = value.split("/");
										const currentYear =
											new Date().getFullYear() % 100;
										const currentMonth =
											new Date().getMonth() + 1;
										const expYear = parseInt(year);
										const expMonth = parseInt(month);

										if (
											expYear < currentYear ||
											(expYear === currentYear &&
												expMonth < currentMonth)
										) {
											return "Card has expired";
										}
										return true;
									},
								})}
								type="text"
								maxLength={5}
								onChange={(e) => {
									const formatted = formatExpiryDate(
										e.target.value,
									);
									setValue("expiry", formatted);
								}}
								className={`w-full px-3 py-2.5 border rounded-lg ${errors.expiry ? "border-status-error" : "border-ui-border"}`}
								placeholder="MM/YY"
							/>
							{errors.expiry && (
								<p className="mt-1 text-sm text-status-error">
									{errors.expiry.message}
								</p>
							)}
						</div>
						<div>
							<label className="block mb-2 text-sm font-medium text-text-primary">
								CVV *
							</label>
							<input
								{...register("cvv", {
									required: "CVV is required",
									validate: (value) => {
										if (!/^[0-9]{3}$/.test(value)) {
											return "CVV must be 3 digits";
										}
										return true;
									},
								})}
								type="text"
								maxLength={3}
								onInput={(e) => {
									const target = e.target as HTMLInputElement;
									target.value = target.value.replace(
										/\D/g,
										"",
									);
								}}
								className={`w-full px-3 py-2.5 border rounded-lg ${errors.cvv ? "border-status-error" : "border-ui-border"}`}
								placeholder="123"
							/>
							{errors.cvv && (
								<p className="mt-1 text-sm text-status-error">
									{errors.cvv.message}
								</p>
							)}
						</div>
					</div>
					<div className="pt-6 border-t border-ui-border">
						<button
							type="submit"
							disabled={isSubmitting}
							className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-medium text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
							{isSubmitting ? (
								<>
									<div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
									<span>Processing...</span>
								</>
							) : (
								<>
									<span>Pay Securely</span>
									<LockClosedIcon className="w-4 h-4" />
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
