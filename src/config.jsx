export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "5a52ec1ab8c4c3c715520bb8a641c137";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
const tmdbEndpointGenre = "https://api.themoviedb.org/3/discover/movie";
export const tmdbAPI = {
    getMovieList: (type, page = 1) =>
        `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
    getMovieDetails: (slug) => `${tmdbEndpoint}/${slug}?api_key=${apiKey}`,
    getMovieMeta: (slug, type) =>
        `${tmdbEndpoint}/${slug}/${type}?api_key=${apiKey}`,
    getMovieSearchResults: (query, page = 1) =>
        `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
    getGenreMovieList: (genreId, page = 1) =>
        `${tmdbEndpointGenre}?api_key=${apiKey}&with_genres=${genreId}&page=${page}`,
    imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
    imageMedium: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};

export function handleFallbackComponent() {
    return (
        <p className="text-red-400 bg-red-50">
            Something went wrong with this MovieCard
        </p>
    );
}
