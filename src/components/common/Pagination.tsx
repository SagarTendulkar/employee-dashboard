interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    // If there's only 1 page or no data, hide the pagination completely to keep the UI clean
    if (totalPages <= 1) return null;

    // Helper logic to calculate which page numbers should be visible
    const getVisiblePages = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5; // Maximum number of numeric buttons to show at once

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Always include the first page
            pages.push(1);

            // Calculate start and end offsets around the current active page
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            // Adjust window if the active indicator is near the boundaries
            if (currentPage <= 2) {
                end = 4;
            } else if (currentPage >= totalPages - 1) {
                start = totalPages - 3;
            }

            // Push left ellipses if there is a gap between page 1 and start
            if (start > 2) pages.push("ellipsis-left");

            // Push the calculated inner page numbers
            for (let i = start; i <= end; i++) pages.push(i);

            // Push right ellipses if there is a gap between end and the final page
            if (end < totalPages - 1) pages.push("ellipsis-right");

            // Always include the last page
            pages.push(totalPages);
        }
        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-amber-50/30 p-4 border border-amber-200/40 rounded-2xl">
            {/* Left Side: Summary text counters */}
            <div className="text-sm text-amber-900/70 font-medium">
                Page{" "}
                <span className="text-amber-950 font-bold">{currentPage}</span>{" "}
                of{" "}
                <span className="text-amber-950 font-bold">{totalPages}</span>
            </div>

            {/* Right Side: Navigation Buttons layout control */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm font-semibold text-amber-900 transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:bg-amber-50 cursor-pointer"
                >
                    Prev
                </button>

                {/* Numeric and Ellipses sequence stack */}
                <div className="flex items-center gap-1.5">
                    {visiblePages.map((page, index) => {
                        // Render generic stylized static span if it represents ellipsis truncation gaps
                        if (typeof page === "string") {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="w-9 h-9 flex items-center justify-center text-amber-700/60 font-medium text-sm select-none"
                                >
                                    ...
                                </span>
                            );
                        }

                        // Render clickable active/inactive buttons
                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`h-9 w-9 text-sm font-semibold rounded-xl transition-all cursor-pointer
                                    ${
                                        currentPage === page
                                            ? "bg-amber-700 text-white shadow-sm ring-2 ring-amber-700/10"
                                            : "bg-white border border-amber-200 text-amber-950 hover:bg-amber-50"
                                    }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm font-semibold text-amber-900 transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:bg-amber-50 cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
