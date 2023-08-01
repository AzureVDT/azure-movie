import React from "react";

const useDebounce = (initializeValue = "", delay = 1000) => {
    const [debounceValue, setDebounceValue] = React.useState(initializeValue);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(initializeValue);
        }, delay);
        return () => {
            clearTimeout(timer);
        };
    }, [delay, initializeValue]);
    return debounceValue;
};

export default useDebounce;
