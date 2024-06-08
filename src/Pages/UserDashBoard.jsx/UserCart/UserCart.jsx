import { FaTrash } from "react-icons/fa";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import useCart from "../../../Hooks/useCart";
import Loading from "../../../Others/Loading";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const UserCart = () => {
  const [meal, loading, refetch] = useCart();
  const axiosPublic = useAxiosPublic();

  // Function to calculate total price
  const calculateTotal = () => {
    let total = 0;
    meal.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const handleDelete = (m) => {
    Swal.fire({
      title: `Delete ${m.title}?`,
      text: "Do you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/userCart/${m._id}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${m.title} has been deleted successfully`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <SectionTitle
        heading="Your Cart Item"
        subHeading="Item You Have Sended Request"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-lg">
          <thead>
            <tr className="text-lg">
              <th className="py-2 px-4 border text-center">#</th>
              <th className="py-2 px-4 border text-center">Name</th>
              <th className="py-2 px-4 border text-center">Image</th>
              <th className="py-2 px-4 border text-center">Category</th>
              <th className="py-2 px-4 border text-center">Description</th>
              <th className="py-2 px-4 border text-center">Rating</th>
              <th className="py-2 px-4 border text-center">Likes</th>
              <th className="py-2 px-4 border text-center">Price</th>
              <th className="py-2 px-4 border text-center">Email</th>
              <th className="py-2 px-4 border text-center">Status</th>
              <th className="py-2 px-4 border text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {meal.map((m, index) => (
              <tr key={m._id}>
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border text-center">{m.title}</td>
                <td className="py-2 px-4 border flex justify-center">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={m.image} alt="Meal" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border text-center">{m.category}</td>
                <td className="py-2 px-4 border text-center">
                  {m.description}
                </td>
                <td className="py-2 px-4 border text-center">{m.rating}</td>
                <td className="py-2 px-4 border text-center">{m.likes}</td>
                <td className="py-2 px-4 border text-center">{m.price}</td>
                <td className="py-2 px-4 border text-center">{m.email}</td>
                <td className="py-2 px-4 border text-center">{m.ServingStatus}</td>
                <td className="py-2 px-4 border flex justify-center items-center">
                  <button
                    onClick={() => {
                      handleDelete(m);
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="6" className="border"></td>
              <td className="py-2 px-4 border text-center font-bold">Total:</td>
              <td className="py-2 px-4 border text-center font-bold">
                {calculateTotal()}
              </td>
              <td className="py-2 px-4 border text-center ">
               {
                calculateTotal() > 0 ?  <button className="p-2 rounded-xl border-b-4 border-green-300 hover:bg-green-300 hover:text-white">
                <Link to='/userDashboard/cartPayment'> Pay Now</Link>
               </button> : <p>Add Something to Buy</p>
               }
              </td>
              <td colSpan="2" className="border"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCart;
