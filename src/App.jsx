import { Route, Routes } from "react-router-dom";
import "./App.css";
import "swiper/scss";
import Main from "./components/layout/Main";
import HomePage from "./page/HomePage";
import Banner from "./components/banner/Banner";
import MoviePage from "./page/MoviePage";
import MovieDetailsPage from "./page/MovieDetailsPage";
const App = () => {
    return (
        <>
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
                        element={<MoviePage></MoviePage>}
                    ></Route>
                    <Route
                        path="/movie/:movieId"
                        element={<MovieDetailsPage></MovieDetailsPage>}
                    ></Route>
                </Route>
            </Routes>
        </>
    );
};

export default App;
