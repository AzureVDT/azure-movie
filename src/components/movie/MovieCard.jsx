import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const MovieCard = ({ item }) => {
    const navigate = useNavigate();
    return (
        <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
            <img
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt=""
                className="w-full h-[250px] object-cover rounded-lg mb-5"
            />
            <div className="flex flex-col flex-1">
                <h3 className="text-white text-xl font-bold mb-3 min-h-[56px]">
                    {item.original_title}
                </h3>
                <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                    <span>{new Date(item.release_date).getFullYear()}</span>
                    <div className="flex items-center justify-center gap-x-2">
                        <span>{item.vote_average}</span>
                        <span>
                            <svg
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                                    fill="#FEA31B"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
                <button
                    className="py-3 px-6 rounded-lg capitalize bg-primary w-full mt-auto"
                    onClick={() => navigate(`/movie/${item.id}`)}
                >
                    Watch Now
                </button>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    item: PropTypes.object,
};

export default MovieCard;
