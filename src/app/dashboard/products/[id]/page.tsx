"use client";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { Suspense, lazy } from "react";
import Loader from "@/_components/Loader/Loader";
const ProductOverview = lazy(
	() => import("@/_components/ProductOverview/ProductOverview"),
);

export default function Page({ params }: { params: { id: string } }) {
	useProtectedRoute(); // Protect this route

	return (
		<Suspense fallback={<Loader />}>
			<ProductOverview productId={params.id} />
		</Suspense>
	);
}
