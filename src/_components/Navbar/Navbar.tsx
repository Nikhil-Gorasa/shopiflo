"use client";

import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
	return (
		<nav className="w-full bg-white border-b">
			<div className="px-6 mx-auto max-w-7xl">
				<div className="flex items-center justify-between h-16">
					{/* LEFT — Logo */}
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/shopiflo-icon.png"
							alt="Shopiflo"
							width={32}
							height={32}
						/>
						<span className="text-xl font-semibold text-text-primary">
							Shopiflo
						</span>
					</Link>

					{/* CENTER — Search */}
					<div className="flex justify-center flex-1 px-10">
						<div className="relative w-full max-w-xl">
							<input
								type="text"
								placeholder="Search products, brands..."
								className="w-full px-4 py-2 border rounded-full border-ui-border bg-ui-bg focus:outline-none focus:ring-2 focus:ring-primary"
							/>

							<button className="absolute p-2 text-white -translate-y-1/2 rounded-full right-1 top-1/2 bg-primary">
								<MagnifyingGlassIcon className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* RIGHT — Links */}
					<div className="flex items-center gap-6 text-sm font-medium">
						<Link
							href="/categories"
							className="transition text-text-secondary hover:text-primary">
							Categories
						</Link>

						<Link
							href="/deals"
							className="transition text-text-secondary hover:text-primary">
							Cart
						</Link>

						<Link
							href="/deals"
							className="transition text-text-secondary hover:text-primary">
							Settings
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
