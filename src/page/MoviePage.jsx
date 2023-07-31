import useSWR from "swr";
import { apiKey, fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";

const MoviePage = () => {
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
        fetcher
    );
    const movies = data?.results || [];
    return (
        <div className="py-10 page-container">
            <div className="flex mb-10 items-center justify-center gap-x-3">
                <div className="flex-1">
                    <input
                        type="text"
                        name="search"
                        placeholder="Enter movies..."
                        className="w-full p-4 bg-slate-800 rounded-lg text-white"
                    />
                </div>
                <button className="p-4 bg-primary text-white rounded-lg">
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
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-4 gap-10">
                {movies.length > 0 &&
                    movies.map((item) => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))}
            </div>
        </div>
    );
};

export default MoviePage;
