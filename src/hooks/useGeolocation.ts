import { useState } from "react";
import { UseFormSetValue, UseFormClearErrors } from "react-hook-form";
import { ShippingAddress } from "@/types/checkout.types";

interface Country {
	value: string;
	label: string;
	code: string;
}

export function useGeolocation(
	setValue: UseFormSetValue<ShippingAddress>,
	clearErrors: UseFormClearErrors<ShippingAddress>,
	countries: Country[],
) {
	const [isGeolocating, setIsGeolocating] = useState(false);
	const [locationError, setLocationError] = useState<string | null>(null);

	const geocodeLocation = async (latitude: number, longitude: number) => {
		try {
			const response = await fetch(
				`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
			);
			const data = await response.json();

			if (data) {
				const countryCode = data.countryCode;
				const matchedCountry = countries.find(
					(c) => c.value === countryCode,
				);
				console.log("Geocoded Data:", data);

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

	return {
		isGeolocating,
		locationError,
		getCurrentLocation,
	};
}
