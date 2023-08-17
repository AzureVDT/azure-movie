import React from "react";

const useHover = () => {
    const [hovered, setHovered] = React.useState(false);
    const nodeRef = React.useRef(null);
    React.useEffect(() => {
        const dom = nodeRef.current;
        const handleMouseOver = () => {
            setHovered(true);
        };
        const handleMouseOut = () => {
            setHovered(false);
        };
        if (dom) {
            dom.addEventListener("mouseover", handleMouseOver);
            dom.addEventListener("mouseout", handleMouseOut);
        }
        return () => {
            dom?.removeEventListener("mouseover", handleMouseOver);
            dom?.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);
    return {
        hovered,
        nodeRef,
    };
};

export default useHover;
