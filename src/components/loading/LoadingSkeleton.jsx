import PropTypes from "prop-types";

const LoadingSkeleton = (props) => {
    return <div className={`skeleton ${props.className}`}></div>;
};

LoadingSkeleton.propTypes = {
    className: PropTypes.string.isRequired,
};

export default LoadingSkeleton;
