"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	ShoppingCartIcon,
	HeartIcon,
	Squares2X2Icon,
	Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import {
	ShoppingCartIcon as ShoppingCartIconSolid,
	HeartIcon as HeartIconSolid,
	Squares2X2Icon as Squares2X2IconSolid,
	Cog6ToothIcon as Cog6ToothIconSolid,
} from "@heroicons/react/24/solid";

export default function MobileBottomNav() {
	const pathname = usePathname();

	const navItems = [
		{
			href: "/dashboard/products",
			icon: Squares2X2Icon,
			iconSolid: Squares2X2IconSolid,
			label: "Products",
		},
		{
			href: "/dashboard/cart",
			icon: ShoppingCartIcon,
			iconSolid: ShoppingCartIconSolid,
			label: "Cart",
		},
		{
			href: "/dashboard/favourites",
			icon: HeartIcon,
			iconSolid: HeartIconSolid,
			label: "Favourites",
		},
		{
			href: "/dashboard/profile",
			icon: Cog6ToothIcon,
			iconSolid: Cog6ToothIconSolid,
			label: "Profile",
		},
	];

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">
			<div className="flex items-center justify-around h-16 px-2">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					const Icon = isActive ? item.iconSolid : item.icon;

					return (
						<Link
							key={item.href}
							href={item.href}
							className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
								isActive
									? "text-primary"
									: "text-gray-500 hover:text-primary"
							}`}>
							<Icon className="w-6 h-6" />
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
