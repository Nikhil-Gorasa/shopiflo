"use client";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
	useProtectedRoute(); // Protect this route
	const router = useRouter();

	useEffect(() => {
		router.replace("/dashboard/products?category=all");
	}, [router]);

	return null;
}
