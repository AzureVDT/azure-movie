import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { handleFallbackComponent, tmdbAPI } from "../../config";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import { withErrorBoundary } from "react-error-boundary";

const MovieCard = ({ item, hoverEffect = false }) => {
    const navigate = useNavigate();
    return (
        <div
            className={`movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none ${
                hoverEffect ? "hover:scale-105 scale-100 transition-all" : ""
            }`}
        >
            <img
                src={tmdbAPI.imageMedium(item?.poster_path)}
                alt={item?.original_title}
                className="w-full h-[250px] object-cover rounded-lg mb-5"
                onClick={() => navigate(`/movie/${item?.id}`)}
            />
            <div className="flex flex-col flex-1">
                <h3 className="text-white text-xl font-bold mb-3 min-h-[56px]">
                    {item?.original_title}
                </h3>
                <div className="flex items-center justify-between mb-10 text-sm opacity-50">
                    <span>{new Date(item?.release_date).getFullYear()}</span>
                    <div className="flex items-center justify-center gap-x-2">
                        <span>{item?.vote_average}</span>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#EFAF00"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="#EFAF00"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
                <Button
                    onClick={() => navigate(`/movie/${item?.id}`)}
                    defaultStyle={true}
                >
                    Watch Now
                </Button>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    item: PropTypes.object,
    hoverEffect: PropTypes.bool,
};

// eslint-disable-next-line react-refresh/only-export-components
export default withErrorBoundary(MovieCard, {
    FallbackComponent: handleFallbackComponent,
});

export const MovieCardSkeleton = () => {
    return (
        <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
            <LoadingSkeleton className="w-full h-[250px] rounded-lg mb-5"></LoadingSkeleton>
            <div className="flex flex-col flex-1">
                <h3 className="text-white text-xl font-bold mb-3 min-h-[56px]">
                    <LoadingSkeleton className="w-full h-[20px] mb-3"></LoadingSkeleton>
                </h3>
                <div className="flex items-center justify-between mb-10 text-sm opacity-50">
                    <span>
                        <LoadingSkeleton className="w-[50px] h-[10px]"></LoadingSkeleton>
                    </span>
                    <div className="flex items-center justify-center gap-x-2">
                        <span>
                            <LoadingSkeleton className="w-[30px] h-[10px]"></LoadingSkeleton>
                        </span>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#EFAF00"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="#EFAF00"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
                <LoadingSkeleton className="w-full h-[45px] rounded-lg"></LoadingSkeleton>
            </div>
        </div>
    );
};
