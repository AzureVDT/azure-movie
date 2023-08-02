import React from "react";
import { useMovie } from "../../contexts/movie-context";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
const itemsPerPage = 20;
const customNextLabel = (
    <span className="cursor-pointer flex items-center justify-center py-2 px-4 rounded bg-primary gap-x-1 hover:bg-secondary">
        <span className="text-sm text-current font-medium">Next</span>
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
    <span className="cursor-pointer flex items-center justify-center py-2 px-4 rounded bg-primary gap-x-1 hover:bg-secondary">
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
        <span className="text-sm text-current font-medium">Prev</span>
    </span>
);
const Pagination = ({ data }) => {
    const { setNextPage } = useMovie();
    const [pageCount, setPageCount] = React.useState(0);
    const [itemOffset, setItemOffset] = React.useState(0);
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
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={customPrevLabel}
                renderOnZeroPageCount={null}
                className="pagination"
            />
        </>
    );
};

Pagination.propTypes = {
    data: PropTypes.object,
};

export default Pagination;
