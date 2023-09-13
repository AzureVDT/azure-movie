import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { fetcher, tmdbAPI } from "../../config";
import useSWR from "swr";
import PropTypes from "prop-types";
import IconSlider from "../icon/IconSlider";
import useWindowSize from "../../hooks/useWindowSize";
const MovieList = ({ type }) => {
    const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
    const movies = data?.results || [];
    const isLoading = !data && !error;
    const windowSize = useWindowSize();
    const isMobile = windowSize?.width < 640;
    return (
        <>
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
                            {movies.length > 0 &&
                                movies.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <MovieCard item={item}></MovieCard>
                                    </SwiperSlide>
                                ))}
                            <IconSlider></IconSlider>
                        </Swiper>
                    </>
                )}
            </div>
        </>
    );
};

MovieList.propTypes = {
    type: PropTypes.string.isRequired,
};

export default MovieList;
