"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRightIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/hooks/reduxhooks";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useGeolocation } from "@/hooks/useGeolocation";
import { saveShippingAddress } from "@/redux/Slices/checkout/checkoutSlice";
import toast from "react-hot-toast";
import { ShippingAddress as AddressFormData } from "@/types/checkout.types";
import PersonalInfoSection from "@/_components/checkout/PersonalInfoSection";
import AddressInfoSection from "@/_components/checkout/AddressInfoSection";
import GeolocationButton from "@/_components/checkout/GeolocationButton";

// Some Countries that we ship to
const countries = [
	{ value: "US", label: "United States", code: "+1" },
	{ value: "CA", label: "Canada", code: "+1" },
	{ value: "GB", label: "United Kingdom", code: "+44" },
	{ value: "AU", label: "Australia", code: "+61" },
	{ value: "DE", label: "Germany", code: "+49" },
	{ value: "FR", label: "France", code: "+33" },
	{ value: "JP", label: "Japan", code: "+81" },
	{ value: "IN", label: "India", code: "+91" },
];

export default function AddressPage() {
	useProtectedRoute();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [currentUser, setCurrentUser] = useState<{
		firstname?: string;
		lastname?: string;
		email?: string;
	} | null>(null);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		clearErrors,
	} = useForm<AddressFormData>({
		defaultValues: {
			country: "IN",
			countryCode: "+91",
		},
	});

	const { isGeolocating, locationError, getCurrentLocation } = useGeolocation(
		setValue,
		clearErrors,
		countries,
	);

	// Form Submission Handle through Redux CheckoutSlice
	const onSubmit = async (data: AddressFormData) => {
		setIsSubmitting(true);

		// Combine form data with user data
		const completeData = {
			...data,
			firstName: currentUser?.firstname || "",
			lastName: currentUser?.lastname || "",
			email: currentUser?.email || "",
		};

		// Store complete form data in localStorage
		dispatch(saveShippingAddress(completeData));
		// Navigate to payment page
		router.push("/checkout/payment");
		setIsSubmitting(false);
	};

	useEffect(() => {
		const currentUserData = JSON.parse(
			localStorage.getItem("currentUser") || "null",
		);

		// Always set current user info first
		if (currentUserData) {
			setCurrentUser({
				firstname: currentUserData.firstname || "",
				lastname: currentUserData.lastname || "",
				email: currentUserData.email || "",
			});
		}

		// Then check for saved checkout data
		const CheckoutData = localStorage.getItem("checkouts");
		const CheckoutObj = JSON.parse(CheckoutData || "[]").find(
			(checkout: { email: string; shippingAddress?: AddressFormData }) =>
				currentUserData && checkout.email === currentUserData.email,
		);

		if (CheckoutObj && CheckoutObj.shippingAddress) {
			toast.success("Restored your previous shipping address");
			const address = CheckoutObj.shippingAddress;
			// Populate form fields
			setValue("address", address.address || "");
			setValue("apartment", address.apartment || "");
			setValue("city", address.city || "");
			setValue("state", address.state || "");
			setValue("postalCode", address.postalCode || "");
			setValue("country", address.country || "IN");
			setValue("countryCode", address.countryCode || "+91");
			setValue("phone", address.phone || "");
		}
	}, [setValue]);

	return (
		<div className="max-w-2xl mx-auto">
			<div className="p-6 text-black bg-white border rounded-lg shadow-sm border-ui-border md:p-8">
				{/* Header */}
				<div className="flex items-center mb-6">
					<div className="flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-primary/10">
						<MapPinIcon className="w-5 h-5 text-primary" />
					</div>
					<div>
						<h2 className="text-xl font-semibold text-text-primary">
							Shipping Address
						</h2>
						<p className="text-text-secondary">
							Where should we deliver your order?
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<PersonalInfoSection
						currentUser={currentUser}
						register={register}
						errors={errors}
						countries={countries}
					/>

					{/* Address Information */}
					<div>
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-medium text-text-primary">
								Address Information
							</h3>
							<GeolocationButton
								onClick={getCurrentLocation}
								isGeolocating={isGeolocating}
							/>
						</div>

						{locationError && (
							<div className="p-3 mb-4 text-sm border border-red-200 rounded-lg text-status-error bg-red-50">
								{locationError}
							</div>
						)}

						<AddressInfoSection
							register={register}
							errors={errors}
							countries={countries}
						/>
					</div>

					{/* Submit Button */}
					<div className="pt-6 border-t border-ui-border">
						<button
							type="submit"
							disabled={isSubmitting}
							className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-medium text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
							{isSubmitting ? (
								<>
									<div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
									<span>Saving Address...</span>
								</>
							) : (
								<>
									<span>Continue to Payment</span>
									<ChevronRightIcon className="w-4 h-4" />
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
