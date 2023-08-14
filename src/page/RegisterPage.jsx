import RegisterForm from "../components/form/RegisterForm";
import ReactDOM from "react-dom";
const RegisterPage = () => {
    if (typeof document === "undefined") return null;
    return ReactDOM.createPortal(
        <div
            className="absolute top-0 w-full bottom-0"
            style={{
                backgroundImage: `url("../src/assets/universe-2.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="w-full max-w-[800px] mx-auto bg-slate-800 shadow-md px-8 py-2 mt-[120px] bg-opacity-30 rounded-lg">
                <div className="flex flex-col mb-5 mt-1">
                    <h1 className="text-3xl font-semibold mb-5 text-white">
                        Welcome to AzureMovies!
                    </h1>
                    <p className="text-base text-gray-200 leading-relaxed font-medium">
                        Register to create your first account and start
                        exploring the movies in AzureMovies.
                    </p>
                </div>
                <RegisterForm></RegisterForm>
            </div>
        </div>,
        document.querySelector("body")
    );
};

export default RegisterPage;
