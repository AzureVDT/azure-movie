import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "swiper/scss";
import Main from "./components/layout/Main";
import { MovieProvider } from "./contexts/movie-context";
import { AuthProvider } from "./contexts/auth-context";
import NotFoundPage from "./page/NotFoundPage";
// dynamic import
const HomePage = lazy(() => import("./page/HomePage"));
const MovieExplorePage = lazy(() => import("./page/MovieExplorePage"));
const MoviePage = lazy(() => import("./page/MoviePage"));
const GenreMovieList = lazy(() => import("./components/movie/GenreMovieList"));
const RegisterPage = lazy(() => import("./page/RegisterPage"));
const UserAccountPage = lazy(() => import("./page/UserAccountPage"));

const App = () => {
    return (
        <>
            <Suspense fallback={<></>}>
                <MovieProvider>
                    <AuthProvider>
                        <Routes>
                            <Route element={<Main></Main>}>
                                <Route
                                    path="/"
                                    element={<HomePage></HomePage>}
                                ></Route>
                                <Route
                                    path="/explore"
                                    element={
                                        <MovieExplorePage></MovieExplorePage>
                                    }
                                ></Route>
                                <Route
                                    path="/movie/:slug"
                                    element={<MoviePage></MoviePage>}
                                ></Route>
                                <Route
                                    path="/discover/:slug"
                                    element={<GenreMovieList></GenreMovieList>}
                                ></Route>
                                <Route
                                    path="/register"
                                    element={<RegisterPage></RegisterPage>}
                                ></Route>
                                <Route
                                    path="/profile"
                                    element={
                                        <UserAccountPage></UserAccountPage>
                                    }
                                ></Route>
                                <Route
                                    path="*"
                                    element={<NotFoundPage></NotFoundPage>}
                                ></Route>
                            </Route>
                        </Routes>
                    </AuthProvider>
                </MovieProvider>
            </Suspense>
        </>
    );
};

export default App;
