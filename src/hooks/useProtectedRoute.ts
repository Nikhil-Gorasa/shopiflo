"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useProtectedRoute() {
	const router = useRouter();

	useEffect(() => {
		const currentUser = localStorage.getItem("currentUser");

		if (!currentUser) {
			// User is not logged in, redirect to login page
			router.replace("/login");
		}
	}, [router]);

	// Return whether user is authenticated
	const isAuthenticated =
		typeof window !== "undefined" && !!localStorage.getItem("currentUser");
	return isAuthenticated;
}
