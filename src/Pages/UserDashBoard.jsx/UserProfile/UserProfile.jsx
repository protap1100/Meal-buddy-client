import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import useUser from "../../../Hooks/useUser";
import Loading from "../../../Others/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [singleUser] = useUser();

  const { data: paymentData, isLoading: loading } = useQuery({
    queryKey: ["paymentData"],
    queryFn: async () => {
      const res = await axiosSecure(`/paymentHistory/${user?.email}`);
      //   console.log(res);
      return res.data;
    },
  });

//   console.log(paymentData);

  if (loading) {
    return <Loading type="bubbles"></Loading>;
  }
  let price = 0;

  for (const payment of paymentData) {
    price = payment?.price + price;
  }
  return (
    <div>
      <SectionTitle
        heading={`Hello ${singleUser?.name}`}
        subHeading="Here is all your information about profile"
      ></SectionTitle>
      <div className="mt-10 space-y-5">
        <h1 className={`text-2xl font-bold  text-center`}>
          Your Current Membership:
          <p
            className={`${
              singleUser?.badge === "gold"
                ? "text-amber-500"
                : singleUser?.badge === "platinum"
                ? `text-slate-500`
                : "text-gray-500"
            }`}
          >
            {singleUser?.badge}
          </p>
        </h1>
        <h1 className="text-2xl font-bold text-green-500 text-center">
          Email: {singleUser?.email}
        </h1>
        <h1 className="text-center">Total Invested: {price}</h1>
        <div className="flex justify-center items-center">
          <img src={user?.photoURL} alt="" />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
