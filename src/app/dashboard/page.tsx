"use client";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function DashboardPage() {
	useProtectedRoute(); // Protect this route

	return <div>Dashboard Page</div>;
}
