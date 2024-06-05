import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Review = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allReviews");
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
        axiosPublic.delete(`/deleteReviews/${review._id}`).then((res) => {
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

  console.log(reviews);

  return (
    <div>
      <SectionTitle
        heading="Reviews About Food"
        subHeading="User's Reviews On Specific Meals"
      />
      <div className="mt-10 overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 border text-center">Reviewer Name</th>
              <th className="py-2 border text-center">Rating</th>
              <th className="py-2 border text-center">Message</th>
              <th className="py-2 border text-center">Date</th>
              <th className="py-2 border text-center">Meal</th>
              <th className="py-2 border text-center">Image</th>
              <th className="py-2 border text-center">Category</th>
              <th className="py-2 border text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index} className="border">
                <td className="py-2 px-4 border text-center">
                  {review.reviewerName}
                </td>
                <td className="py-2 px-4 border text-center">
                  {review.rating}
                </td>
                <td className="py-2 px-4 border text-center">
                  {review.message}
                </td>
                <td className="py-2 px-4 border text-center">
                  {new Date(review.date).toLocaleString()}
                </td>
                <td className="py-2 px-4 border text-center">{review.title}</td>
                <td className="py-2 px-4 border text-center">
                  <img
                    src={review.image}
                    alt={review.title}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="py-2 px-4 border text-center">
                  {review.category}
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(review)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    Delete
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

export default Review;
