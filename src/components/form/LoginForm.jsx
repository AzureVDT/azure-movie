import FormGroup from "./FormGroup";
import Button from "../button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import React from "react";
import { useAuth } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import LoadingSpinner from "../loading/LoadingSpinner";
import { useMovie } from "../../contexts/movie-context";
const schemaValidation = yup.object({
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your password must be at least 8 character or greater")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            {
                message:
                    "Your password must have at least with one lowercase, uppercase, digit and special character",
            }
        )
        .required("Please enter your password"),
});
const LoginForm = () => {
    const navigate = useNavigate();
    const { userInfo } = useAuth();
    const { setShowLogin } = useMovie();
    const {
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        control,
    } = useForm({
        resolver: yupResolver(schemaValidation),
    });
    const onHandleSubmit = async (values) => {
        if (!isValid) return;
        await signInWithEmailAndPassword(auth, values.email, values.password);
        setShowLogin(false);
        toast.success("Login successfully");
        navigate("/");
    };
    React.useEffect(() => {
        document.title = "Login Page";
        if (userInfo?.email) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0)
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
                delay: 0,
                className: "",
            });
    }, [errors]);
    return (
        <form onSubmit={handleSubmit(onHandleSubmit)} className="mt-5 mb-5">
            <FormGroup
                type="email"
                placeholder="Enter your email address"
                name="email"
                id="email"
                label="Email"
                control={control}
            ></FormGroup>
            <FormGroup
                type="password"
                placeholder="Enter your password"
                name="password"
                id="password"
                label="Password"
                control={control}
            ></FormGroup>
            <Button
                type="submit"
                className={`w-full h-[48px] mt-5 p-3 font-medium text-white flex items-center justify-center ${
                    isSubmitting ? "opacity-20" : ""
                }`}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <LoadingSpinner
                        size="30px"
                        borderSize="3px"
                    ></LoadingSpinner>
                ) : (
                    <span>Login</span>
                )}
            </Button>
        </form>
    );
};

export default LoginForm;
