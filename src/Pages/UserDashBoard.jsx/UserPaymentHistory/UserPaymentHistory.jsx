import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Others/Loading";
import { format } from "date-fns";

const UserPaymentHistory = () => {
  const axiosSecure = useAxiosSecure();

  const { data: paymentData, isLoading: loading } = useQuery({
    queryKey: ["paymentData"],
    queryFn: async () => {
      const res = await axiosSecure("/paymentHistory");
      // console.log(res);
      return res.data;
    },
  });

  if (loading) {
    return <Loading type="bubbles"></Loading>;
  }


  return (
    <div>
      <SectionTitle
        heading="Payment History"
        subHeading="All Your Payment History"
      />
      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Email</th>
              <th className="text-center">Transaction Id</th>
              <th className="text-center">Price</th>
              <th className="text-center">Pack</th>
              <th className="text-center">Status</th>
              <th className="text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((payment, index) => (
              <tr key={payment._id}>
                <th className="text-center">{index + 1}</th>
                <td className="text-center">{payment.email || "None"}</td>
                <td className="text-center">{payment.transactionId || "None"}</td>
                <td className="text-center">{payment.price}</td>
                <td className="text-center">{payment.pack}</td>
                <td className="text-center text-green-400 font-bold">{payment.status}</td>
                <td className="text-center">{format(new Date(payment.date), "dd/MM/yyyy") || "Time"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPaymentHistory;
