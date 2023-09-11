/* eslint-disable react-refresh/only-export-components */
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, handleFallbackComponent, tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { useGenres } from "../../hooks/useGenres";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import IconSlider from "../icon/IconSlider";
import { Autoplay, Pagination } from "swiper/modules";
import { withErrorBoundary } from "react-error-boundary";
const Banner = () => {
    const { data, error } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);
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
};

const BannerItem = ({ item, children }) => {
    const { genre_ids } = item;
    const navigate = useNavigate();
    const genres = useGenres();
    return (
        <div className="relative w-full h-full transition-all">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
            <img
                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                alt=""
                className="object-cover w-full h-full rounded-lg"
            />
            <div className="absolute w-full text-white left-5 bottom-5">
                <h2 className="mb-5 text-3xl font-bold">
                    {item.original_title}
                </h2>
                <div className="flex items-center mb-8 gap-x-3">
                    {genres?.length > 0 &&
                        genres.map((genre) => {
                            if (genre_ids.includes(genre.id)) {
                                return (
                                    <div
                                        key={genre.id}
                                        className="px-4 py-2 border rounded-lg cursor-pointer border-primary text-primary hover:bg-primary hover:text-white"
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
                    className="px-6 py-3 rounded-lg"
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
        <div className="relative w-full h-full">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
            <LoadingSkeleton className="w-full h-full rounded-lg"></LoadingSkeleton>
            <div className="absolute w-full text-white left-5 bottom-5">
                <h2 className="mb-5 text-3xl font-bold">
                    <LoadingSkeleton className="w-[300px] h-[40px]"></LoadingSkeleton>
                </h2>
                <div className="flex items-center mb-8 gap-x-3">
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

export default withErrorBoundary(Banner, {
    FallbackComponent: handleFallbackComponent,
});
