import { useRouter, useSearchParams } from "next/navigation";
import { usePriceRange } from "@/_utils/context/PriceRangeContext";
import styles from "./PriceRange.module.css";

export default function PriceRange() {
	const { minPrice: absoluteMin, maxPrice: absoluteMax } = usePriceRange();
	const router = useRouter();
	const searchParams = useSearchParams();

	// Get current filter values from URL or use context defaults
	const currentMin = Number(searchParams.get("minPrice")) || absoluteMin;
	const currentMax = Number(searchParams.get("maxPrice")) || absoluteMax;

	function updateURL(min: number, max: number) {
		const params = new URLSearchParams(searchParams.toString());

		if (min > absoluteMin) {
			params.set("minPrice", min.toString());
		} else {
			params.delete("minPrice");
		}

		if (max < absoluteMax) {
			params.set("maxPrice", max.toString());
		} else {
			params.delete("maxPrice");
		}

		router.push(`/dashboard/products?${params.toString()}`);
	}

	function handleMinChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = Number(e.target.value);
		if (value <= currentMax) {
			updateURL(value, currentMax);
		}
	}

	function handleMaxChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = Number(e.target.value);
		if (value >= currentMin) {
			updateURL(currentMin, value);
		}
	}

	function resetPrice() {
		updateURL(absoluteMin, absoluteMax);
	}

	return (
		<div className="p-6 bg-white shadow-sm rounded-3xl h-fit">
			<div className="flex items-center justify-between mb-2">
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
				${currentMin} - ${currentMax}
			</p>

			{/* Double Range Slider */}
			<div className="relative pt-2 pb-6">
				<div className="relative h-2 bg-gray-300 rounded-lg">
					<div
						className="absolute h-2 bg-primary rounded-lg"
						style={{
							left: `${((currentMin - absoluteMin) / (absoluteMax - absoluteMin)) * 100}%`,
							width: `${((currentMax - currentMin) / (absoluteMax - absoluteMin)) * 100}%`,
						}}
					/>
				</div>

				<input
					type="range"
					min={absoluteMin}
					max={absoluteMax}
					value={currentMin}
					onChange={handleMinChange}
					className={styles.sliderThumb}
				/>

				<input
					type="range"
					min={absoluteMin}
					max={absoluteMax}
					value={currentMax}
					onChange={handleMaxChange}
					className={styles.sliderThumb}
				/>

				<div className="flex justify-between mt-4 text-sm text-text-muted">
					<span>${absoluteMin}</span>
					<span>${absoluteMax}</span>
				</div>
			</div>
		</div>
	);
}
