import { Outlet } from "react-router-dom";
import Navbar from "../SharedPage.jsx/Navbar";

const MainPage = () => {
  return (
    <div className="container mx-auto">
      <div className="h-16">
        <Navbar></Navbar>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default MainPage;
