import PropTypes from "prop-types";
import { useController } from "react-hook-form";
const FormGroup = ({ control, children, ...props }) => {
    const { field } = useController({
        control,
        name: props.name,
        defaultValue: "",
    });
    return (
        <div className="flex flex-col gap-y-2 mb-5 text-white">
            <label htmlFor={props.name} className="cursor-pointer">
                {props.label}
            </label>
            <div className="relative">
                <input
                    {...props}
                    {...field}
                    className="w-full border border-gray-200 p-3 rounded-lg focus:border-primary"
                    autoComplete="off"
                />
                {children}
            </div>
        </div>
    );
};
FormGroup.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default FormGroup;
