import ProductOverview from "@/_components/ProductOverview/ProductOverview";

export default function page({ params }: { params: { id: string } }) {
	return <ProductOverview productId={params.id} />;
}
