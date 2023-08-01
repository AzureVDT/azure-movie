import useSWR from "swr";
import { apiKey, fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";

const MovieExplorePage = () => {
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
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
        </div>
    );
};

export default MovieExplorePage;
