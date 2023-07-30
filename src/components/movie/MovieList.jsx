import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import { fetcher } from "../../config";
import useSWR from "swr";
import PropTypes from "prop-types";
// https://api.themoviedb.org/3/movie/now_playing?api_key=5a52ec1ab8c4c3c715520bb8a641c137
const MovieList = ({ type }) => {
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${type}?api_key=5a52ec1ab8c4c3c715520bb8a641c137`,
        fetcher
    );
    const movies = data?.results || [];
    return (
        <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
                {movies.length > 0 &&
                    movies.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

MovieList.propTypes = {
    type: PropTypes.string.isRequired,
};

export default MovieList;
