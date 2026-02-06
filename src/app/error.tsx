"use client";

import { useEffect } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
			<div className="w-full max-w-md p-8 m-4 text-center bg-white shadow-2xl rounded-3xl">
				<div className="flex justify-center mb-6">
					<div className="flex items-center justify-center w-20 h-20 rounded-full bg-status-error/10">
						<ExclamationTriangleIcon className="w-12 h-12 text-status-error" />
					</div>
				</div>

				<h1 className="mb-3 text-3xl font-bold text-text-primary">
					Oops! Something went wrong
				</h1>

				<p className="mb-6 text-text-muted">
					We encountered an unexpected error. Don&apos;t worry,
					it&apos;s not your fault.
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<button
					onClick={reset}
					className="w-full px-6 py-3 font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:shadow-lg hover:shadow-primary/50 hover:scale-[1.02] active:scale-95">
					Try Again
				</button>

				<button
					onClick={() =>
						(window.location.href =
							"/dashboard/products?category=all")
					}
					className="w-full px-6 py-3 font-semibold transition-all duration-300 border-2 rounded-xl text-primary border-primary hover:bg-primary/5 active:scale-95">
					Go to Homepage
				</button>
			</div>

			<p className="mt-6 text-xs text-text-muted">
				If this problem persists, please contact support.
			</p>
		</div>
	);
}
