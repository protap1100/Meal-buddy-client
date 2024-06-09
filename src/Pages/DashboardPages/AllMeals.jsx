import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useMeals from "../../Hooks/useMeals";
import Loading from "../../Others/Loading";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AllMeals = () => {
  const [meal, loading, refetch] = useMeals();
  const axiosPublic = useAxiosPublic();

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
        axiosPublic.delete(`/meals/${m._id}`).then((res) => {
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
        heading="All Meals"
        subHeading="All Meals To Serve Our Students"
      />
      <div className="my-5 text-center">
        <Link
          className="text-center mt-3 p-2 border-b-4 border-orange-200 hover:bg-orange-200 hover:text-white rounded-xl my-2 hover:border-orange-300 transition-all duration-700 ease-in-out"
          to="/dashboard/addMeals"
        >
          Add Meals
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border text-center">#</th>
              <th className="py-2 px-4 border text-center">Name</th>
              <th className="py-2 px-4 border text-center">Image</th>
              <th className="py-2 px-4 border text-center">Category</th>
              <th className="py-2 px-4 border text-center">Description</th>
              <th className="py-2 px-4 border text-center">Rating</th>
              <th className="py-2 px-4 border text-center">Likes</th>
              <th className="py-2 px-4 border text-center">Price</th>
              <th className="py-2 px-4 border text-center">Email</th>
              <th className="py-2 px-4 border text-center">Created At</th>
              <th className="py-2 px-4 border text-center">Update</th>
              <th className="py-2 px-4 border text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {meal.map((m, index) => (
              <tr key={m._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border text-center">{m.title}</td>
                <td className="py-2 px-4 border flex justify-center">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={m.image}
                          alt="Meal"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border text-center">{m.category}</td>
                <td className="py-2 px-4 border text-center">{m.description}</td>
                <td className="py-2 px-4 border text-center">{m.rating}</td>
                <td className="py-2 px-4 border text-center">{m.likes}</td>
                <td className="py-2 px-4 border text-center">{m.price}</td>
                <td className="py-2 px-4 border text-center">{m.email}</td>
                <td className="py-2 px-4 border text-center">{m.createdAt}</td>
                <td className="py-2 px-4 border text-center">
                  <button> <Link to={`/dashboard/updateMeals/${m._id}`}><FaEdit className="text-green-600 text-2xl cursor-pointer" /></Link> </button>
                </td>
                <td
                  className="py-2 px-4 border text-center cursor-pointer"
                >
                  <button onClick={() => handleDelete(m)}><FaTrash className="text-red-600 text-2xl" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMeals;
