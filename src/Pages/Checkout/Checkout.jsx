import { useParams } from "react-router-dom";
import SectionTitle from "../../Components/Shared/SectionTitle";

const Checkout = () => {
  const { packageName } = useParams();
//   console.log(packageName);

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

//   console.log(PackageDetails);
//   console.log(price);

  return (
    <div>
      <SectionTitle
        heading="Upgrade Membership"
        subHeading={`Upgrade Your Membership To ${packageName}`}
      ></SectionTitle>
      <div className="flex justify-center flex-col gap-2 items-center">
        <h1 className="text-2xl font-bold">{PackageDetails}</h1>
        <h1 className="text-xl">Expiration : {validity} Weeks</h1>
        <h1 className="text-xl">Price {price}</h1>
        <button className="p-2 rounded-xl border border-b-green-500 border-b-4 hover:text-white  text-black font-bold hover:bg-green-600 transition-all duration-700 ease-in-out"> Pay Now </button>
      </div>
    </div>
  );
};

export default Checkout;
