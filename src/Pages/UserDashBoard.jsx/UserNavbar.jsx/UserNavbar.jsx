import {
  FaBook,
  FaHistory,
  FaHome,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const UserNavbar = () => {
  return (
    <div className="bg-gray-800 p-4 shadow-lg">
      <nav className="flex flex-wrap justify-around items-center text-white">
        <NavLink
          to="/userDashboard/userHome"
          className={({ isActive }) =>
            `${
              isActive ? "border border-black" : ""
            } flex border-b-4 rounded border-white flex-col justify-center items-center hover:text-yellow-400 p-2 m-2`
          }
        >
          <FaHome className="h-6 w-6" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/userDashboard/userProfile"
          className={({ isActive }) =>
            `${
              isActive ? "border border-black" : ""
            } flex border-b-4 rounded border-white flex-col justify-center items-center hover:text-yellow-400 p-2 m-2`
          }
        >
          <FaUser className="h-6 w-6" />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/userDashboard/cart"
          className={({ isActive }) =>
            `${
              isActive ? "border border-black" : ""
            } flex border-b-4 rounded border-white flex-col justify-center items-center hover:text-yellow-400 p-2 m-2`
          }
        >
          <FaShoppingBag className="h-6 w-6" />
          <span>Cart</span>
        </NavLink>
        <NavLink
          to="/userDashboard/review"
          className={({ isActive }) =>
            `${
              isActive ? "border border-black" : ""
            } flex border-b-4 rounded border-white flex-col justify-center items-center hover:text-yellow-400 p-2 m-2`
          }
        >
          <FaBook className="h-6 w-6" />
          <span>Review</span>
        </NavLink>
        <NavLink
          to="/userDashboard/paymentHistory"
          className={({ isActive }) =>
            `${
              isActive ? "border border-black" : ""
            } flex border-b-4 rounded border-white flex-col justify-center items-center hover:text-yellow-400 p-2 m-2`
          }
        >
          <FaHistory className="h-6 w-6" />
          <span>Payment History</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "border border-black" : ""
            } flex border-b-4 rounded border-white flex-col justify-center items-center hover:text-yellow-400 p-2 m-2`
          }
        >
          <FaHome className="h-6 w-6" />
          <span>Main Home</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default UserNavbar;
