import Navbar from "@/_components/Navbar/Navbar";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
		// TODO: FOOTER
	);
}
