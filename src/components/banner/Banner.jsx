import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, handleFallbackComponent, tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { useGenres } from "../../hooks/useGenres";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import IconSlider from "../icon/IconSlider";
import { Autoplay, Pagination } from "swiper/modules";
const Banner = withErrorBoundary(
    () => {
        const { data, error } = useSWR(
            tmdbAPI.getMovieList("upcoming"),
            fetcher
        );
        const movies = data?.results || [];
        const isLoading = !data && !error;
        return (
            <section className="banner h-[500px] rounded-lg page-container mb-20 overflow-hidden">
                {isLoading ? (
                    <>
                        <Swiper grabCursor={true} slidesPerView={1}>
                            <SwiperSlide>
                                <BannerSkeleton></BannerSkeleton>
                            </SwiperSlide>
                            <SwiperSlide>
                                <BannerSkeleton></BannerSkeleton>
                            </SwiperSlide>
                            <SwiperSlide>
                                <BannerSkeleton></BannerSkeleton>
                            </SwiperSlide>
                            <SwiperSlide>
                                <BannerSkeleton></BannerSkeleton>
                            </SwiperSlide>
                            <SwiperSlide>
                                <BannerSkeleton></BannerSkeleton>
                            </SwiperSlide>
                            <SwiperSlide>
                                <BannerSkeleton></BannerSkeleton>
                            </SwiperSlide>
                            <SwiperSlide>
                                <BannerSkeleton></BannerSkeleton>
                            </SwiperSlide>
                            <SwiperSlide>
                                <BannerSkeleton></BannerSkeleton>
                            </SwiperSlide>
                        </Swiper>
                    </>
                ) : (
                    <Swiper
                        grabCursor={true}
                        slidesPerView={1}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        modules={[Autoplay, Pagination]}
                    >
                        {movies.length > 0 &&
                            movies.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <BannerItem item={item}>
                                        <IconSlider></IconSlider>
                                    </BannerItem>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                )}
            </section>
        );
    },
    {
        FallbackComponent: handleFallbackComponent,
    }
);

const BannerItem = ({ item, children }) => {
    const { genre_ids } = item;
    const navigate = useNavigate();
    const genres = useGenres();
    return (
        <div className="w-full h-full relative transition-all">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
            <img
                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                alt=""
                className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute left-5 bottom-5 w-full text-white">
                <h2 className="font-bold text-3xl mb-5">
                    {item.original_title}
                </h2>
                <div className="flex items-center gap-x-3 mb-8">
                    {genres?.length > 0 &&
                        genres.map((genre) => {
                            if (genre_ids.includes(genre.id)) {
                                return (
                                    <div
                                        key={genre.id}
                                        className="border border-primary text-primary rounded-lg px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                                        onClick={() =>
                                            navigate(
                                                `/discover/genreid=${genre.id}&type=${genre.name}`
                                            )
                                        }
                                    >
                                        {genre.name}
                                    </div>
                                );
                            } else return null;
                        })}
                </div>
                <Button
                    className="py-3 px-6 rounded-lg"
                    onClick={() => navigate(`/movie/${item.id}`)}
                >
                    Watch Now
                </Button>
            </div>
            {children}
        </div>
    );
};

const BannerSkeleton = () => {
    return (
        <div className="w-full h-full relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
            <LoadingSkeleton className="w-full h-full rounded-lg"></LoadingSkeleton>
            <div className="absolute left-5 bottom-5 w-full text-white">
                <h2 className="font-bold text-3xl mb-5">
                    <LoadingSkeleton className="w-[300px] h-[40px]"></LoadingSkeleton>
                </h2>
                <div className="flex items-center gap-x-3 mb-8">
                    <LoadingSkeleton className="w-[108px] h-[42px] rounded-lg"></LoadingSkeleton>
                    <LoadingSkeleton className="w-[108px] h-[42px] rounded-lg"></LoadingSkeleton>
                    <LoadingSkeleton className="w-[108px] h-[42px] rounded-lg"></LoadingSkeleton>
                </div>
                <LoadingSkeleton className="w-[130px] h-[48px] rounded-lg"></LoadingSkeleton>
            </div>
        </div>
    );
};

BannerItem.propTypes = {
    item: PropTypes.object.isRequired,
    children: PropTypes.node,
};

export default Banner;
