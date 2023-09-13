import UserGeneral from "../components/user/UserGeneral";
import React from "react";
import UserPasswordEdit from "../components/user/UserPasswordEdit";
import useWindowSize from "../hooks/useWindowSize";
import PropTypes from "prop-types";

const UserAccountPage = () => {
    const windowSize = useWindowSize();
    const isMobile = windowSize.width < 640;
    const [showGeneralPage, setShowGeneralPage] = React.useState(true);
    const [showPasswordPage, setShowPasswordPage] = React.useState(false);
    return (
        <div
            className="absolute top-0 w-full h-full overflow-hidden"
            style={{
                backgroundImage: `url("../src/assets/universe-2.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="flex items-center page-container text-white gap-x-10 mt-[140px] relative">
                {isMobile ? (
                    <MobileLayout
                        setShowGeneralPage={setShowGeneralPage}
                        showGeneralPage={showGeneralPage}
                        setShowPasswordPage={setShowPasswordPage}
                        showPasswordPage={showPasswordPage}
                    ></MobileLayout>
                ) : (
                    <DeskTopLayout
                        setShowGeneralPage={setShowGeneralPage}
                        showGeneralPage={showGeneralPage}
                        setShowPasswordPage={setShowPasswordPage}
                        showPasswordPage={showPasswordPage}
                    ></DeskTopLayout>
                )}
            </div>
        </div>
    );
};

const DeskTopLayout = ({
    showGeneralPage,
    setShowGeneralPage,
    showPasswordPage,
    setShowPasswordPage,
}) => {
    return (
        <>
            <div className="border-r border-gray-200 flex items-center flex-col w-full max-w-[400px] h-[300px]">
                <span className="mb-5 text-2xl font-semibold text-white">
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
            <div className="flex flex-col flex-1">
                {showGeneralPage && <UserGeneral></UserGeneral>}
                {showPasswordPage && <UserPasswordEdit></UserPasswordEdit>}
            </div>
        </>
    );
};

const MobileLayout = ({
    showGeneralPage,
    setShowGeneralPage,
    showPasswordPage,
    setShowPasswordPage,
}) => {
    return (
        <div className="flex flex-col flex-1 p-3">
            <div className="flex items-center mx-auto gap-x-10">
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
            <div className="flex flex-col flex-1">
                {showGeneralPage && <UserGeneral></UserGeneral>}
                {showPasswordPage && <UserPasswordEdit></UserPasswordEdit>}
            </div>
        </div>
    );
};

MobileLayout.propTypes,
    (DeskTopLayout.propTypes = {
        showGeneralPage: PropTypes.bool,
        showPasswordPage: PropTypes.bool,
        setShowGeneralPage: PropTypes.func,
        setShowPasswordPage: PropTypes.func,
    });

export default UserAccountPage;
