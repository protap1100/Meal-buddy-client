import SectionTitle from "../../../Components/Shared/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CartCheckout from "./CartCheckout";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API);

const CartPayment = () => {
    return (
        <div>
            <SectionTitle heading='Pay For Your Meal' subHeading='Pay For the meal that you served'></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CartCheckout></CartCheckout>
                </Elements>
            </div>
        </div>
    );
};

export default CartPayment;