import { Outlet } from "react-router-dom";
import UserNavbar from "../UserNavbar.jsx/UserNavbar";

const UserLayout = () => {
    return (
        <div className="container mx-auto">
            <UserNavbar></UserNavbar>
            <Outlet></Outlet>
        </div>
    );
};

export default UserLayout;