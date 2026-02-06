import React from "react";
import { StarIcon } from "@heroicons/react/24/outline";

interface Review {
	reviewerName: string;
	date: string;
	rating: number;
	comment: string;
}

interface ProductReviewsProps {
	reviews: Review[];
	className?: string;
}

export default function ProductReviews({
	reviews,
	className = "",
}: ProductReviewsProps) {
	return (
		<div className={`w-full ${className}`}>
			<h2 className="mb-2 text-lg sm:text-xl font-semibold text-black">
				Customer Reviews
			</h2>
			<div className="w-full space-y-2 sm:space-y-3">
				{reviews.map((review, idx) => (
					<div
						key={idx}
						className="flex flex-col w-full gap-1 p-2.5 sm:p-3 bg-gray-100 rounded-lg">
						<div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
							<span className="text-sm font-semibold text-text-primary">
								{review.reviewerName}
							</span>
							<span className="text-xs text-gray-400">
								{new Date(review.date).toLocaleDateString(
									"en-GB",
									{
										day: "2-digit",
										month: "2-digit",
										year: "numeric",
									},
								)}
							</span>
							<span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-black bg-white border rounded-full shadow">
								{review.rating}/5
								<StarIcon className="w-4 h-4 fill-yellow-400 stroke-none" />
							</span>
						</div>
						<div className="text-xs text-gray-700">
							{review.comment}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
