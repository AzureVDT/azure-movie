import React from "react";
import { onAuthStateChanged } from "firebase/auth";
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
    const [togglePassword, setTogglePassword] = React.useState();
    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUserInfo(user);
        });
    }, []);
    const contextValues = {
        isSuccess,
        values,
        userInfo,
        setIsSuccess,
        setValues,
        setUserInfo,
        togglePassword,
        setTogglePassword,
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
