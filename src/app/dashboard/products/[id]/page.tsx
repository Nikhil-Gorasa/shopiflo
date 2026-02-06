"use client";
import ProductOverview from "@/_components/ProductOverview/ProductOverview";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function Page({ params }: { params: { id: string } }) {
	useProtectedRoute(); // Protect this route

	return <ProductOverview productId={params.id} />;
}
