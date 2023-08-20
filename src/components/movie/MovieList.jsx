import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { fetcher, handleFallbackComponent, tmdbAPI } from "../../config";
import useSWR from "swr";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import IconSlider from "../icon/IconSlider";
const MovieList = withErrorBoundary(
    ({ type }) => {
        const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
        const movies = data?.results || [];
        const isLoading = !data && !error;
        return (
            <div className="movie-list">
                {isLoading ? (
                    <>
                        <Swiper
                            grabCursor={true}
                            spaceBetween={30}
                            slidesPerView={4}
                        >
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
                        </Swiper>
                    </>
                ) : (
                    <Swiper
                        grabCursor={true}
                        spaceBetween={30}
                        slidesPerView={4}
                    >
                        {movies.length > 0 &&
                            movies.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <MovieCard item={item}></MovieCard>
                                </SwiperSlide>
                            ))}
                        <IconSlider></IconSlider>
                    </Swiper>
                )}
            </div>
        );
    },
    {
        FallbackComponent: handleFallbackComponent,
    }
);

MovieList.propTypes = {
    type: PropTypes.string.isRequired,
};

export default MovieList;
