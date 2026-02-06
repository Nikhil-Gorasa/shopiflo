import React from "react";
import Image from "next/image";

interface ProductSpecsProps {
	weight: number;
	dimensions: {
		width: number;
		height: number;
		depth: number;
	};
	warrantyInformation: string;
	shippingInformation: string;
	returnPolicy: string;
	barcode: string;
	qrCode: string;
}

export default function ProductSpecs({
	weight,
	dimensions,
	warrantyInformation,
	shippingInformation,
	returnPolicy,
	barcode,
	qrCode,
}: ProductSpecsProps) {
	return (
		<>
			<div className="grid grid-cols-2 gap-4 mb-2 text-xs text-gray-600">
				<div>
					<span className="font-semibold">Weight:</span> {weight}g
				</div>
				<div>
					<span className="font-semibold">Dimensions:</span>{" "}
					{dimensions.width} x {dimensions.height} x{" "}
					{dimensions.depth} mm
				</div>
				<div>
					<span className="font-semibold">Warranty:</span>{" "}
					{warrantyInformation}
				</div>
				<div>
					<span className="font-semibold">Shipping:</span>{" "}
					{shippingInformation}
				</div>
				<div>
					<span className="font-semibold">Return Policy:</span>{" "}
					{returnPolicy}
				</div>
			</div>
			<div className="flex items-center gap-4 mb-2">
				<span className="text-xs text-gray-500">
					Barcode: {barcode}
				</span>
				<Image src={qrCode} alt="QR Code" width={40} height={40} />
			</div>
		</>
	);
}
