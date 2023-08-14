import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/form/LoginForm";
import { useMovie } from "../contexts/movie-context";
const LoginPage = () => {
    const { setShowLogin, loginRef } = useMovie();
    const navigate = useNavigate();
    if (typeof document === "undefined") return null;
    const handleShowRegister = () => {
        setShowLogin(false);
        navigate("/register");
    };
    return ReactDOM.createPortal(
        <>
            <div className="pt-[150px] rounded-lg w-full z-[10000] fixed top-0 h-screen">
                <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
                <div
                    className="relative w-full max-w-[600px] mx-auto p-10 bg-slate-800 shadow-md rounded-lg"
                    ref={loginRef}
                >
                    <span
                        className="absolute top-5 right-5"
                        onClick={() => setShowLogin(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8 cursor-pointer text-white ml-auto"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </span>
                    <div className="flex flex-col mt-5">
                        <h1 className="text-3xl font-semibold mb-5 text-white text-center">
                            Login
                        </h1>
                        <p className="text-base text-gray-200 leading-relaxed font-medium text-center">
                            See your growth and get consulting support!
                        </p>
                    </div>
                    <LoginForm></LoginForm>
                    <hr />
                    <div className="flex items-center justify-center gap-x-2 mt-3">
                        <span className="text-base font-medium text-white">
                            Not register yet?
                        </span>
                        <span
                            className="text-base font-medium text-secondary cursor-pointer hover:text-primary"
                            onClick={handleShowRegister}
                        >
                            Create an Account
                        </span>
                    </div>
                </div>
            </div>
        </>,
        document.querySelector("body")
    );
};

export default LoginPage;
