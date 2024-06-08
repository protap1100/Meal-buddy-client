import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ price,packageName }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
//   console.log(price) 

  useEffect(() => {
    const res = axiosSecure.post("/create-payment-intent", { price: price })
    .then(res=>{
        console.log(res.data);
        setClientSecret(res.data.clientSecret)
    })
  }, [axiosSecure, price]);
  console.log(clientSecret)

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment 
    const {paymentIntent, error : confirmError} =await stripe.confirmCardPayment(clientSecret,{
        payment_method : {
            card :card,
            billing_details : {
                email : user?.email || "anonymous",
                name : user?.displayName  || "anonymous",
            }

        }
    })

    if(confirmError){
        console.log('confirm error')
    }else{
        console.log(paymentIntent, 'Payment Success')
        if(paymentIntent.status === "succeeded"){
            setTransactionId(paymentIntent.id);
            Swal.fire({
                text: 'Payment Successful',
                icon: 'success'
            })
            // Saving Payment in Data Base
            const payment = {
                email : user?.email,
                badge: packageName,
                pack : 'Membership',
                price: price,
                status: 'paid',
                transactionId: paymentIntent.id,
                date: new Date(), 
            }
           const res = axiosSecure.patch('/payments',payment);
           console.log(res);
           window.location.reload();
        }
    }


  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn  btn-sm btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error} </p>
          {transactionId && <p className="text-green-600">Your Transaction Id :{transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
