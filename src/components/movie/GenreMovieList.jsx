import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import { useParams } from "react-router-dom";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { useMovie } from "../../contexts/movie-context";
import Pagination from "../layout/Pagination";
const GenreMovieList = () => {
    const { nextPage } = useMovie();
    const { slug } = useParams();
    console.log("GenreMovieList ~ genreId:", slug);
    const keyValuePairs = slug.split("&");
    let genreId, type;
    keyValuePairs.forEach((keyValuePair) => {
        const [key, value] = keyValuePair.split("=");
        if (key === "genreid") {
            genreId = parseInt(value);
        } else if (key === "type") {
            type = value;
        }
    });
    const { data, error } = useSWR(
        tmdbAPI.getGenreMovieList(genreId, nextPage),
        fetcher
    );
    const movies = data?.results || [];
    const isLoading = !data && !error;
    return (
        <div
            className="absolute top-0 w-full"
            style={{
                backgroundImage: `url("../src/assets/universe-2.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="py-10 page-container mt-[120px]">
                <h1 className="text-3xl text-center text-slate-900 font-extrabold">
                    {`Results for ${type} movie.`}
                </h1>
                <div className="grid grid-cols-4 gap-10 mt-10">
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
        </div>
    );
};
export default GenreMovieList;
