import React from "react";
import useDebounce from "../hooks/useDebounce";
import { tmdbAPI } from "../config";

const MovieContext = React.createContext();

export function MovieProvider(props) {
    const [filter, setFilter] = React.useState("");
    const filterDebounce = useDebounce(filter, 500);
    const [nextPage, setNextPage] = React.useState(1);
    const [url, setUrl] = React.useState(
        tmdbAPI.getMovieList("upcoming", nextPage)
    );
    const value = {
        filter,
        filterDebounce,
        url,
        nextPage,
        setFilter,
        setUrl,
        setNextPage,
    };
    return (
        <MovieContext.Provider value={value} {...props}></MovieContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMovie() {
    const context = React.useContext(MovieContext);
    if (typeof context === "undefined")
        throw new Error("useMovie must be used within MovieProvider");
    return context;
}
