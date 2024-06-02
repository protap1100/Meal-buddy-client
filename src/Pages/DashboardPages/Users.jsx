import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../Others/Loading";

const Users = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  //   console.log(users);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`http://localhost:5000/users/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // Assuming refetch is a function to refresh the data
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted successfully!",
                icon: "success",
              });
            } else if (res.data.message) {
              Swal.fire({
                title: "Failed!",
                text: res.data.message,
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire({
              title: "Error!",
              text: "Cannot Delete Admin",
              icon: "error",
            });
          });
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <SectionTitle
        heading="All User"
        subHeading="All User Of Our Website"
      ></SectionTitle>
      <div className="m-10">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Badge</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th className="text-center">{index + 1}</th>
                  <td className="text-center">{user?.name}</td>
                  <td className="text-center">{user?.email}</td>
                  <td className="text-center">{user?.badge}</td>
                  <th className="text-center">
                    <button
                      onClick={() => {
                        handleDelete(user._id);
                      }}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
