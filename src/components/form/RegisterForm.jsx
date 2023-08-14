import FormGroup from "./FormGroup";
import Button from "../button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
        console.log("onHandleSubmit ~ values:", values);
        reset({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        });
    };
    return (
        <form onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="flex items-center justify-between">
                <FormGroup
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    id="firstName"
                    label="First name"
                    control={control}
                >
                    {errors?.firstName && (
                        <div className="text-sm text-primary">
                            {errors.firstName.message}
                        </div>
                    )}
                </FormGroup>
                <FormGroup
                    type="text"
                    placeholder="Enter your last name"
                    name="lastName"
                    id="lastName"
                    label="Last name"
                    control={control}
                >
                    {errors?.lastName && (
                        <div className="text-sm text-primary">
                            {errors.lastName.message}
                        </div>
                    )}
                </FormGroup>
            </div>
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
                className={`w-full mt-5 p-3 font-medium text-white ${
                    isSubmitting ? "opacity-20 invisible" : ""
                }`}
                disabled={isSubmitting}
            >
                Register
            </Button>
        </form>
    );
};

export default RegisterForm;
