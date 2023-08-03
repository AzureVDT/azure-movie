import PropTypes from "prop-types";
const Button = ({
    onClick,
    className,
    children,
    type = "button",
    bgColor = "primary",
    defaultStyle = false,
}) => {
    let bgClassName = "bg-primary";
    switch (bgColor) {
        case "primary":
            bgClassName = "bg-primary";
            break;
        case "secondary":
            bgClassName = "bg-secondary";
            break;
        default:
            break;
    }
    return (
        <button
            type={type}
            className={`${
                defaultStyle ? "py-3 px-6 w-full mt-auto" : ""
            } rounded-lg capitalize hover:bg-secondary ${bgClassName} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
    bgColor: PropTypes.string,
    defaultStyle: PropTypes.bool,
};

export default Button;
