import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useMeals from "../../Hooks/useMeals";
import Loading from "../../Others/Loading";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AllMeals = () => {
  const [meal, loading, refetch] = useMeals();
  //   console.log(meal);
  const axiosPublic = useAxiosPublic();

  const handleDelete = (m) => {
    Swal.fire({
      title: `Delete${m.title}`,
      text: "Do You Want to Delete this Item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/meals/${m._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${m.title} Has Deleted Successfully`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (loading) {
    <Loading></Loading>;
  }
  return (
    <div>
      <SectionTitle
        heading="All Meals"
        subHeading="All Meals To Serve Our Student"
      ></SectionTitle>
            <div className="my-5 text-center">
        <Link
          className="text-center mt-3 p-2 border-b-4 border-orange-200 hover:bg-orange-200 hover:text-white rounded-xl my-2 hover:border-orange-300 transition-all duration-700 ease-in-out"
          to="/dashboard/addMeals"
        >
          Add Meals
        </Link>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table text-xl">
            {/* head */}
            <thead>
              <tr className="text-lg">
                <th className="text-center">#</th>
                <th className="text-center">Name</th>
                <th className="text-center">Image</th>
                <th className="text-center">Category</th>
                <th className="text-center">Description</th>
                <th className="text-center">Rating</th>
                <th className="text-center">Likes</th>
                <th className="text-center">Price</th>
                <th className="text-center">Email</th>
                <th className="text-center">Created At</th>
                <th className="text-center">Update</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {meal.map((m, index) => (
                <tr key={m._id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{m.title}</td>
                  <td className="flex justify-center">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={m.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{m.category}</td>
                  <td className="text-center">{m.description}</td>
                  <td className="text-center">{m.rating}</td>
                  <td className="text-center">{m.likes}</td>
                  <td className="text-center">{m.price}</td>
                  <td className="text-center">{m.email}</td>
                  <td className="text-center">{m.createdAt}</td>
                  <td className="text-2xl flex items-center justify-center text-green-600 cursor-pointer">
                    <FaEdit></FaEdit>
                  </td>
                  <td onClick={()=>{handleDelete(m)}} className="text-2xl text-red-600  cursor-pointer">
                    <FaTrash></FaTrash>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllMeals;