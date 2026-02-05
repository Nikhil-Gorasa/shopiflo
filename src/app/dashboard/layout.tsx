import Navbar from "@/_components/Navbar/Navbar";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Navbar />
			</Suspense>
			<main>{children}</main>
		</>
		// TODO: FOOTER
	);
}
