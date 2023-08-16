import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import PropTypes from "prop-types";

const UserOption = ({ className }) => {
    return (
        <div className={className}>
            <div className="w-full hover:text-white hover:bg-primary-gradient border border-primary px-4 py-2">
                Your Account
            </div>
            <div className="w-full hover:text-white hover:bg-primary-gradient border border-primary px-4 py-2">
                Setting
            </div>
            <div
                className="w-full hover:text-white hover:bg-primary-gradient border border-primary px-4 py-2"
                onClick={() => {
                    signOut(auth);
                }}
            >
                Sign Out
            </div>
        </div>
    );
};
UserOption.propTypes = {
    className: PropTypes.string,
};

export default UserOption;
