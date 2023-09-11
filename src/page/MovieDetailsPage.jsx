import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";
import PropTypes from "prop-types";
import React from "react";
import IconSlider from "../components/icon/IconSlider";
const MovieDetailsPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { data } = useSWR(tmdbAPI.getMovieDetails(slug), fetcher);

    React.useEffect(() => {
        document.title = `${data?.title}`;
    }, [data?.title]);
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
        <div
            className="absolute top-0 w-full"
            style={{
                backgroundImage: `url("../src/assets/universe-2.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="relative mt-[140px]">
                <div className="w-full h-[600px] relative">
                    <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.7)]"></div>
                    <div
                        className="w-full h-full bg-no-repeat bg-cover"
                        style={{
                            backgroundImage: `url(${tmdbAPI.imageOriginal(
                                backdrop_path
                            )})`,
                        }}
                    ></div>
                    <div className="w-full max-w-[800px] absolute top-[36%] right-16 text-white">
                        <div>{new Date(release_date).getFullYear()}</div>
                        <h3 className="mb-5 text-4xl font-extrabold">
                            {title}
                        </h3>
                        <div className="flex items-center gap-x-3">
                            {genres?.length > 0 &&
                                genres.map((item) => (
                                    <div
                                        key={item.id}
                                        className="px-4 py-2 border rounded-lg cursor-pointer border-primary text-primary hover:bg-primary hover:text-white"
                                        onClick={() =>
                                            navigate(
                                                `/discover/genreid=${item.id}&type=${item.name}`
                                            )
                                        }
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
                    <div
                        className={`w-full h-[500px] max-w-[400px] ml-[200px] -translate-y-3/4`}
                    >
                        <img
                            src={tmdbAPI.imageOriginal(poster_path)}
                            alt={title}
                            className="object-cover w-full h-full rounded-xl"
                        />
                        <span
                            className="absolute text-white top-3/4 cursor-pointer w-full max-w-[400px] bg-primary
                                flex items-center justify-center px-6 py-3 mt-5 gap-x-3 z-[9999] transition-all"
                            onClick={() => navigate(`/watch/movie/${slug}`)}
                        >
                            <span>Watch now</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
                <div className="text-white page-container">
                    <MovieMeta type="credits"></MovieMeta>
                    <MovieMeta type="videos"></MovieMeta>
                    <MovieMeta type="similar"></MovieMeta>
                </div>
            </div>
        </div>
    );
};

function MovieMeta({ type }) {
    const { slug } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieMeta(slug, type), fetcher);
    if (!data) return null;
    if (type === "credits") {
        const { cast } = data;
        if (!cast || cast.length <= 0) return null;
        return (
            <div className="py-16">
                <h2 className="text-center text-3xl mt-[150px] mb-10">Casts</h2>
                <div className="grid grid-cols-4 gap-5">
                    {cast.slice(0, 4).map((item) => (
                        <div key={item.id} className="cast-item">
                            <img
                                src={tmdbAPI.imageOriginal(item.profile_path)}
                                alt={item.name}
                                className="w-full h-[350px] object-cover rounded-lg mb-3"
                            />
                            <h3 className="text-xl">{item.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        const { results } = data;
        if (!results || results.length <= 0) return null;
        if (type === "videos") {
            return (
                <div className="py-10">
                    <h2 className="mb-10 text-3xl text-center">Trailer</h2>
                    <div className="flex flex-col gap-10">
                        {results.slice(0, 2).map((item) => (
                            <div key={item.id}>
                                <h3 className="inline-block p-3 mb-5 text-xl font-medium rounded-lg bg-secondary">
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
        if (type === "similar") {
            return (
                <div className="py-10">
                    <h2 className="mb-10 text-3xl font-medium">
                        Similar movies
                    </h2>
                    <div className="movie-list">
                        <Swiper
                            grabCursor={true}
                            spaceBetween={30}
                            slidesPerView={4}
                        >
                            {results.length > 0 &&
                                results.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <MovieCard item={item}></MovieCard>
                                    </SwiperSlide>
                                ))}
                            <IconSlider></IconSlider>
                        </Swiper>
                    </div>
                </div>
            );
        }
    }
    return null;
}

MovieMeta.propTypes = {
    type: PropTypes.string.isRequired,
};

export default MovieDetailsPage;
