import { Outlet } from "react-router-dom";
import Navbar from "../SharedPage.jsx/Navbar";
import Footer from "../SharedPage.jsx/Footer";

const MainPage = () => {
  return (
    <div className="container mx-auto">
      <div className="h-16">
        <Navbar></Navbar>
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainPage;
