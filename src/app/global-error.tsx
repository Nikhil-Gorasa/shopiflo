"use client";

import { useEffect } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Global Error:", error);
	}, [error]);

	return (
		<html lang="en">
			<body>
				<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
					<div className="w-full max-w-md p-8 m-4 text-center bg-white shadow-2xl rounded-3xl">
						<div className="flex justify-center mb-6">
							<div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
								<ExclamationTriangleIcon className="w-12 h-12 text-red-600" />
							</div>
						</div>

						<h1 className="mb-3 text-3xl font-bold text-gray-900">
							Critical Error
						</h1>

						<p className="mb-6 text-gray-600">
							We encountered a critical error. Please refresh the
							page or contact support if the issue persists.
						</p>

						<div className="p-4 mb-6 overflow-x-auto text-left bg-red-50 border border-red-200 rounded-lg">
							<p className="text-xs font-mono text-red-700">
								{error.message ||
									"An unexpected critical error occurred"}
							</p>
						</div>

						<div className="flex flex-col gap-3">
							<button
								onClick={reset}
								className="w-full px-6 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95">
								Try Again
							</button>

							<button
								onClick={() => (window.location.href = "/")}
								className="w-full px-6 py-3 font-semibold text-blue-600 transition-all duration-300 border-2 border-blue-600 rounded-xl hover:bg-blue-50 active:scale-95">
								Reload Application
							</button>
						</div>

						<p className="mt-6 text-xs text-gray-500">
							Error ID: {error.digest || "N/A"}
						</p>
					</div>
				</div>
			</body>
		</html>
	);
}
