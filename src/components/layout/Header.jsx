import { NavLink, useNavigate } from "react-router-dom";
import { useMovie } from "../../contexts/movie-context";
import MovieGenres from "../movie/MovieGenres";
import Button from "../button/Button";

const Header = () => {
    const { setFilter, filterDebounce } = useMovie();
    const navigate = useNavigate();
    return (
        <>
            <header className="header flex items-center justify-between text-white py-10 mb-5 page-container">
                <div className="flex items-center justify-center gap-x-5">
                    <NavLink
                        to={"/"}
                        className={({ isActive }) =>
                            isActive ? "text-primary" : ""
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={"/explore"}
                        className={({ isActive }) =>
                            isActive ? "text-primary" : ""
                        }
                    >
                        Explore
                    </NavLink>
                    <MovieGenres type="genre"></MovieGenres>
                </div>
                <div className="flex items-center justify-center gap-x-3">
                    <div className="flex-1 w-full max-w-[500px]">
                        <input
                            type="text"
                            name="search"
                            placeholder="Enter movies..."
                            className="w-full p-2 bg-slate-800 rounded-lg text-white"
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                    <button
                        className="p-2 bg-primary text-white rounded-lg hover:bg-secondary"
                        onClick={() =>
                            navigate(`/movie/search=${filterDebounce}`)
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                    <Button className="px-4 py-2">Sign In</Button>
                </div>
            </header>
        </>
    );
};

export default Header;
