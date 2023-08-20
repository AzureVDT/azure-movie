import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { useMovie } from "../contexts/movie-context";
import React from "react";
import Pagination from "../components/layout/Pagination";
import PropTypes from "prop-types";
const MovieSearchPage = ({ searchTitle }) => {
    const { url, filterDebounce, setUrl, nextPage } = useMovie();
    const { data, error } = useSWR(url, fetcher);
    const loading = !data && !error;
    React.useEffect(() => {
        if (filterDebounce) {
            setUrl(tmdbAPI.getMovieSearchResults(filterDebounce, nextPage));
        } else {
            setUrl(tmdbAPI.getMovieList("upcoming", nextPage));
        }
    }, [filterDebounce, nextPage, setUrl]);
    React.useEffect(() => {
        document.title = `${searchTitle.split("=").pop()}`;
    }, [searchTitle]);
    const movies = data?.results || [];
    return (
        <div
            className="absolute top-0 w-full"
            style={{
                backgroundImage: `url("../src/assets/universe-2.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="py-10 page-container mt-[120px] relative">
                <div className="grid grid-cols-4 gap-10">
                    {loading &&
                        new Array(20)
                            .fill(0)
                            .map((item, index) => (
                                <MovieCardSkeleton
                                    key={`${item}${index}`}
                                ></MovieCardSkeleton>
                            ))}
                    {!loading &&
                        movies.length > 0 &&
                        movies.map((item) => (
                            <MovieCard
                                hoverEffect={true}
                                key={item.id}
                                item={item}
                            ></MovieCard>
                        ))}
                    {!loading && movies.length <= 0 && (
                        <span className="text-3xl text-center text-primary font-extrabold">
                            No result
                        </span>
                    )}
                </div>
                <Pagination data={data}></Pagination>
            </div>
        </div>
    );
};
MovieSearchPage.propTypes = {
    searchTitle: PropTypes.string,
};

export default MovieSearchPage;
