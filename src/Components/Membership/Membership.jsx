import { Link } from "react-router-dom";
import SectionTitle from "../Shared/SectionTitle";
import Sliver from "../../assets/Membership/BestSilver.png";
import Gold from "../../assets/Membership/Membership-Gold.png";
import Platinium from "../../assets/Membership/Platinium.jpg";

const Membership = () => {
  return (
    <div className="mt-10">
      <SectionTitle
        heading="Membership"
        subHeading="Upgrade Your Membership for Better Meals"
      />
      <div className="mt-10">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="border lg:col-span-1 col-span-2 bg-gray-50 border-gray-200 rounded-lg p-4 text-center">
            <h2 className="text-lg font-semibold mb-2">Silver Medal</h2>
            <img src={Sliver} alt="Silver" className="mx-auto mb-4 w-60 h-60" />
            <div className="text-2xl font-bold mb-4">$9.99</div>
            <div className="text-left mb-4">
              <ul className="text-center">
                <h1> Access to weekly meal plans</h1>
                <h1>Discounts at partner restaurants</h1>
                <h1>Monthly recipe book</h1>
              </ul>
            </div>
            <Link
              to="/checkout/silver"
              className="text-center mt-3 p-2 border-b-4  border-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-white rounded-xl my-2 hover:border-gray-500 transition-all duration-300 ease-in-out"
            >
              Upgrade Now
            </Link>
          </div>

          <div className="border lg:col-span-1 col-span-2 bg-orange-50 border-gray-200 rounded-lg p-4 text-center">
            <h2 className="text-lg font-semibold mb-2">Gold Medal</h2>
            <img src={Gold} alt="Gold" className="mx-auto mb-4 w-60 h-60" />
            <div className="text-2xl font-bold mb-4">$19.99</div>
            <div className="text-left mb-4">
              <ul className="text-center">
                <h1>Access to weekly meal plans</h1>
                <h1>Discounts at partner restaurants</h1>
                <h1>Monthly recipe book</h1>
                <h1>Personalized nutrition consultation</h1>
              </ul>
            </div>
            <Link
              to="/checkout/gold"
              className="text-center mt-3 p-2 border-b-4 border-orange-200 bg-orange-100 hover:bg-orange-200 hover:text-white rounded-xl my-2 hover:border-orange-300 transition-all duration-300 ease-in-out"
            >
              Upgrade Now
            </Link>
          </div>

          <div className="border col-span-2 w-full bg-green-50 lg:w-3/4 mx-auto border-gray-200 rounded-lg p-4 text-center">
            <h2 className="text-lg font-semibold mb-2">Platinum Medal</h2>
            <img
              src={Platinium}
              alt="Platinum"
              className="mx-auto mb-4 w-60 h-60"
            />
            <div className="text-2xl font-bold mb-4">$29.99</div>
            <div className="text-left mb-4">
              <ul className="text-center">
                <h1> Access to weekly meal plans</h1>
                <h1> Discounts at partner restaurants</h1>
                <h1>Monthly recipe book</h1>
                <h1>Personalized nutrition consultation</h1>
                <h1>Priority support</h1>
              </ul>
            </div>
            <Link
              to="/checkout/platinum"
              className="text-center mt-3 p-2 border-b-4 border-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-white rounded-xl my-2 hover:border-gray-600 transition-all duration-300 ease-in-out"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
