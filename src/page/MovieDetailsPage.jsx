import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";
// import PropTypes from "prop-types";
const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
        fetcher
    );
    if (!data) return null;
    const {
        backdrop_path,
        poster_path,
        title,
        release_date,
        genres,
        overview,
        vote_average,
        vote_count,
        runtime,
    } = data;
    return (
        <>
            <div className="w-full h-[600px] relative">
                <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.7)]"></div>
                <div
                    className="w-full h-full bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
                    }}
                ></div>
                <div className="w-full max-w-[800px] absolute top-[36%] right-16 text-white">
                    <div>{new Date(release_date).getFullYear()}</div>
                    <h3 className="text-4xl font-extrabold mb-5">{title}</h3>
                    <div className="flex items-center gap-x-3">
                        {genres.length > 0 &&
                            genres.map((item) => (
                                <div
                                    key={item.id}
                                    className="border border-primary text-primary rounded-lg px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                                >
                                    {item.name}
                                </div>
                            ))}
                    </div>
                    <div className="flex items-center gap-x-[80px] mt-5">
                        <div className="flex items-center gap-x-2">
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                        fill="#FEA31B"
                                    />
                                </svg>
                            </span>
                            <span>
                                {vote_average} / 10 ({vote_count})
                            </span>
                        </div>
                        <span>{runtime} mins</span>
                    </div>
                    <div className="mt-5 text-xl font-medium leading-relaxed">
                        <p>{overview}</p>
                    </div>
                </div>
                <div className="w-full h-[500px] max-w-[400px] ml-[200px] -translate-y-3/4">
                    <img
                        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
            </div>
            <div className="page-container text-white">
                <MovieCredits></MovieCredits>
                <MovieVideos></MovieVideos>
                <MovieSimilar></MovieSimilar>
            </div>
        </>
    );
};

function MovieCredits() {
    const { movieId } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
        fetcher
    );
    if (!data) return null;
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
        <div className="py-16">
            <h2 className="text-center text-3xl mt-[150px] mb-10">Casts</h2>
            <div className="grid grid-cols-4 gap-5">
                {cast.slice(0, 4).map((item) => (
                    <div key={item.id} className="cast-item">
                        <img
                            src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                            alt=""
                            className="w-full h-[350px] object-cover rounded-lg mb-3"
                        />
                        <h3 className="text-xl">{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MovieVideos() {
    const { movieId } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
        fetcher
    );
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className="py-10">
            <h2 className="text-center text-3xl mb-10">Trailer</h2>
            <div className="flex flex-col gap-10">
                {results.slice(0, 2).map((item) => (
                    <div key={item.id}>
                        <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block rounded-lg">
                            {item.name}
                        </h3>
                        <div className="aspect-video">
                            <iframe
                                width="930"
                                height="523"
                                src={`https://www.youtube.com/embed/${item.key}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MovieSimilar() {
    const { movieId } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
        fetcher
    );
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className="py-10">
            <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
            <div className="movie-list">
                <Swiper
                    grabCursor={true}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                >
                    {results.length > 0 &&
                        results.map((item) => (
                            <SwiperSlide key={item.id}>
                                <MovieCard item={item}></MovieCard>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
}

export default MovieDetailsPage;
