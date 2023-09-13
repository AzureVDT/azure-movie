import RegisterForm from "../components/form/RegisterForm";
import ReactDOM from "react-dom";
const RegisterPage = () => {
    if (typeof document === "undefined") return null;
    return ReactDOM.createPortal(
        <div
            className="absolute top-0 bottom-0 w-full"
            style={{
                backgroundImage: `url("../src/assets/universe-2.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="w-full max-w-[800px] mx-auto bg-slate-800 shadow-md px-8 py-2 lg:mt-[120px] mt-[128px] bg-opacity-30 rounded-lg">
                <div className="flex flex-col mt-1 mb-5">
                    <h1 className="mb-5 text-3xl font-semibold text-white">
                        Welcome to AzureMovies!
                    </h1>
                    <p className="text-base font-medium leading-relaxed text-gray-200">
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
