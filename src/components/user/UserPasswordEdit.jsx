import React from "react";
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/auth-context";
import IconEyeOpen from "../icon/IconEyeOpen";
import IconEyeClose from "../icon/IconEyeClose";

const UserPasswordEdit = () => {
    const [showEdit, setShowEdit] = React.useState(false);
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const { togglePassword, setTogglePassword } = useAuth();
    const handleUpdatePassword = async () => {
        try {
            const user = auth.currentUser;
            const userId = localStorage.getItem("userId");
            const credential = EmailAuthProvider.credential(
                user?.email,
                oldPassword
            );
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, newPassword);
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
                password: newPassword,
            });
            toast.success("Update password completely!", {
                delay: 0,
                pauseOnHover: false,
            });
            setShowEdit(false);
        } catch (error) {
            toast.error(
                "The old password is incorrect. Please enter the correct password!",
                {
                    delay: 0,
                    pauseOnHover: false,
                }
            );
        }
    };
    return (
        <>
            <h1 className="text-3xl mb-5 font-semibold text-center ml-[300px]">
                PASSWORD
            </h1>
            <div className="flex flex-col gap-y-5">
                <div>
                    <h2 className="text-2xl font-semibold mb-3">
                        User Password
                    </h2>
                    <p className="text-base">
                        Here you can change your current password
                    </p>
                </div>
                <div>
                    <div className="text-xl font-semibold mb-3">Password</div>
                    <div className="flex items-center justify-between">
                        {showEdit ? (
                            <div className="flex flex-col items-center justify-center gap-y-5 w-full">
                                <input
                                    type="text"
                                    placeholder="Enter your old password"
                                    className="p-3 w-full max-w-[500px] border border-gray-200 rounded-lg"
                                    onChange={(e) =>
                                        setOldPassword(e.target.value)
                                    }
                                />
                                <div className="relative w-full">
                                    <input
                                        type={
                                            togglePassword ? "text" : "password"
                                        }
                                        placeholder="Enter your new password"
                                        className="p-3 w-full max-w-[500px] border border-gray-200 rounded-lg"
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                    />
                                    {togglePassword ? (
                                        <IconEyeOpen
                                            className="input-icon"
                                            onClick={() =>
                                                setTogglePassword(false)
                                            }
                                        ></IconEyeOpen>
                                    ) : (
                                        <IconEyeClose
                                            className="input-icon"
                                            onClick={() =>
                                                setTogglePassword(true)
                                            }
                                        ></IconEyeClose>
                                    )}
                                </div>
                                <div>
                                    <button
                                        className="text-base text-white px-2 py-2 bg-primary rounded mr-5"
                                        onClick={() => setShowEdit(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="text-base text-white px-4 py-2 bg-primary-gradient rounded"
                                        onClick={handleUpdatePassword}
                                    >
                                        Finish
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <span className="text-base text-white">
                                Change your password here!
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

export default UserPasswordEdit;
