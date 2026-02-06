import { useState, useMemo } from "react";

interface UsePaginationProps<T> {
	items: T[];
	itemsPerPage: number;
}

export function usePagination<T>({
	items,
	itemsPerPage,
}: UsePaginationProps<T>) {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(items.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const currentItems = useMemo(
		() => items.slice(startIndex, endIndex),
		[items, startIndex, endIndex],
	);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			handlePageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			handlePageChange(currentPage + 1);
		}
	};

	const resetPage = () => setCurrentPage(1);

	return {
		currentPage,
		totalPages,
		startIndex,
		endIndex,
		currentItems,
		handlePageChange,
		handlePrevPage,
		handleNextPage,
		resetPage,
	};
}
