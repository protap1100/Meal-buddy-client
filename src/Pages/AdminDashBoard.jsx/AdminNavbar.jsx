import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FcFeedback } from "react-icons/fc";
import { GiMeal } from "react-icons/gi";
import { MdOutlineNoMeals } from "react-icons/md";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-green-200 text-white py-4 pr-2 h-full">
      <div className="flex flex-col">
      <NavLink
          to="/dashboard/adminHome"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2  border-b-2 transition-all duration-700 ease-in-out flex items-center gap-2 border-black mt-2 hover:bg-orange-100"
              : "mt-3 transition-all duration-700 ease-in-out  bg-orange-600 flex items-center gap-2 p-2  hover:bg-violet-100 border-b-2 border-black"
          }
        >
          Home
          <FaUser></FaUser>
        </NavLink>
        <NavLink
          to="/dashboard/manageUsers"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2  border-b-2 transition-all duration-700 ease-in-out flex items-center gap-2 border-black mt-2 hover:bg-orange-100"
              : "mt-3 transition-all duration-700 ease-in-out  bg-orange-600 flex items-center gap-2 p-2  hover:bg-violet-100 border-b-2 border-black"
          }
        >
          Manage Users
          <FaUser></FaUser>
        </NavLink>
        <NavLink
          to="/dashboard/feedback"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2  border-b-2 transition-all duration-700 ease-in-out flex items-center gap-2 border-black mt-2 hover:bg-orange-100"
              : "mt-3 transition-all duration-700 ease-in-out flex items-center gap-2  bg-orange-600  p-2  hover:bg-violet-100 border-b-2 border-black"
          }
        >
          Feedback
          <FaMessage></FaMessage>
        </NavLink>

        <NavLink
          to="/dashboard/upcomingMeals"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2  border-b-2 transition-all duration-700 ease-in-out flex items-center gap-2 border-black mt-2 hover:bg-orange-100"
              : "mt-3 transition-all duration-700 ease-in-out  bg-orange-600 flex items-center gap-2  p-2  hover:bg-violet-100 border-b-2 border-black"
          }
        >
          Upcoming Meals
          <MdOutlineNoMeals></MdOutlineNoMeals> 
        </NavLink>

        <NavLink
          to="/dashboard/allMeals"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2  border-b-2 transition-all duration-700 ease-in-out flex items-center gap-2 border-black mt-2 hover:bg-orange-100"
              : "mt-3 transition-all duration-700 ease-in-out flex items-center gap-2  bg-orange-600  p-2  hover:bg-violet-100 border-b-2 border-black"
          }
        >
          All Meals
          <MdOutlineNoMeals></MdOutlineNoMeals> 
        </NavLink>
        <NavLink
          to="/dashboard/reviews"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2  border-b-2 transition-all duration-700 ease-in-out flex items-center gap-2 border-black mt-2 hover:bg-orange-100"
              : "mt-3 transition-all duration-700 ease-in-out flex items-center gap-2  bg-orange-600  p-2  hover:bg-violet-100 border-b-2 border-black"
          }
        >
          Reviews
          <FcFeedback></FcFeedback>
        </NavLink>
        <NavLink
          to="/dashboard/servedMeals"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2  border-b-2 transition-all duration-700 ease-in-out flex items-center gap-2 border-black mt-2 hover:bg-orange-100"
              : "mt-3 transition-all duration-700 ease-in-out  flex items-center gap-2 bg-orange-600  p-2  hover:bg-violet-100 border-b-2 border-black"
          }
        >
          Served Meals
          <GiMeal></GiMeal> 
        </NavLink>
        <NavLink
          to="/dashboard/addUpcomingMeals"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2  border-b-2 transition-all duration-700 ease-in-out flex items-center gap-2 border-black mt-2 hover:bg-orange-100"
              : "mt-3 transition-all duration-700 ease-in-out flex items-center gap-2  bg-orange-600  p-2  hover:bg-violet-100 border-b-2 border-black"
          }
        >
          Add Upcoming Meals
          <MdOutlineNoMeals></MdOutlineNoMeals>
        </NavLink>
        <NavLink
          to="/dashboard/addMeals"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2  border-b-2 transition-all duration-700 ease-in-out flex items-center gap-2 border-black mt-2 hover:bg-orange-100"
              : "mt-3 transition-all duration-700 ease-in-out flex items-center gap-2  bg-orange-600  p-2  hover:bg-violet-100 border-b-2 border-black"
          }
        >
          Add Meals
          <MdOutlineNoMeals></MdOutlineNoMeals>
        </NavLink>
      </div>
    </nav>
  );
};

export default AdminNavbar;
