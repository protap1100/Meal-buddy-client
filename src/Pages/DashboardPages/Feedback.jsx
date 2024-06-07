import { FaTrash } from "react-icons/fa";
import SectionTitle from "../../Components/Shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../Others/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Feedback = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: feedback = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contact");
      return res.data;
    },
  });

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
        axiosSecure.delete(`/contact/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Contact Message deleted successfully!",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const formatDate = (dateString) => {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(dateString));
    } catch (error) {
      console.error("Invalid date:", dateString);
      return "Invalid Date";
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <SectionTitle
        heading={"User's Feedback"}
        subHeading={"User's Reaction About Us"}
      ></SectionTitle>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Name</th>
              <th className="text-center">Image</th>
              <th className="text-center">Email</th>
              <th className="text-center">Subject</th>
              <th className="text-center">Phone</th>
              <th className="text-center">Date</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((msg, index) => (
              <tr key={msg._id}>
                <th className="text-center">{index + 1}</th>
                <td className="text-center">{msg.userName}</td>
                <td className="flex justify-center">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask flex justify-center mask-squircle w-12 h-12">
                        <img
                          src={msg.userPhoto}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center">{msg.email}</td>
                <td className="text-center">{msg.subject}</td>
                <td className="text-center">{msg.phone}</td>
                <td className="text-center">{formatDate(msg.date)}</td>
                <th className="text-center">
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="btn btn-ghost btn-sm text-red-500"
                  >
                    <FaTrash />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedback;
