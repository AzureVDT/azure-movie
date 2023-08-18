import React from "react";
import Banner from "../components/banner/Banner";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
    React.useEffect(() => {
        document.title = "Home";
    }, []);
    return (
        <div
            className="absolute top-0 w-full"
            style={{
                backgroundImage: `url("../src/assets/universe-2.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="mt-[140px] relative">
                <Banner></Banner>
                <section className="movies-layout page-container pb-20">
                    <h2 className="capitalize text-white mb-10 text-2xl font-bold">
                        Now Playing
                    </h2>
                    <MovieList type="now_playing"></MovieList>
                </section>
                <section className="movies-layout page-container pb-20">
                    <h2 className="capitalize text-white mb-10 text-2xl font-bold">
                        Top Rated
                    </h2>
                    <MovieList type="top_rated"></MovieList>
                </section>
                <section className="movies-layout page-container pb-20  ">
                    <h2 className="capitalize text-white mb-10 text-2xl font-bold">
                        Trending
                    </h2>
                    <MovieList type="popular"></MovieList>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
