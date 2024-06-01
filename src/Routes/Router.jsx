import { createBrowserRouter } from "react-router-dom";
import ErrorElement from "../Pages/ErrorElement/ErrorElement";
import Home from "../Pages/Home/Home";
import MainPage from "../Pages/MainPage/MainPage";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import Meals from "../Pages/Meals/Meals";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals";
import MealsDetails from "../Pages/Meals/MealsDetails";

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
        path: '/register',
        element : <Register></Register>
      },
      {
        path: '/login',
        element : <Login></Login>
      },
      {
        path:'/meals',
        element : <Meals></Meals>
      },
      {
        path:'/upcomingMeals',
        element : <UpcomingMeals></UpcomingMeals>
      },
      {
        path : '/meals/:id',
        element : <MealsDetails></MealsDetails>
      }
    ],
  },
]);
