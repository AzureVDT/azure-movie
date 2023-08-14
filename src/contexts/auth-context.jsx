import React from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
const AuthContext = React.createContext();

export function AuthProvider(props) {
    const [values, setValues] = React.useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState("");
    const handleSignOut = () => {
        signOut(auth);
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        const cred = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        setUserInfo(cred);
        console.log("Login successfully");
    };
    const contextValues = {
        isSuccess,
        values,
        userInfo,
        setIsSuccess,
        setValues,
        setUserInfo,
        handleSignOut,
        handleLogin,
    };
    return (
        <AuthContext.Provider
            value={contextValues}
            {...props}
        ></AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = React.useContext(AuthContext);
    if (typeof context === "undefined")
        throw new Error("useAuth must be used within AuthProvider");
    return context;
}
