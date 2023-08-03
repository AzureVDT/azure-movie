import { apiKey, fetcher } from "../config";
import useSWR from "swr";
export const useGenres = () => {
    const { data } = useSWR(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
        fetcher
    );
    const genres = data?.genres || [];
    return genres;
};
