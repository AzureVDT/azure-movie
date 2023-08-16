/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#F62682",
                secondary: "#6F5CF1",
                tertiary: "#2EBAC1",
                quaternary: "#A4D96C",
            },
            backgroundImage: {
                "primary-gradient": `linear-gradient(to right bottom, #2EBAC1, #A4D96C)`,
            },
        },
    },
    plugins: [],
};
