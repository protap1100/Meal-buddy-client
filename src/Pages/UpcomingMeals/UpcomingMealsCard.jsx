import { Rating } from "@smastrom/react-rating";
import { FaComment, FaThumbsUp } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useUser from "../../Hooks/useUser";
import Loading from "../../Others/Loading";
import Swal from "sweetalert2";
import { useState } from "react";

const UpcomingMealsCard = ({ item }) => {
  const [likeLoading, setLikeLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [singleUser] = useUser();
  // Handling Like

  const handleLike = (item) => {
    if (singleUser?.badge === "Bronze") {
      Swal.fire({
        icon: "error",
        text: "Buy Membership To Give Likes",
      });
    } else {
      setLikeLoading(true);
      const userId = singleUser?._id;
      axiosPublic
        .patch(`/upcomingLikes/${item._id}`, { userId })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              text: "Like Added",
            });
          } else {
            Swal.fire({
              icon: "info",
              text: "You have already liked this meal",
            });
          }
          setLikeLoading(false);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          Swal.fire({
            icon: "error",
            text:
              error.response.data.message ||
              "Something went wrong. Please try again later.",
          });
          setLikeLoading(false);
        });
    }
  };

  if (likeLoading) {
    return <Loading></Loading>;
  }

  return (
    <div
      className={`${
        item.category === "Breakfast"
          ? "bg-green-100"
          : item.category === "Lunch"
          ? "bg-blue-100"
          : "bg-red-100"
      } p-4 rounded`}
    >
      <div className="relative bg-white">
        <img className="w-full h-80 rounded" src={item.image} alt="" />
        <h1 className="bg-black text-white p-2 rounded-xl absolute top-2 right-2">
          {item.price} $
        </h1>
        <div className="w-40 my-2 absolute bottom-0">
          {<Rating readOnly value={item.rating} key={item.rating} />}
        </div>
        <div className=" my-2 p-1 bg-blue-100 rounded absolute bottom-0 right-2">
          <h1 className="text-xl">{item.category}</h1>
        </div>
      </div>
      <div className="text-left">
        <div className="mt-2 flex gap-20">
          <div className="flex items-center gap-2">
            <h1 className="text-blue-500 cursor-pointer">
              <button
                onClick={() => {
                  handleLike(item);
                }}
              >
                <FaThumbsUp></FaThumbsUp>
              </button>
            </h1>
            <h1>
              {item.likes} {item.likes > 0 ? "Likes" : "Like"}{" "}
            </h1>
          </div>
          <div className="flex items-center gap-3 ">
            <h1>
              <FaComment></FaComment>
            </h1>
            <h1>
              {item.reviews} {item.reviews > 0 ? "Reviews" : "Review"}
            </h1>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold text-left mt-2">{item.title}</h1>
          <h1>{item.description}</h1>
        </div>
        <h1 className="text-xl font-bold"> Ingredients </h1>
        <div
          className={`${
            item.category === "Breakfast"
              ? "text-red-600"
              : item.category === "Lunch"
              ? "text-green-600"
              : "text-blue-600"
          }
          grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  text-red-800`}
        >
          {Array.isArray(item.ingredients) ? (
            item.ingredients.map((ingredient, index) => (
              <h1 key={index}>
                {index + 1}. {ingredient}
              </h1>
            ))
          ) : (
            <>{item.ingredients}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMealsCard;
