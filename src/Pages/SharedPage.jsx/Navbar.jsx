import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/Logo1.png";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Others/Loading";
import { Tooltip as Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";
import useUser from "../../Hooks/useUser";
import useAdmin from "../../Hooks/useAdmin";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [singleUser, loading3] = useUser();
  // console.log(singleUser);
  const [isAdmin,adminLoading] = useAdmin();
  // console.log(isAdmin)
  useEffect(() => {
    setOpen(false);
  }, [location]);
  // console.log(user);
  const router = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/meals", name: "Meals" },
    { id: 2, path: "/upcomingMeals", name: "Upcoming Meals" },
    { id: 2, path: "/contactUs", name: "Contact" },
  ];

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logout Successful",
          text: "You Have Successfully Logged Out",
          icon: "success",
        });
        navigate(location?.state ? location.state : "/");
      })
      .then((error) => console.log(error));
  };

  if (loading || loading3 || adminLoading) {
    <Loading></Loading>;
  }
  // loading && <p>loading.....</p>

  return (
    <div className="fixed w-full h-16 mx-auto container bg-white shadow-md z-50">
      <nav className="flex items-center justify-between p-4 md:px-8">
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-3xl focus:outline-none"
          >
            {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </button>
        </div>
        <div className="hidden lg:block">
          <Link to="/">
            <img src={logo} className="h-8 w-20 rounded" alt="" />{" "}
          </Link>
        </div>
        <div className="font-bold">
          <ul
            className={`md:flex items-center md:gap-8 absolute md:static top-16 left-0 w-full bg-white md:w-auto md:bg-transparent transition-all duration-500 ease-in-out ${
              open
                ? "translate-x-0 w-2/4"
                : "-translate-x-full md:translate-x-0"
            }`}
          >
            {router.map((route, index) => (
              <li
                key={index}
                className={`md:border-none ${open ? "mt-4" : "mt-0"}`}
              >
                <NavLink
                  to={route.path}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? `${
                          open ? "p-2 w-1/3 " : "p-2 w-full "
                        }bg-gray-200 border-b-2 border-black rounded font-bold`
                      : `block p-2 rounded font-bold text-gray-700 hover:bg-gray-200 hover:border-black transition-all duration-1000 ease-in-out ${
                          open ? "" : "border-none"
                        } md:hover:text-blue-600 `
                  }
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="font-bold flex gap-5 justify-center items-center">
          <div className="flex items-center justify-center">
            {user ? (
              <>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <div tabIndex={0} role="button" className="text-2xl">
                    <GiHamburgerMenu></GiHamburgerMenu>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
                  >
                    {singleUser?.role === "admin" && isAdmin ? (
                      <li>
                        <Link to="/dashboard">DashBoard</Link>
                      </li>
                    ) : (
                      <li>
                        <Link to="/userDashboard/userProfile">User Dashboard</Link>
                      </li>
                    )}
                    <li>
                      <Link to="/myProfile">About Me</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="p-2 bg-button hover:bg-hover rounded text-white"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          {user && (
            <div className="">
              <Tooltip id="my-tooltip"> </Tooltip>
              <a
                data-tooltip-id="my-tooltip"
                data-tooltip-content={user?.displayName}
              >
                {user ? (
                  <img
                    src={user?.photoURL}
                    className="w-8 h-8 rounded"
                    alt=""
                  />
                ) : (
                  <div className="text-xl text-blue-500 rounded-xl">
                    <FaUser></FaUser>
                  </div>
                )}
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
