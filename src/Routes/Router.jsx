import { createBrowserRouter } from "react-router-dom";
import ErrorElement from "../Pages/ErrorElement/ErrorElement";
import Home from "../Pages/Home/Home";
import MainPage from "../Pages/MainPage/MainPage";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import Meals from "../Pages/Meals/Meals";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals";
import MealsDetails from "../Pages/Meals/MealsDetails";
import UpdateProfile from "../Pages/Authentication/UpdateProfile";
import ContactUs from "../Pages/Contact/ContactUs";
import AdminHome from "../Pages/AdminDashBoard.jsx/AdminHome";
import AdminDashboard from "../Pages/AdminDashBoard.jsx/AdminDashboard";
import Users from "../Pages/DashboardPages/Users";
import Feedback from "../Pages/DashboardPages/Feedback";
import AllMeals from "../Pages/DashboardPages/AllMeals";
import Review from "../Pages/DashboardPages/Review";
import ServedMeals from "../Pages/DashboardPages/ServedMeals";
import AddMeals from "../Pages/DashboardPages/AddMeals";
import AddUpcomingMeals from "../Pages/DashboardPages/AddUpcomingMeals";
import AdminUpcomingMeals from "../Pages/DashboardPages/AdminUpcomingMeals";
import Checkout from "../Pages/Checkout/Checkout";
import UserLayout from "../Pages/UserDashBoard.jsx/UserLayOut.jsx/UserLayout";
import UserHome from "../Pages/UserDashBoard.jsx/UserHome.jsx/UserHome";
import UserCart from "../Pages/UserDashBoard.jsx/UserCart/UserCart";
import UsersReview from "../Pages/UserDashBoard.jsx/UsersReview/UsersReview";
import UserProfile from "../Pages/UserDashBoard.jsx/UserProfile/UserProfile";
import UserPaymentHistory from "../Pages/UserDashBoard.jsx/UserPaymentHistory/UserPaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
    errorElement: <ErrorElement></ErrorElement>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/myProfile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/meals",
        element: <Meals></Meals>,
      },
      {
        path: "/upcomingMeals",
        element: <UpcomingMeals></UpcomingMeals>,
      },
      {
        path: "/mealDetails/:id",
        element: <MealsDetails></MealsDetails>,
      },
      {
        path: "/checkout/:packageName",
        element: <Checkout></Checkout>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <AdminDashboard></AdminDashboard>,
    children: [
      {
        path : '/dashboard',
        element : <AdminHome></AdminHome>
      },
      {
        path : '/dashboard/manageUsers',
        element : <Users></Users>
      },
      {
        path: '/dashboard/feedback',
        element : <Feedback></Feedback>
      },
      {
        path:'/dashboard/allMeals',
        element : <AllMeals></AllMeals>
      },
      {
        path:'/dashboard/upcomingMeals',
        element : <AdminUpcomingMeals></AdminUpcomingMeals>
      },
      {
        path:'/dashboard/reviews',
        element:<Review></Review>
      },
      {
        path:'/dashboard/servedMeals',
        element:<ServedMeals></ServedMeals>
      },
      {
        path:'/dashboard/addMeals',
        element:<AddMeals></AddMeals>
      },
      {
        path: '/dashboard/addUpcomingMeals',
        element : <AddUpcomingMeals></AddUpcomingMeals>
      },
    ],
  },
  {
    path:'/userDashboard',
    element : <UserLayout></UserLayout>,
    children : [
      {
        path : '/userDashboard/userHome',
        element : <UserHome></UserHome>
      },
      {
        path : '/userDashboard/cart',
        element : <UserCart></UserCart>
      },
      {
        path : '/userDashboard/review',
        element : <UsersReview></UsersReview>
      },
      {
        path:'/userDashboard/userProfile',
        element : <UserProfile></UserProfile>
      },
      {
        path:'/userDashboard/payment',
        element : <UserPaymentHistory></UserPaymentHistory>
      }
    ]
  }
]);
