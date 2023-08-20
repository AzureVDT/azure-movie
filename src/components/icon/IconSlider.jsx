import PropTypes from "prop-types";
import { useSwiper } from "swiper/react";
const IconNext = () => {
    const swiper = useSwiper();
    return (
        <div className="absolute z-[1000] top-2/4 left-0 -translate-y-2/4 w-full">
            <div className="flex items-center justify-between">
                <span
                    onClick={() => swiper.slidePrev()}
                    className="text-white cursor-pointer hover:bg-primary rounded bg-transparent px-2 m-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
                <span
                    onClick={() => swiper.slideNext()}
                    className="text-white cursor-pointer hover:bg-primary rounded bg-transparent px-2 m-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </div>
        </div>
    );
};

IconNext.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
};

export default IconNext;
