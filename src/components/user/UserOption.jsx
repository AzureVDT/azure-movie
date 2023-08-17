import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/auth-context";
import useHover from "../../hooks/useHover";
import { useNavigate } from "react-router-dom";

const UserOption = () => {
    const { hovered, nodeRef } = useHover();
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    return (
        <div
            className="relative z-[9999] cursor-pointer border border-secondary hover:bg-secondary rounded px-4 py-2"
            ref={nodeRef}
        >
            <span>{userInfo?.displayName}</span>
            <div
                className={`absolute top-0 left-0 z-[1000] w-[180px] -translate-x-4 text-primary text-base font-medium rounded mt-10 py-6 bg-transparent ${
                    hovered ? "" : "hidden"
                }`}
            >
                <div
                    className="w-full hover:text-white hover:bg-primary-gradient px-4 py-2 bg-white"
                    onClick={() => navigate("/profile")}
                >
                    Your Account
                </div>
                <div className="w-full hover:text-white hover:bg-primary-gradient px-4 py-2 bg-white">
                    Setting
                </div>
                <div
                    className="w-full hover:text-white hover:bg-primary-gradient px-4 py-2 bg-white"
                    onClick={() => {
                        signOut(auth);
                    }}
                >
                    Sign Out
                </div>
            </div>
        </div>
    );
};
UserOption.propTypes = {
    className: PropTypes.string,
};

export default UserOption;
