import { NavLink, useNavigate } from "react-router-dom";
import { useMovie } from "../../contexts/movie-context";
import MovieGenres from "../movie/MovieGenres";
import Button from "../button/Button";
import ReactDOM from "react-dom";
import LoginPage from "../../page/LoginPage";
import { useAuth } from "../../contexts/auth-context";
import UserOption from "../user/UserOption";
import MenuResponsive from "../responsive/MenuResponsive";
import { useState } from "react";
const Header = () => {
    const { filter, setFilter, filterDebounce, setShowLogin, showLogin } =
        useMovie();
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const [showSideBar, setShowSideBar] = useState(false);

    if (typeof document === "undefined") return null;
    return ReactDOM.createPortal(
        <div
            style={{
                backgroundImage: `url("../src/assets/universe-2.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <header className="header w-screen fixed top-0 bottom-0 z-[1000] mt-10 h-[65.6px]">
                <div className="flex items-center justify-between p-3 text-white bg-opacity-50 rounded-lg page-container bg-slate-700">
                    <div className="items-center justify-center hidden lg:flex md:flex gap-x-5">
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
                        <MovieGenres></MovieGenres>
                    </div>
                    <button
                        className="inline-block cursor-pointer lg:hidden md:hidden"
                        onClick={() => setShowSideBar(true)}
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
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                    <div className="flex items-center justify-center ml-5 lg:gap-x-3 md:gap-x-3 gap-x-5">
                        <div className="flex items-center justify-center mr-auto gap-x-3">
                            <div className="flex-1 w-full max-w-[500px]">
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="search"
                                    placeholder="Enter movies..."
                                    className="w-full p-2 text-white border rounded-lg bg-slate-800 border-secondary focus:border-primary"
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
                        </div>
                        <div>
                            {userInfo ? (
                                <UserOption></UserOption>
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
                </div>
                {showSideBar && (
                    <MenuResponsive
                        setShowSideBar={setShowSideBar}
                    ></MenuResponsive>
                )}
            </header>
            {showLogin && <LoginPage></LoginPage>}
        </div>,
        document.querySelector("body")
    );
};

export default Header;
