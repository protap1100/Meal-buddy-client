import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-green-200 text-white py-4 px-6 h-full">
      <div className="flex flex-col">
        <NavLink
          to="/dashboard/manageUsers"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2 rounded-xl border-b-2 transition-all duration-700 ease-in-out border-black mt-2 hover:bg-orange-300"
              : "mt-3 transition-all duration-700 ease-in-out  bg-violet-200  p-2 rounded-xl hover:bg-violet-300 border-b-2 border-black"
          }
        >
          Manage Users
        </NavLink>
        <NavLink
          to="/dashboard/feedback"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2 rounded-xl border-b-2 transition-all duration-700 ease-in-out border-black mt-2 hover:bg-orange-300"
              : "mt-3 transition-all duration-700 ease-in-out  bg-violet-200  p-2 rounded-xl hover:bg-violet-300 border-b-2 border-black"
          }
        >
          Feedback
        </NavLink>

        <NavLink
          to="/dashboard/upcomingMeals"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2 rounded-xl border-b-2 transition-all duration-700 ease-in-out border-black mt-2 hover:bg-orange-300"
              : "mt-3 transition-all duration-700 ease-in-out  bg-violet-200  p-2 rounded-xl hover:bg-violet-300 border-b-2 border-black"
          }
        >
          Upcoming Meals
        </NavLink>
        <NavLink
          to="/dashboard/allMeals"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2 rounded-xl border-b-2 transition-all duration-700 ease-in-out border-black mt-2 hover:bg-orange-300"
              : "mt-3 transition-all duration-700 ease-in-out  bg-violet-200  p-2 rounded-xl hover:bg-violet-300 border-b-2 border-black"
          }
        >
          All Meals
        </NavLink>
        <NavLink
          to="/dashboard/reviews"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2 rounded-xl border-b-2 transition-all duration-700 ease-in-out border-black mt-2 hover:bg-orange-300"
              : "mt-3 transition-all duration-700 ease-in-out  bg-violet-200  p-2 rounded-xl hover:bg-violet-300 border-b-2 border-black"
          }
        >
          Reviews
        </NavLink>
        <NavLink
          to="/dashboard/servedMeals"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2 rounded-xl border-b-2 transition-all duration-700 ease-in-out border-black mt-2 hover:bg-orange-300"
              : "mt-3 transition-all duration-700 ease-in-out  bg-violet-200  p-2 rounded-xl hover:bg-violet-300 border-b-2 border-black"
          }
        >
          Server Meals
        </NavLink>
        <NavLink
          to="/dashboard/addUpcomingMeals"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2 rounded-xl border-b-2 transition-all duration-700 ease-in-out border-black mt-2 hover:bg-orange-300"
              : "mt-3 transition-all duration-700 ease-in-out  bg-violet-200  p-2 rounded-xl hover:bg-violet-300 border-b-2 border-black"
          }
        >
          Add Upcoming Meals
        </NavLink>
        <NavLink
          to="/dashboard/addMeals"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-orange-400 p-2 rounded-xl border-b-2 transition-all duration-700 ease-in-out border-black mt-2 hover:bg-orange-300"
              : "mt-3 transition-all duration-700 ease-in-out  bg-violet-200  p-2 rounded-xl hover:bg-violet-300 border-b-2 border-black"
          }
        >
          Add Meals
        </NavLink>
      </div>
    </nav>
  );
};

export default AdminNavbar;
