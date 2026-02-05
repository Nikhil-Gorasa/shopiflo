import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PriceRange() {
	const maxValue = 2000;
	const minValue = 0;

	const [value, setValue] = useState(maxValue);

	const router = useRouter();
	const searchParams = useSearchParams();

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = Number(event.target.value);
		setValue(value);
		handleParamChange(value);
	}

	function resetPrice() {
		setValue(maxValue);
		handleParamChange(maxValue);
	}

	function handleParamChange(value: number) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("maxPrice", value.toString());
		router.push(`/dashboard/products?${params.toString()}`);
	}

	return (
		<div className="p-6 bg-white shadow-sm rounded-3xl h-fit">
			<div className="flex items-center justify-between mb-2 ">
				<h3 className="text-lg font-semibold text-text-primary">
					Price Range
				</h3>
				<button
					className="text-sm text-text-muted hover:text-text-secondary"
					onClick={resetPrice}>
					Reset
				</button>
			</div>
			<p className="mb-4 text-sm text-text-muted">
				Price Range : ${minValue} - ${value}
			</p>
			<div className="relative pt-2 pb-6">
				<div className="relative flex items-center h-12">
					<input
						type="range"
						min={minValue}
						max={maxValue}
						value={value}
						onChange={handleChange}
						className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
					/>
				</div>
			</div>
		</div>
	);
}
