import FormGroup from "./FormGroup";
import Button from "../button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import React from "react";
import LoadingSpinner from "../loading/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import IconEyeOpen from "../icon/IconEyeOpen";
import { useAuth } from "../../contexts/auth-context";
import IconEyeClose from "../icon/IconEyeClose";
const schemaValidation = yup.object({
    firstName: yup.string().required("Please enter your first name"),
    lastName: yup.string().required("Please enter your last name"),
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
const RegisterForm = () => {
    const { togglePassword, setTogglePassword } = useAuth();
    const navigate = useNavigate();
    const {
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
        control,
    } = useForm({
        resolver: yupResolver(schemaValidation),
    });
    const onHandleSubmit = async (values) => {
        if (!isValid) return;
        await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        const colRef = collection(db, "users");
        const docRef = await addDoc(colRef, {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
        });
        localStorage.setItem("userId", docRef.id);
        await updateProfile(auth.currentUser, {
            displayName: `${values.firstName} ${values.lastName}`,
        });
        toast.success("Register successfully");
        reset({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        });
        navigate("/");
    };
    React.useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0)
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
                delay: 0,
                className: "",
            });
    }, [errors]);
    React.useEffect(() => {
        document.title = "Register Page";
    }, []);
    return (
        <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete="off">
            <div className="flex items-center justify-between">
                <FormGroup
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    id="firstName"
                    label="First name"
                    control={control}
                ></FormGroup>
                <FormGroup
                    type="text"
                    placeholder="Enter your last name"
                    name="lastName"
                    id="lastName"
                    label="Last name"
                    control={control}
                ></FormGroup>
            </div>
            <FormGroup
                type="email"
                placeholder="Enter your email address"
                name="email"
                id="email"
                label="Email"
                control={control}
            ></FormGroup>
            <FormGroup
                type={togglePassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                id="password"
                label="Password"
                control={control}
            >
                {togglePassword ? (
                    <IconEyeOpen
                        className="input-icon"
                        onClick={() => setTogglePassword(false)}
                    ></IconEyeOpen>
                ) : (
                    <IconEyeClose
                        className="input-icon"
                        onClick={() => setTogglePassword(true)}
                    ></IconEyeClose>
                )}
            </FormGroup>
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
                    <span>Register</span>
                )}
            </Button>
        </form>
    );
};

export default RegisterForm;
