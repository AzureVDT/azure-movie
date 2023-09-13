import { Link, useNavigate } from "react-router-dom";
import { useGenres } from "../../hooks/useGenres";
import { useState } from "react";
import PropTypes from "prop-types";
const MenuResponsive = ({ setShowSideBar }) => {
    return (
        <div className="h-screen">
            <div className="overlay absolute -top-10 inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.8)] rounded-lg z-[8888] h-screen"></div>
            <span
                className="absolute -top-10 right-0 z-[9999] text-primary p-3 cursor-pointer"
                onClick={() => setShowSideBar(false)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-10 h-10"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </span>
            <div className="absolute -top-10 w-[80%] pt-10 pl-5 text-white">
                <div className="h-[650px] overflow-x-hidden overflow-y-scroll">
                    <div className="flex flex-col gap-y-5">
                        <Link
                            to={"/"}
                            className="z-[9999]"
                            onClick={() => setShowSideBar(false)}
                        >
                            {" "}
                            Home{" "}
                        </Link>
                        <Link
                            to={"/explore"}
                            className="z-[9999]"
                            onClick={() => setShowSideBar(false)}
                        >
                            {" "}
                            Explore{" "}
                        </Link>

                        <Genres setShowSideBar={setShowSideBar}></Genres>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Genres = ({ setShowSideBar }) => {
    const navigate = useNavigate();
    const genres = useGenres();
    const [showGenres, setShowGenres] = useState(false);

    return (
        <div className="relative z-[9999]">
            <span
                className="cursor-pointer"
                onClick={() => setShowGenres(!showGenres)}
            >
                {" "}
                Genres{" "}
            </span>

            <div
                className={`flex items-center w-[250px] flex-wrap gap-[30px] mt-6 bg-slate-900 bg-opacity-50 rounded-lg ${
                    showGenres ? "" : "hidden"
                }`}
            >
                {genres?.length > 0 &&
                    genres.map((item) => (
                        <div
                            key={item.id}
                            className="px-4 py-2 border rounded-lg cursor-pointer border-secondary text-primary hover:bg-primary hover:text-white"
                            onClick={() => {
                                setShowSideBar(false);
                                navigate(
                                    `/discover/genreid=${item.id}&type=${item.name}`
                                );
                            }}
                        >
                            {item.name}
                        </div>
                    ))}
            </div>
        </div>
    );
};
Genres.propTypes,
    (MenuResponsive.propTypes = {
        setShowSideBar: PropTypes.func,
    });
export default MenuResponsive;
