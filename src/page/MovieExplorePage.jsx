import useSWR from "swr";
import { apiKey, fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";
import Pagination from "../components/layout/Pagination";
import { useMovie } from "../contexts/movie-context";

const MovieExplorePage = () => {
    const { nextPage } = useMovie();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${nextPage}`,
        fetcher
    );
    const movies = data?.results || [];
    return (
        <div className="py-10 page-container">
            <div className="grid grid-cols-4 gap-10">
                {movies.length > 0 &&
                    movies.map((item) => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))}
            </div>
            <Pagination data={data}></Pagination>
        </div>
    );
};

export default MovieExplorePage;
