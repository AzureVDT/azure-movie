import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { fetcher, handleFallbackComponent, tmdbAPI } from "../../config";
import useSWR from "swr";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
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
                            spaceBetween={40}
                            slidesPerView={"auto"}
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
                        spaceBetween={40}
                        slidesPerView={"auto"}
                    >
                        {movies.length > 0 &&
                            movies.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <MovieCard item={item}></MovieCard>
                                </SwiperSlide>
                            ))}
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
