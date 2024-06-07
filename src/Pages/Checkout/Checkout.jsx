import { useParams } from "react-router-dom";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useUser from "../../Hooks/useUser";
import Loading from "../../Others/Loading";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
// import Swal from "sweetalert2";
import CheckoutForm from './CheckoutForm';



const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API);
// console.log(import.meta.env.VITE_PAYMENT_API)

const Checkout = () => {
  const { packageName } = useParams();
  const [singleUser, loading3] = useUser();

  let price = 0;
  let PackageDetails = "";
  let validity = 0;

  if (packageName === "silver") {
    price = 9.99;
    PackageDetails = "Upgrade Your Membership To Silver To Get Many Discount";
    validity = 4;
  } else if (packageName === "gold") {
    price = 19.99;
    PackageDetails = "Upgrade Your Membership To Gold To Get Many Discount";
    validity = 4;
  } else if (packageName === "platinum") {
    price = 29.99;
    PackageDetails = "Upgrade Your Membership To Platinum To Get Many Discount";
    validity = 4;
  }

  if (loading3) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <SectionTitle
        heading="Upgrade Membership"
        subHeading={`Upgrade Your Membership To ${packageName}`}
      />
      <div className="flex justify-center flex-col gap-2 items-center">
        <h1 className="text-2xl font-bold">{PackageDetails}</h1>
        <h1 className="text-xl">Expiration : {validity} Weeks</h1>
        <h1 className="text-xl">Price {price}$</h1>
        {singleUser?.badge === packageName ? (
          <>
            <h1>You Already Have That Badge</h1>
          </>
        ) : (
          <>
           <div className='w-1/2'>
              <Elements  stripe={stripePromise}>
                  <CheckoutForm price={price} packageName={packageName}></CheckoutForm>
              </Elements>
           </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
