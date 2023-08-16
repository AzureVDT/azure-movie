import React from "react";
import useDebounce from "../hooks/useDebounce";
import { tmdbAPI } from "../config";
import useClickOutSide from "../hooks/useClickOutSide";
import useHover from "../hooks/useHover";

const MovieContext = React.createContext();

export function MovieProvider(props) {
    const [filter, setFilter] = React.useState("");
    const filterDebounce = useDebounce(filter, 500);
    const [nextPage, setNextPage] = React.useState(1);
    const [url, setUrl] = React.useState(
        tmdbAPI.getMovieList("upcoming", nextPage)
    );

    const { hovered, nodeRef } = useHover();
    const {
        show: showLogin,
        setShow: setShowLogin,
        nodeRef: loginRef,
    } = useClickOutSide();
    const value = {
        loginRef,
        filter,
        filterDebounce,
        url,
        nextPage,
        showLogin,
        hovered,
        setShowLogin,
        setFilter,
        setUrl,
        setNextPage,
        nodeRef,
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
