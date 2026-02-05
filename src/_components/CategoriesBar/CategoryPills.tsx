import Link from "next/link";

export default function CategoryPills({
	categoryKey,
	category,
	setActiveCategory,
	activeCategory,
}: Readonly<{
	categoryKey: string;
	category: { slug: string };
	setActiveCategory: (category: string) => void;
	activeCategory: string;
}>) {
	function HandleClick() {
		setActiveCategory(categoryKey);
	}

	return (
		<Link
			href={`/dashboard/products?category=${category.slug}`}
			onClick={HandleClick}
			className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
				activeCategory === categoryKey
					? "bg-primary text-white shadow-md"
					: "bg-white text-text-secondary hover:bg-gray-200"
			}`}>
			{categoryKey}
		</Link>
	);
}
