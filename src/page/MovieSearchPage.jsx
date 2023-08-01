import useSWR from "swr";
import { apiKey, fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";
import { useMovie } from "../contexts/movie-context";
import React from "react";
const MovieSearchPage = () => {
    const { url, filterDebounce, setUrl } = useMovie();
    const { data, error } = useSWR(url, fetcher);
    const loading = !data && !error;
    React.useEffect(() => {
        if (filterDebounce) {
            setUrl(
                `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${filterDebounce}`
            );
        } else {
            setUrl(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
            );
        }
    }, [filterDebounce, setUrl]);
    const movies = data?.results || [];
    return (
        <div className="py-10 page-container">
            {loading && (
                <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto border-t-4 mb-5"></div>
            )}
            <div className="grid grid-cols-4 gap-10">
                {!loading && movies.length > 0 ? (
                    movies.map((item) => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))
                ) : (
                    <span className="text-3xl text-center text-primary font-extrabold">
                        No result
                    </span>
                )}
            </div>
        </div>
    );
};

export default MovieSearchPage;
