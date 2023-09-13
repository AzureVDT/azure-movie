import { useNavigate, useParams } from "react-router-dom";
import EmbedVideoMovie from "../components/movie/EmbedVideoMovie";
import { fetcher, tmdbAPI } from "../config";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import IconSlider from "../components/icon/IconSlider";
import useWindowSize from "../hooks/useWindowSize";

const WatchMoviePage = () => {
    const { slug } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieDetails(slug), fetcher);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = `${data?.title} | Watch`;
    }, [data?.title]);
    if (!data) return null;
    return (
        <div
            className="absolute top-0 w-full"
            style={{
                backgroundImage: `url("/universe-bg.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="relative mt-[140px]">
                <div className="page-container">
                    <EmbedVideoMovie id={slug}></EmbedVideoMovie>
                    <div className="w-full p-3 text-white">
                        <h3 className="mb-5 text-4xl font-extrabold">
                            {data.title}
                        </h3>
                        <div className="flex items-center gap-x-3">
                            {data.genres?.length > 0 &&
                                data.genres.map((item) => (
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
                                    {data.vote_average} / 10 ({data.vote_count})
                                </span>
                            </div>
                            <span>{data.runtime} mins</span>
                        </div>

                        <div className="mt-5 text-xl font-medium leading-relaxed">
                            Date release: {data.release_date}
                        </div>
                        <div className="mt-5 text-xl font-medium leading-relaxed">
                            <p>{data.overview}</p>
                        </div>
                    </div>
                    <SimilarMovie></SimilarMovie>
                </div>
            </div>
        </div>
    );
};

const SimilarMovie = () => {
    const windowSize = useWindowSize();
    const isMobile = windowSize?.width < 640;
    const { slug } = useParams();
    const { data, error } = useSWR(
        tmdbAPI.getMovieMeta(slug, "similar"),
        fetcher
    );
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    const isLoading = !data && !error;
    return (
        <div className="py-10">
            <h2 className="p-3 mb-10 text-3xl font-medium text-white">
                Similar movies
            </h2>
            <div className="movie-list">
                {isLoading ? (
                    <>
                        <Swiper
                            grabCursor={true}
                            spaceBetween={isMobile ? 10 : 30}
                            slidesPerView={isMobile ? 2 : 4}
                        >
                            {isMobile ? (
                                <>
                                    <SwiperSlide>
                                        <MovieCardSkeleton></MovieCardSkeleton>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <MovieCardSkeleton></MovieCardSkeleton>
                                    </SwiperSlide>
                                </>
                            ) : (
                                <>
                                    <SwiperSlide>
                                        <MovieCardSkeleton></MovieCardSkeleton>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <MovieCardSkeleton></MovieCardSkeleton>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <MovieCardSkeleton></MovieCardSkeleton>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <MovieCardSkeleton></MovieCardSkeleton>
                                    </SwiperSlide>
                                </>
                            )}
                        </Swiper>
                    </>
                ) : (
                    <>
                        <Swiper
                            grabCursor={true}
                            spaceBetween={isMobile ? 10 : 30}
                            slidesPerView={isMobile ? 2 : 4}
                        >
                            {results.length > 0 &&
                                results.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <MovieCard item={item}></MovieCard>
                                    </SwiperSlide>
                                ))}
                            <IconSlider></IconSlider>
                        </Swiper>
                    </>
                )}
            </div>
        </div>
    );
};

export default WatchMoviePage;
