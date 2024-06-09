import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../Components/Shared/SectionTitle";
import Loading from "../../Others/Loading";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useUpcomingMeals from "../../Hooks/useUpcomingMeals";
import { Link } from "react-router-dom";
import { format } from "date-fns"; // Import date-fns for date formatting

const AdminUpcomingMeals = () => {
  const [meal, loading, refetch] = useUpcomingMeals();
  const axiosPublic = useAxiosPublic();

  const handleDelete = (m) => {
    Swal.fire({
      title: `Delete ${m.title}`,
      text: "Do You Want to Delete this Item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/upcomingMeals/${m._id}`).then((res) => {
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

  const handleTransferMeal = (m) => {
    Swal.fire({
      title: `Transfer ${m.title} ?`,
      text: "Do you want to transfer this item to meals?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, transfer it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.post(`/transferMeal/${m._id}`);
          if (response.data.message === "Meal transferred successfully") {
            refetch();
            Swal.fire({
              title: "Transferred!",
              text: `${m.title} has been added to meals successfully`,
              icon: "success",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An error occurred while transferring the meal",
            icon: "error",
          });
        }
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
        subHeading="All Meals To Serve Our Student"
      />
      <div className="my-5 text-center">
        <Link
          className="text-center mt-3 p-2 border-b-4 border-orange-200 hover:bg-orange-200 hover:text-white rounded-xl my-2 hover:border-orange-300 transition-all duration-700 ease-in-out"
          to="/dashboard/addUpcomingMeals"
        >
          Add Upcoming Meals
        </Link>
      </div>
      <div>
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
                <th className="py-2 px-4 border text-center">Created At</th>
                <th className="py-2 px-4 border text-center">Add Meals</th>
                <th className="py-2 px-4 border text-center">Update</th>
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
                  <td className="py-2 px-4 border text-center">
                    {format(new Date(m.createdAt), "PPpp")}
                  </td>
                  <td className="text-2xl py-2 px-4 text-center  text-green-600 cursor-pointer">
                    <button
                      onClick={() => handleTransferMeal(m)}
                      className="p-2 text-xs bg-blue-300 text-white  rounded hover:bg-blue-400"
                    >
                      Add Meals
                    </button>
                  </td>
                  <td className="py-2 text-2xl text-green-500 px-4  border text-center">
                    <button>
                      <Link to={`/dashboard/UpdateUpcomingMeals/${m._id}`}>
                        <FaEdit></FaEdit>
                      </Link>
                    </button>
                  </td>
                  <td className="text-2xl text-red-600  cursor-pointer py-2 px-4 text-center">
                    <button onClick={() => handleDelete(m)}>
                      <FaTrash />
                    </button>
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

export default AdminUpcomingMeals;
