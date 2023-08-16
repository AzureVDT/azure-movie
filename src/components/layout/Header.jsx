import { NavLink, useNavigate } from "react-router-dom";
import { useMovie } from "../../contexts/movie-context";
import MovieGenres from "../movie/MovieGenres";
import Button from "../button/Button";
import ReactDOM from "react-dom";
import LoginPage from "../../page/LoginPage";
import { useAuth } from "../../contexts/auth-context";
import UserOption from "../user/UserOption";
import useClickOutSide from "../../hooks/useClickOutSide";
const Header = () => {
    const { filter, setFilter, filterDebounce, setShowLogin, showLogin } =
        useMovie();
    const { userInfo } = useAuth();
    const { show, setShow, nodeRef } = useClickOutSide();
    const navigate = useNavigate();
    if (typeof document === "undefined") return null;
    return ReactDOM.createPortal(
        <div
            style={{
                backgroundImage: `url("../src/assets/universe-2.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <header className="header w-full fixed top-0 z-[1000] py-10">
                <div className="flex page-container items-center justify-between text-white p-3 bg-slate-700 bg-opacity-50 rounded-lg">
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
                                className="w-full p-2 bg-slate-800 rounded-lg text-white border border-secondary focus:border-primary"
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>
                        <button
                            className={`p-2 bg-primary text-white rounded-lg hover:bg-secondary cursor-pointer ${
                                filter ? "" : "opacity-70"
                            }`}
                            onClick={() =>
                                navigate(`/movie/search=${filterDebounce}`)
                            }
                            disabled={!filter}
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
                        {userInfo ? (
                            <div
                                className="relative cursor-pointer border border-secondary hover:bg-secondary rounded px-4 py-2"
                                ref={nodeRef}
                                onClick={() => setShow(true)}
                            >
                                {userInfo?.displayName}
                                {show && (
                                    <UserOption
                                        className={`absolute top-[60px] left-0 z-[1000] w-[180px] -translate-x-4 bg-white text-primary text-base font-medium rounded`}
                                    ></UserOption>
                                )}
                            </div>
                        ) : (
                            <Button
                                className="px-4 py-2"
                                onClick={() => setShowLogin(true)}
                            >
                                Sign In
                            </Button>
                        )}
                    </div>
                </div>
            </header>
            {showLogin && <LoginPage></LoginPage>}
        </div>,
        document.querySelector("body")
    );
};

export default Header;
