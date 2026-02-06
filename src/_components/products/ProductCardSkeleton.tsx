export default function ProductCardSkeleton() {
	return (
		<div className="relative flex flex-col w-full max-w-[340px] sm:max-w-[260px] lg:max-w-[250px] h-fit mx-auto lg:mx-0 animate-pulse">
			{/* Product Image Skeleton */}
			<div className="relative overflow-hidden rounded-lg aspect-square bg-gradient-to-br from-gray-200 to-gray-300">
				{/* Rating Badge Skeleton */}
				<div className="absolute top-3 left-3 z-10">
					<div className="w-16 h-6 bg-white/80 rounded-full"></div>
				</div>
				{/* Heart Icon Skeleton */}
				<div className="absolute top-3 right-3 z-10">
					<div className="w-9 h-9 bg-white rounded-full"></div>
				</div>
				{/* Image placeholder with shimmer */}
				<div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
			</div>

			{/* Product Content Skeleton */}
			<div className="p-3 lg:p-4 bg-white rounded-lg shadow mt-0">
				{/* Title Skeleton */}
				<div className="h-5 lg:h-6 bg-gray-200 rounded mb-2 w-3/4"></div>

				{/* Description Skeleton - 2 lines */}
				<div className="space-y-2 mb-3">
					<div className="h-3 lg:h-4 bg-gray-200 rounded w-full"></div>
					<div className="h-3 lg:h-4 bg-gray-200 rounded w-5/6"></div>
				</div>

				{/* Category and Price Row Skeleton */}
				<div className="flex items-center justify-between mt-auto">
					{/* Category Badge Skeleton */}
					<div className="h-6 bg-gray-200 rounded-full w-20"></div>
					{/* Price Skeleton */}
					<div className="h-6 bg-gray-200 rounded w-16"></div>
				</div>
			</div>
		</div>
	);
}
