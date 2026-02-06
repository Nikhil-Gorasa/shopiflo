"use client";

import Link from "next/link";
import {
	ArrowLeftOnRectangleIcon,
	ArrowRightIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Home() {
	// const [products, setProducts] = useState<any[]>([]);
	// const [isLoading, setIsLoading] = useState(true);

	// useEffect(() => {
	// 	fetch("https://dummyjson.com/products?limit=15")
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setProducts(data.products || []);
	// 			setIsLoading(false);
	// 		});
	// }, []);

	return (
		<main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary via-primary-light to-accent-indigoSoft">
			{/* Animated Background Orbs */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse"></div>
				<div
					className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "2s" }}></div>
			</div>

			{/* Hero Section - Centered Card */}
			<div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
				<div className="w-full max-w-2xl p-10 mx-auto mb-16 text-center bg-white shadow-2xl backdrop-blur-sm rounded-3xl">
					{/* Logo Icon using Heroicons */}
					<div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full shadow-lg bg-primary/10">
						<Image
							src="/shopiflo-icon.png"
							alt="Shopiflo Logo"
							width={80}
							height={80}
						/>
					</div>

					{/* Main Heading */}
					<h1 className="mb-3 text-5xl font-black tracking-tight text-transparent md:text-6xl bg-gradient-to-r from-primary to-primary-light bg-clip-text">
						Shopiflo
					</h1>
					<p className="mb-3 text-lg font-semibold md:text-xl text-text-primary">
						Seamless Shopping, Every Time
					</p>
					<p className="max-w-xl mx-auto mb-8 text-sm text-text-muted">
						Your one-stop destination for quality products with
						unbeatable prices and fast delivery
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col justify-center gap-3 sm:flex-row">
						<Link
							href="/login"
							className="flex items-center justify-center px-6 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-primary to-primary-light rounded-xl hover:shadow-lg hover:shadow-primary/50 hover:scale-105">
							<ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
							<span>Sign In</span>
						</Link>
						<Link
							href="/sign-up"
							className="flex items-center justify-center px-6 py-3 font-semibold transition-all duration-300 border-2 rounded-xl text-primary border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105">
							<span>Get Started</span>
							<ArrowRightIcon className="w-5 h-5 ml-2" />
						</Link>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes carousel-smooth {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-33.33%);
					}
				}
				.animate-carousel-smooth {
					animation: carousel-smooth 40s linear infinite;
				}
				.animate-carousel-smooth:hover {
					animation-play-state: paused;
				}
			`}</style>
		</main>
	);
}
