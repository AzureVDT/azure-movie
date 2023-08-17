import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div
            className="absolute top-0 w-full h-full"
            style={{
                backgroundImage: `url("../src/assets/universe-2.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="h-full flex items-center justify-center flex-col text-white relative">
                <div className="page-content">
                    <img
                        src="/404.png"
                        alt="notfound"
                        className="max-w-[250px] m-[0_auto_20px]"
                    />
                    <h1 className="text-[60px] font-bold mb-5">{`404 - Looks like you're lost.`}</h1>
                    <p className="max-w-[800px] m-[0_auto_40px]">
                        Maybe this page used to exist or you just spelled
                        something wrong. Chances are your spelled something
                        wrong, so can you double check the URL?
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="inline-block text-white py-[15px] px-[30px] bg-primary-gradient rounded-lg font-medium"
                    >
                        Go back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
