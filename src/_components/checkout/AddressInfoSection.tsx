import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ShippingAddress } from "@/types/checkout.types";

interface AddressInfoSectionProps {
	register: UseFormRegister<ShippingAddress>;
	errors: FieldErrors<ShippingAddress>;
	countries: { value: string; label: string; code: string }[];
}

export default function AddressInfoSection({
	register,
	errors,
	countries,
}: AddressInfoSectionProps) {
	return (
		<>
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
							message: "Please enter a complete address",
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
								message: "Please enter a valid city name",
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
								message: "Please enter a valid state/province",
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
								message: "Please enter a valid postal code",
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
						<option key={country.value} value={country.value}>
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
		</>
	);
}
