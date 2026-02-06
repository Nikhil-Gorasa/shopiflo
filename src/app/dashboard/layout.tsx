import Footer from "@/_components/footer/Footer";
import Navbar from "@/_components/Navbar/Navbar";
import MobileBottomNav from "@/_components/Navbar/MobileBottomNav";
import { Suspense } from "react";
import Loader from "@/_components/Loader/Loader";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Suspense fallback={<Loader />}>
				<Navbar />
			</Suspense>
			<main className="flex-1 pb-20 lg:pb-0">{children}</main>
			<MobileBottomNav />
			<div className="hidden lg:block">
				<Footer />
			</div>
		</>
	);
}
