import Link from "next/link";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-primary">
			<div className="mb-8 text-center">
				<h1 className="mb-4 font-bold text-white text-7xl">
					Welcome to Shopiflo
				</h1>
				<p className="text-lg text-accent-lavenderLight">
					Seamless Shopping, Every Time
				</p>
			</div>
			<div className="flex flex-row w-full max-w-md gap-6 p-8 border shadow-lg bg-ui-card rounded-xl border-ui-border">
				<Link
					href="/login"
					className="w-full px-4 py-3 font-medium text-white transition rounded-lg bg-primary hover:bg-primary-dark">
					Login
				</Link>
				<Link
					href="/sign-up"
					className="w-full px-4 py-3 font-medium text-white transition rounded-lg bg-gradient-to-r from-gradient-primaryStart to-gradient-primaryEnd hover:opacity-90">
					Sign Up
				</Link>
			</div>
		</main>
	);
}
