import React from "react";
import { useAuth } from "../../contexts/auth-context";
import { auth } from "../../firebase-config";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const UserGeneral = () => {
    const { userInfo } = useAuth();
    const [showEdit, setShowEdit] = React.useState(false);
    const [displayValue, setDisplayValue] = React.useState("");
    const handleUpdateDisplayName = async () => {
        await updateProfile(auth.currentUser, {
            displayName: displayValue,
        });
        toast.success(
            "update display name successfully. Please refresh the website"
        );
        setShowEdit(false);
    };
    React.useEffect(() => {
        document.title = "User Profile";
    }, []);
    return (
        <>
            <h1 className="invisible mb-5 text-3xl font-semibold text-center lg:visible">
                GENERAL
            </h1>
            <div className="flex flex-col gap-y-5">
                <div>
                    <h2 className="mb-3 text-2xl font-semibold">
                        User Information
                    </h2>
                    <p className="text-base">
                        Here you edit public information about yourself
                    </p>
                </div>
                <div>
                    <div className="mb-3 text-xl font-semibold">Email</div>
                    <div className="text-base text-white select-none">
                        {userInfo?.email}
                    </div>
                </div>
                <div>
                    <div className="mb-3 text-xl font-semibold">
                        Display Name
                    </div>
                    <div className="flex items-center justify-between">
                        {showEdit ? (
                            <div className="flex items-center justify-center gap-x-5">
                                <input
                                    type="text"
                                    placeholder={userInfo?.displayName}
                                    className="p-3 w-full max-w-[300px] border border-gray-200 rounded-lg"
                                    onChange={(e) =>
                                        setDisplayValue(e.target.value)
                                    }
                                />
                                <button
                                    className="px-2 py-2 text-base text-white rounded bg-primary"
                                    onClick={() => setShowEdit(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 text-base text-white rounded bg-primary-gradient"
                                    onClick={handleUpdateDisplayName}
                                >
                                    Finish
                                </button>
                            </div>
                        ) : (
                            <span className="text-base text-white">
                                {userInfo?.displayName}
                            </span>
                        )}
                        <span
                            className="cursor-pointer"
                            onClick={() => setShowEdit(!showEdit)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserGeneral;
