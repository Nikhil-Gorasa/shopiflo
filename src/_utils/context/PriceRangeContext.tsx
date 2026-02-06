"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface PriceRangeContextType {
	minPrice: number;
	maxPrice: number;
	setMinPrice: (price: number) => void;
	setMaxPrice: (price: number) => void;
}

const PriceRangeContext = createContext<PriceRangeContextType | undefined>(
	undefined,
);

interface PriceRangeProviderProps {
	children: ReactNode;
	defaultMin?: number;
	defaultMax?: number;
}

export function PriceRangeProvider({ children }: PriceRangeProviderProps) {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(2000);

	return (
		<PriceRangeContext.Provider
			value={{ minPrice, maxPrice, setMinPrice, setMaxPrice }}>
			{children}
		</PriceRangeContext.Provider>
	);
}

export function usePriceRange() {
	const context = useContext(PriceRangeContext);
	if (context === undefined) {
		throw new Error(
			"usePriceRange must be used within a PriceRangeProvider",
		);
	}
	return context;
}
