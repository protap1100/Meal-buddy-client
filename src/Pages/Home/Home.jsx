import { Link } from "react-router-dom";
import Membership from "../../Components/Membership/Membership";
import Meals from "../Meals/Meals";
import Footer from "../SharedPage.jsx/Footer";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Meals limit={6}>
        <Link
          to="/meals"
          className="p-2 hover:bg-blue-950 hover:text-white rounded-xl border-b-4 border-blue-950"
        >
          Show All Data
        </Link>
      </Meals>
      <Membership></Membership>
      <Footer></Footer>
    </div>
  );
};

export default Home;
