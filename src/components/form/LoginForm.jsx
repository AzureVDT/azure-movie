import FormGroup from "./FormGroup";
import Button from "../button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
    const {
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        control,
    } = useForm({
        resolver: yupResolver(schemaValidation),
    });
    const onHandleSubmit = (values) => {
        if (!isValid) return;
        console.log(values);
        return alert("Login successfully");
    };
    return (
        <form onSubmit={handleSubmit(onHandleSubmit)} className="mt-5 mb-5">
            <FormGroup
                type="email"
                placeholder="Enter your email address"
                name="email"
                id="email"
                label="Email"
                control={control}
            >
                {errors?.email && (
                    <div className="text-sm text-primary">
                        {errors.email.message}
                    </div>
                )}
            </FormGroup>
            <FormGroup
                type="password"
                placeholder="Enter your password"
                name="password"
                id="password"
                label="Password"
                control={control}
            >
                {errors?.password && (
                    <div className="text-sm text-primary">
                        {errors.password.message}
                    </div>
                )}
            </FormGroup>
            <Button
                type="submit"
                className={`w-full p-3 font-medium text-white ${
                    isSubmitting ? "opacity-20 invisible" : ""
                }`}
                disabled={isSubmitting}
            >
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
