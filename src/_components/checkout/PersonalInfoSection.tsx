import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ShippingAddress } from "@/types/checkout.types";

interface PersonalInfoSectionProps {
	currentUser: {
		firstname?: string;
		lastname?: string;
		email?: string;
	} | null;
	register: UseFormRegister<ShippingAddress>;
	errors: FieldErrors<ShippingAddress>;
	countries: { value: string; label: string; code: string }[];
}

export default function PersonalInfoSection({
	currentUser,
	register,
	errors,
	countries,
}: PersonalInfoSectionProps) {
	return (
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
									required: "Country code is required",
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
									required: "Phone number is required",
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
	);
}
