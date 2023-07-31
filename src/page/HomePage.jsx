import MovieList from "../components/movie/MovieList";

const HomePage = () => {
    return (
        <>
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
        </>
    );
};

export default HomePage;
