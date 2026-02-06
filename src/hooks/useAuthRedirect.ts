"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthRedirect() {
	const router = useRouter();

	useEffect(() => {
		const currentUser = localStorage.getItem("currentUser");

		if (currentUser) {
			// User is already logged in, redirect to products page
			router.replace("/dashboard/products?category=all");
		}
	}, [router]);
}
