export default function ProductOverviewSkeleton() {
	return (
		<div className="flex flex-col min-h-screen gap-6 p-6 bg-gray-200 shadow-md md:flex-row animate-pulse">
			{/* Left Side */}
			<div className="flex flex-col items-center w-full gap-4 p-4 bg-white rounded-lg md:items-start md:w-1/3">
				{/* Product Image Skeleton */}
				<div className="relative w-full h-[300px] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-2xl animate-shimmer mb-4"></div>

				{/* Tags and Category Skeleton */}
				<div className="flex gap-2 w-full">
					<div className="h-6 bg-gray-200 rounded-full w-20"></div>
					<div className="h-6 bg-gray-200 rounded-full w-16"></div>
					<div className="h-6 bg-gray-200 rounded-full w-24"></div>
				</div>

				{/* Customer Reviews Skeleton */}
				<div className="w-full mt-4">
					<div className="h-7 bg-gray-200 rounded w-40 mb-3"></div>
					<div className="space-y-3">
						{[1, 2, 3].map((idx) => (
							<div
								key={idx}
								className="flex flex-col w-full gap-2 p-3 bg-gray-100 rounded-lg">
								<div className="flex items-center gap-2">
									<div className="h-4 bg-gray-200 rounded w-24"></div>
									<div className="h-3 bg-gray-200 rounded w-20"></div>
									<div className="h-6 bg-gray-200 rounded-full w-16"></div>
								</div>
								<div className="space-y-1">
									<div className="h-3 bg-gray-200 rounded w-full"></div>
									<div className="h-3 bg-gray-200 rounded w-4/5"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Right Side - Product Details */}
			<div className="flex flex-col flex-1 gap-4 p-6 bg-white rounded-lg">
				{/* Title Section */}
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<div className="h-8 bg-gray-200 rounded w-64"></div>
						<div className="h-6 bg-gray-200 rounded-full w-20"></div>
					</div>
					<div className="h-5 bg-gray-200 rounded w-32"></div>

					{/* Star Rating */}
					<div className="flex items-center gap-2 mt-2">
						<div className="h-6 bg-gray-200 rounded-full w-16"></div>
						<div className="h-4 bg-gray-200 rounded w-24"></div>
					</div>
				</div>

				<hr className="border-gray-200" />

				{/* Price Section */}
				<div className="flex flex-col items-start gap-3 mb-2">
					<div className="flex items-center gap-4">
						<div className="h-10 bg-gray-200 rounded w-24"></div>
						<div className="h-6 bg-gray-200 rounded-full w-16"></div>
					</div>
					<div className="h-4 bg-gray-200 rounded w-32"></div>
				</div>

				{/* Description Skeleton */}
				<div className="space-y-2">
					<div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
					<div className="h-4 bg-gray-200 rounded w-full"></div>
					<div className="h-4 bg-gray-200 rounded w-full"></div>
					<div className="h-4 bg-gray-200 rounded w-3/4"></div>
				</div>

				{/* Stock and SKU */}
				<div className="flex gap-6">
					<div className="space-y-1">
						<div className="h-4 bg-gray-200 rounded w-20"></div>
						<div className="h-5 bg-gray-200 rounded w-16"></div>
					</div>
					<div className="space-y-1">
						<div className="h-4 bg-gray-200 rounded w-16"></div>
						<div className="h-5 bg-gray-200 rounded w-24"></div>
					</div>
				</div>

				{/* Shipping Information */}
				<div className="p-4 space-y-2 bg-blue-50 rounded-lg">
					<div className="h-5 bg-gray-200 rounded w-40"></div>
					<div className="h-4 bg-gray-200 rounded w-full"></div>
					<div className="h-4 bg-gray-200 rounded w-2/3"></div>
				</div>

				{/* Warranty and Return */}
				<div className="flex gap-4">
					<div className="flex-1 p-3 space-y-1 bg-green-50 rounded-lg">
						<div className="h-4 bg-gray-200 rounded w-20"></div>
						<div className="h-5 bg-gray-200 rounded w-24"></div>
					</div>
					<div className="flex-1 p-3 space-y-1 bg-purple-50 rounded-lg">
						<div className="h-4 bg-gray-200 rounded w-24"></div>
						<div className="h-5 bg-gray-200 rounded w-20"></div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col gap-3 mt-4 sm:flex-row">
					<div className="h-12 bg-gray-200 rounded-lg flex-1"></div>
					<div className="h-12 bg-gray-200 rounded-lg w-12 sm:w-auto sm:px-4"></div>
				</div>

				{/* Meta Information */}
				<div className="p-4 space-y-2 bg-gray-50 rounded-lg">
					<div className="h-4 bg-gray-200 rounded w-32"></div>
					<div className="h-4 bg-gray-200 rounded w-40"></div>
					<div className="h-4 bg-gray-200 rounded w-36"></div>
				</div>
			</div>
		</div>
	);
}
