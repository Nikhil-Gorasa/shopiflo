import React from "react";
import { MapPinIcon as MapPinIconSolid } from "@heroicons/react/24/solid";

interface GeolocationButtonProps {
	onClick: () => void;
	isGeolocating: boolean;
}

export default function GeolocationButton({
	onClick,
	isGeolocating,
}: GeolocationButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
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
	);
}
