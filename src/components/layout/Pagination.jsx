import React from "react";
import { useMovie } from "../../contexts/movie-context";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import useWindowSize from "../../hooks/useWindowSize";
const itemsPerPage = 20;
const customNextLabel = (
    <span className="flex items-center justify-center px-4 py-2 rounded cursor-pointer bg-primary gap-x-1 hover:bg-secondary">
        <span className="text-sm font-medium text-current">Next</span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
        </svg>
    </span>
);
const customPrevLabel = (
    <span className="flex items-center justify-center px-4 py-2 rounded cursor-pointer bg-primary gap-x-1 hover:bg-secondary">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
        </svg>
        <span className="text-sm font-medium text-current">Prev</span>
    </span>
);
const Pagination = ({ data }) => {
    const { setNextPage } = useMovie();
    const [pageCount, setPageCount] = React.useState(0);
    const [itemOffset, setItemOffset] = React.useState(0);
    const windowSize = useWindowSize();
    const isMobile = windowSize.width < 640;
    React.useEffect(() => {
        if (!data || !data.total_results) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [data, itemOffset]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset);
        setNextPage(event.selected + 1);
    };
    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel={customNextLabel}
                onPageChange={handlePageClick}
                pageRangeDisplayed={isMobile ? 2 : 5}
                pageCount={pageCount}
                previousLabel={customPrevLabel}
                renderOnZeroPageCount={null}
                className="pagination sm:flex-wrap"
            />
        </>
    );
};

Pagination.propTypes = {
    data: PropTypes.object,
};

export default Pagination;
