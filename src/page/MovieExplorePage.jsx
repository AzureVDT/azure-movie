import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import Pagination from "../components/layout/Pagination";
import { useMovie } from "../contexts/movie-context";

const MovieExplorePage = () => {
    const { nextPage } = useMovie();
    const { data, error } = useSWR(
        tmdbAPI.getMovieList("popular", nextPage),
        fetcher
    );
    const isLoading = !data && !error;
    const movies = data?.results || [];
    return (
        <div className="py-10 page-container">
            <div className="grid grid-cols-4 gap-10">
                {isLoading &&
                    new Array(20)
                        .fill(0)
                        .map((item, index) => (
                            <MovieCardSkeleton
                                key={`${item}${index}`}
                            ></MovieCardSkeleton>
                        ))}
                {!isLoading &&
                    movies.length > 0 &&
                    movies.map((item) => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))}
            </div>
            <Pagination data={data}></Pagination>
        </div>
    );
};

export default MovieExplorePage;
