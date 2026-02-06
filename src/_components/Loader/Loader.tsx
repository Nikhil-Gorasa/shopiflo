export default function Loader() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="relative">
				<div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
				<div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-primary rounded-full animate-spin"></div>
			</div>
		</div>
	);
}
