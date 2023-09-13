import { useNavigate } from "react-router-dom";
import { useGenres } from "../../hooks/useGenres";
import useHover from "../../hooks/useHover";
const MovieGenres = () => {
    const navigate = useNavigate();
    const { hovered, nodeRef } = useHover();
    const genres = useGenres();
    return (
        <div className="relative z-[9999]" ref={nodeRef}>
            <span className="cursor-pointer">Genres</span>
            <div
                className={`absolute top-0 -left-5 flex items-center w-[600px] flex-wrap gap-[30px] mt-6 bg-slate-900 bg-opacity-50 p-5 rounded-lg ${
                    hovered ? "" : "hidden"
                }`}
            >
                {genres?.length > 0 &&
                    genres.map((item) => (
                        <div
                            key={item.id}
                            className="px-4 py-2 border rounded-lg cursor-pointer border-secondary text-primary hover:bg-primary hover:text-white"
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
        </div>
    );
};

export default MovieGenres;
