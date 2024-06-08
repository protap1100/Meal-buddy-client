import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../Others/Loading";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const UsersReview = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    data: review = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/singleReviews/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (review) => {
    Swal.fire({
      title: `Delete ${review.title}`,
      text: "Do You Want to Delete this Item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/singleReviewsDelete/${user?.email}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: `${review.title} Has Been Deleted Successfully`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  console.log(review);
  if (loading) {
    <Loading></Loading>;
  }

  return (
    <div>
      <SectionTitle
        heading="All You's Feedback here"
        subHeading="All Your Review about each product"
      ></SectionTitle>
      <div className="overflow-x-auto text-2xl  mt-10">
        <table className="min-w-full bg-white border border-gray-200 text-lg">
          <thead>
            <tr className="text-lg">
              <th className="py-2 px-4 border text-center">#</th>
              <th className="py-2 px-4 border text-center">Reviewer Name</th>
              <th className="py-2 px-4 border text-center">Image</th>
              <th className="py-2 px-4 border text-center">Meal Name</th>
              <th className="py-2 px-4 border text-center">Category</th>
              <th className="py-2 px-4 border text-center">Message</th>
              <th className="py-2 px-4 border text-center">Rating</th>
              <th className="py-2 px-4 border text-center">Email</th>
              <th className="py-2 px-4 border text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {review.map((m, index) => (
              <tr key={m._id}>
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border text-center">
                  {m.reviewerName}
                </td>
                <td className="py-2 px-4 border text-center">
                  <img src={m.image} className="w-16 h-16 object-cover" />
                </td>
                <td className="py-2 px-4 border text-center">{m.title}</td>
                <td className="py-2 px-4 border text-center">{m.category}</td>
                <td className="py-2 px-4 border text-center">{m.message}</td>
                <td className="py-2 px-4 border text-center">{m.rating}</td>
                <td className="py-2 px-4 border text-center">{m.email}</td>
                <td className="py-2 px-4 border text-center text-red-400 hover:text-red-500">
                  <button
                    onClick={() => {
                      handleDelete(m);
                    }}
                  >
                    <FaTrash></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersReview;
