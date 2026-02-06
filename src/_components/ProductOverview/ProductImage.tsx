import React from "react";
import Image from "next/image";

interface ProductImageProps {
	src: string;
	alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
	return (
		<div className="relative w-full mb-2 overflow-hidden h-[250px] sm:h-[280px] md:h-[300px] bg-gradient-to-br from-gray-300 to-gray-700 rounded-2xl">
			<Image
				src={src}
				alt={alt}
				fill
				className="object-contain"
				priority
			/>
		</div>
	);
}
