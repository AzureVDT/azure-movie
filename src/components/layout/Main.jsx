import Header from "./Header";
import { Outlet } from "react-router-dom";
const Main = () => {
    return (
        <>
            <Header></Header>
            <div className="w-full py-[80px]"></div>
            <Outlet></Outlet>
        </>
    );
};

export default Main;
