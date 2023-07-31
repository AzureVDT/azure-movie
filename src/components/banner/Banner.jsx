import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "../../config";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const Banner = () => {
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=5a52ec1ab8c4c3c715520bb8a641c137`,
        fetcher
    );
    const movies = data?.results || [];
    return (
        <section className="banner h-[500px] rounded-lg page-container mb-20 overflow-hidden">
            <Swiper grabCursor={true} slidesPerView={"auto"}>
                {movies.length > 0 &&
                    movies.map((item) => (
                        <SwiperSlide key={item.id}>
                            <BannerItem item={item}></BannerItem>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </section>
    );
};

const BannerItem = ({ item }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full relative">
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
                    <span className="border border-white rounded-lg px-4 py-2">
                        Action
                    </span>
                    <span className="border border-white rounded-lg px-4 py-2">
                        Adventure
                    </span>
                    <span className="border border-white rounded-lg px-4 py-2">
                        Drama
                    </span>
                </div>
                <button
                    className="py-3 px-6 rounded-lg bg-primary text-white font-medium"
                    onClick={() => navigate(`/movie/${item.id}`)}
                >
                    Watch Now
                </button>
            </div>
        </div>
    );
};

BannerItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Banner;
