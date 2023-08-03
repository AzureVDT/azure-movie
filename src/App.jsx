import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "swiper/scss";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";
import { MovieProvider } from "./contexts/movie-context";
// dynamic import
const HomePage = lazy(() => import("./page/HomePage"));
const MovieExplorePage = lazy(() => import("./page/MovieExplorePage"));
const MoviePage = lazy(() => import("./page/MoviePage"));
const GenreMovieList = lazy(() => import("./components/movie/GenreMovieList"));

const App = () => {
    return (
        <>
            <Suspense fallback={<></>}>
                <MovieProvider>
                    <Routes>
                        <Route element={<Main></Main>}>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <Banner></Banner>
                                        <HomePage></HomePage>
                                    </>
                                }
                            ></Route>
                            <Route
                                path="/explore"
                                element={<MovieExplorePage></MovieExplorePage>}
                            ></Route>
                            <Route
                                path="/movie/:slug"
                                element={<MoviePage></MoviePage>}
                            ></Route>
                            <Route
                                path="/discover/:slug"
                                element={<GenreMovieList></GenreMovieList>}
                            ></Route>
                        </Route>
                    </Routes>
                </MovieProvider>
            </Suspense>
        </>
    );
};

export default App;
