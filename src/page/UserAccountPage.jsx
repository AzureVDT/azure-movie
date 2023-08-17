import UserGeneral from "../components/user/UserGeneral";
import React from "react";
import UserPasswordEdit from "../components/user/UserPasswordEdit";

const UserAccountPage = () => {
    const [showGeneralPage, setShowGeneralPage] = React.useState(true);
    const [showPasswordPage, setShowPasswordPage] = React.useState(false);
    return (
        <div
            className="absolute top-0 w-full h-full"
            style={{
                backgroundImage: `url("../src/assets/universe-2.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="flex items-center page-container text-white gap-x-10 mt-[140px] relative">
                <div className="border-r border-gray-200 flex items-center flex-col w-full max-w-[400px] h-[300px]">
                    <span className="text-white text-2xl font-semibold mb-5">
                        ACCOUNT
                    </span>
                    <span
                        className={`text-base mb-3 cursor-pointer ${
                            showGeneralPage ? "text-primary" : ""
                        }`}
                        onClick={() => {
                            setShowGeneralPage(true);
                            setShowPasswordPage(false);
                        }}
                    >
                        General
                    </span>
                    <span
                        className={`text-base mb-3 cursor-pointer ${
                            showPasswordPage ? "text-primary" : ""
                        }`}
                        onClick={() => {
                            setShowPasswordPage(true);
                            setShowGeneralPage(false);
                        }}
                    >
                        Password
                    </span>
                </div>
                <div>
                    {showGeneralPage && <UserGeneral></UserGeneral>}
                    {showPasswordPage && <UserPasswordEdit></UserPasswordEdit>}
                </div>
            </div>
        </div>
    );
};

export default UserAccountPage;
