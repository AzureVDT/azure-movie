import { Route, Routes } from "react-router-dom";
import "./App.css";
import "swiper/scss";
import Main from "./components/layout/Main";
import HomePage from "./page/HomePage";
import Banner from "./components/banner/Banner";
import MovieExplorePage from "./page/MovieExplorePage";
// import MovieDetailsPage from "./page/MovieDetailsPage";
import { MovieProvider } from "./contexts/movie-context";
// import MovieSearchPage from "./page/MovieSearchPage";
import MoviePage from "./page/MoviePage";
const App = () => {
    return (
        <>
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
                            path="/movies"
                            element={<MovieExplorePage></MovieExplorePage>}
                        ></Route>
                        {/* <Route
                            path="/movie/:movieId"
                            element={<MovieDetailsPage></MovieDetailsPage>}
                        ></Route> */}
                        <Route
                            path="/movie/:slug"
                            element={<MoviePage></MoviePage>}
                        ></Route>
                    </Route>
                </Routes>
            </MovieProvider>
        </>
    );
};

export default App;
