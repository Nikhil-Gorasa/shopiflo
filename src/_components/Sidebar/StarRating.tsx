import { StarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function StarRating() {
	const [rating, setRating] = useState(2);
	const router = useRouter();
	const searchParams = useSearchParams();

	function handleRatingChange(newRating: number) {
		setRating(newRating);
		handleParamChange(newRating);
	}

	function resetRating() {
		setRating(2);
		handleParamChange(2);
	}

	function handleParamChange(value: number) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("minRating", value.toString());
		router.push(`/dashboard/products?${params.toString()}`);
	}

	return (
		<div className="p-6 bg-white shadow-sm rounded-3xl h-fit">
			<div className="flex items-center justify-between mb-2 ">
				<h3 className="text-lg font-semibold text-text-primary">
					Star Rating
				</h3>
				<button
					className="text-sm text-text-muted hover:text-text-secondary"
					onClick={() => {
						resetRating();
					}}>
					Reset
				</button>
			</div>
			<div className="flex items-center gap-1 mb-4">
				{Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
					<StarIcon
						key={star}
						className={`w-6 h-6 cursor-pointer transition-colors ${
							star <= rating
								? "fill-[#ffd712] border-none stroke-none"
								: "fill-gray-300 stroke-none"
						}`}
						onClick={() => handleRatingChange(star)}
					/>
				))}
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm text-text-secondary">
					{rating} Stars & up
				</span>
			</div>
		</div>
	);
}
