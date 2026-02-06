import React from "react";

interface ProductTagsProps {
	category: string;
	tags: string[];
}

export default function ProductTags({ category, tags }: ProductTagsProps) {
	return (
		<div className="flex flex-wrap gap-2 w-full">
			<span className="px-2.5 py-1 text-xs font-medium rounded-full text-primary bg-primary/10">
				{category}
			</span>
			{tags.map((tag) => (
				<span
					key={tag}
					className="px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded-full">
					#{tag}
				</span>
			))}
		</div>
	);
}
