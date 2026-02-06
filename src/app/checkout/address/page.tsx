"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRightIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { MapPinIcon as MapPinIconSolid } from "@heroicons/react/24/solid";
import { useAppDispatch } from "@/hooks/reduxhooks";
import { saveShippingAddress } from "@/redux/Slices/checkout/checkoutSlice";
import toast from "react-hot-toast";
import { ShippingAddress as AddressFormData } from "@/types/checkout.types";

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
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isGeolocating, setIsGeolocating] = useState(false);
	const [locationError, setLocationError] = useState<string | null>(null);
	const [currentUser, setCurrentUser] = useState<{
		firstname?: string;
		lastname?: string;
		email?: string;
	} | null>(null);
	const dispatch = useAppDispatch();

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
	const router = useRouter();

	// Geocoding function
	const geocodeLocation = async (latitude: number, longitude: number) => {
		try {
			const response = await fetch(
				`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
			);
			const data = await response.json();

			if (data) {
				// Map the geocoded data to form fields
				const countryCode = data.countryCode;
				const matchedCountry = countries.find(
					(c) => c.value === countryCode,
				);
				console.log("Geocoded Data:", data);

				// Update form values
				setValue(
					"address",
					data.locality || data.principalSubdivision || "",
				);
				setValue("city", data.city || data.locality || "");
				setValue(
					"state",
					data.principalSubdivision ||
						data.principalSubdivisionCode ||
						"",
				);
				setValue("postalCode", data.postcode || "");
				setValue("country", countryCode || "IN");

				if (matchedCountry) {
					setValue("countryCode", matchedCountry.code);
				}

				clearErrors([
					"address",
					"city",
					"state",
					"postalCode",
					"country",
				]);

				setLocationError(null);
				return true;
			}
		} catch (error) {
			console.error("Geocoding error:", error);
			setLocationError("Failed to get address details from location");
			return false;
		}
	};

	// Get current location
	const getCurrentLocation = () => {
		setIsGeolocating(true);
		setLocationError(null);

		if (!navigator.geolocation) {
			setLocationError("Geolocation is not supported by this browser");
			setIsGeolocating(false);
			return;
		}

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords;
				await geocodeLocation(latitude, longitude);
				setIsGeolocating(false);
			},
			(error) => {
				let errorMessage = "Failed to get your location";
				switch (error.code) {
					case error.PERMISSION_DENIED:
						errorMessage =
							"Permission denied. Please allow location access.";
						break;
					case error.POSITION_UNAVAILABLE:
						errorMessage = "Location information is unavailable.";
						break;
					case error.TIMEOUT:
						errorMessage =
							"Location request timed out. Please try again.";
						break;
				}
				setLocationError(errorMessage);
				setIsGeolocating(false);
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 300000,
			},
		);
	};

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
					{/* Personal Information */}
					<div>
						<h3 className="mb-4 text-lg font-medium text-text-primary">
							Personal Information
						</h3>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{/* First Name */}
							<div>
								<label
									htmlFor="firstName"
									className="block mb-2 text-sm font-medium text-text-primary">
									First Name *
								</label>
								<input
									type="text"
									id="firstName"
									disabled
									readOnly
									className="w-full px-3 py-2.5 border rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200"
									placeholder="Enter your first name"
									value={currentUser?.firstname || ""}
								/>
							</div>

							{/* Last Name */}
							<div>
								<label
									htmlFor="lastName"
									className="block mb-2 text-sm font-medium text-text-primary">
									Last Name *
								</label>
								<input
									type="text"
									id="lastName"
									disabled
									readOnly
									className="w-full px-3 py-2.5 border rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200"
									placeholder="Enter your last name"
									value={currentUser?.lastname || ""}
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
							{/* Email */}
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-text-primary">
									Email Address *
								</label>
								<input
									type="email"
									id="email"
									disabled
									readOnly
									className="w-full px-3 py-2.5 border rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200"
									placeholder="your@email.com"
									value={currentUser?.email || ""}
								/>
							</div>

							{/* Phone */}
							<div>
								<label className="block mb-2 text-sm font-medium text-text-primary">
									Phone Number *
								</label>
								<div className="flex space-x-2">
									{/* Country Code Selector */}
									<div className="w-32">
										<select
											{...register("countryCode", {
												required:
													"Country code is required",
											})}
											id="countryCode"
											className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
												errors.countryCode
													? "border-status-error"
													: "border-ui-border"
											}`}>
											{countries.map((country) => (
												<option
													key={country.value}
													value={country.code}>
													{country.code}
												</option>
											))}
										</select>
									</div>

									{/* Phone Number Input */}
									<div className="flex-1">
										<input
											{...register("phone", {
												required:
													"Phone number is required",
												pattern: {
													value: /^[0-9]{7,15}$/,
													message:
														"Please enter a valid phone number (7-15 digits)",
												},
											})}
											type="tel"
											id="phone"
											className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
												errors.phone
													? "border-status-error"
													: "border-ui-border"
											}`}
											placeholder="1234567890"
										/>
									</div>
								</div>
								{(errors.countryCode || errors.phone) && (
									<p className="mt-1 text-sm text-status-error">
										{errors.countryCode?.message ||
											errors.phone?.message}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Address Information */}
					<div>
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-medium text-text-primary">
								Address Information
							</h3>
							<button
								type="button"
								onClick={getCurrentLocation}
								disabled={isGeolocating}
								className="inline-flex items-center px-3 py-2 text-sm font-medium transition-colors border rounded-lg text-primary bg-primary/10 border-primary/20 hover:bg-primary/20 focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
								{isGeolocating ? (
									<>
										<div className="w-4 h-4 mr-2 border-2 rounded-full border-primary border-t-transparent animate-spin"></div>
										Detecting...
									</>
								) : (
									<>
										<MapPinIconSolid className="w-4 h-4 mr-2" />
										Use Current Location
									</>
								)}
							</button>
						</div>

						{/* Location Error Message */}
						{locationError && (
							<div className="p-3 mb-4 text-sm border border-red-200 rounded-lg text-status-error bg-red-50">
								{locationError}
							</div>
						)}

						{/* Street Address */}
						<div className="mb-4">
							<label
								htmlFor="address"
								className="block mb-2 text-sm font-medium text-text-primary">
								Street Address *
							</label>
							<input
								{...register("address", {
									required: "Street address is required",
									minLength: {
										value: 5,
										message:
											"Please enter a complete address",
									},
								})}
								type="text"
								id="address"
								className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
									errors.address
										? "border-status-error"
										: "border-ui-border"
								}`}
								placeholder="123 Main Street"
							/>
							{errors.address && (
								<p className="mt-1 text-sm text-status-error">
									{errors.address.message}
								</p>
							)}
						</div>

						{/* Apartment/Suite */}
						<div className="mb-4">
							<label
								htmlFor="apartment"
								className="block mb-2 text-sm font-medium text-text-primary">
								Apartment, Suite, etc. (Optional)
							</label>
							<input
								{...register("apartment")}
								type="text"
								id="apartment"
								className="w-full px-3 py-2.5 border border-ui-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
								placeholder="Apt 4B, Suite 100, etc."
							/>
						</div>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							{/* City */}
							<div>
								<label
									htmlFor="city"
									className="block mb-2 text-sm font-medium text-text-primary">
									City *
								</label>
								<input
									{...register("city", {
										required: "City is required",
										minLength: {
											value: 2,
											message:
												"Please enter a valid city name",
										},
									})}
									type="text"
									id="city"
									className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
										errors.city
											? "border-status-error"
											: "border-ui-border"
									}`}
									placeholder="New York"
								/>
								{errors.city && (
									<p className="mt-1 text-sm text-status-error">
										{errors.city.message}
									</p>
								)}
							</div>

							{/* State */}
							<div>
								<label
									htmlFor="state"
									className="block mb-2 text-sm font-medium text-text-primary">
									State/Province *
								</label>
								<input
									{...register("state", {
										required: "State/Province is required",
										minLength: {
											value: 2,
											message:
												"Please enter a valid state/province",
										},
									})}
									type="text"
									id="state"
									className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
										errors.state
											? "border-status-error"
											: "border-ui-border"
									}`}
									placeholder="NY"
								/>
								{errors.state && (
									<p className="mt-1 text-sm text-status-error">
										{errors.state.message}
									</p>
								)}
							</div>

							{/* Postal Code */}
							<div>
								<label
									htmlFor="postalCode"
									className="block mb-2 text-sm font-medium text-text-primary">
									Postal Code *
								</label>
								<input
									{...register("postalCode", {
										required: "Postal code is required",
										pattern: {
											value: /^[A-Z0-9\s-]{3,10}$/i,
											message:
												"Please enter a valid postal code",
										},
									})}
									type="text"
									id="postalCode"
									className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
										errors.postalCode
											? "border-status-error"
											: "border-ui-border"
									}`}
									placeholder="10001"
								/>
								{errors.postalCode && (
									<p className="mt-1 text-sm text-status-error">
										{errors.postalCode.message}
									</p>
								)}
							</div>
						</div>

						{/* Country */}
						<div className="mt-4">
							<label
								htmlFor="country"
								className="block mb-2 text-sm font-medium text-text-primary">
								Country *
							</label>
							<select
								{...register("country", {
									required: "Please select a country",
								})}
								id="country"
								className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
									errors.country
										? "border-status-error"
										: "border-ui-border"
								}`}>
								{countries.map((country) => (
									<option
										key={country.value}
										value={country.value}>
										{country.label}
									</option>
								))}
							</select>
							{errors.country && (
								<p className="mt-1 text-sm text-status-error">
									{errors.country.message}
								</p>
							)}
						</div>
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
