import { Rating } from "@smastrom/react-rating";
import { FaComment, FaThumbsUp } from "react-icons/fa";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Others/Loading";
const MealsCard = ({ item }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const handleRequestMeals = () => {
    // console.log(id)
    // console.log(item);
    const servedMeals = {
      title: item.title,
      image: item.image,
      category: item.category,
      ingredients: item.ingredients,
      description: item.description,
      price: item.price,
      rating: item.rating,
      ServingStatus: "Pending",
      name: user?.displayName,
      email: user?.email,
    };
    axiosPublic.post("/servedMeals", servedMeals).then((res) => {
      // console.log(id)
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Meals Request Successfully Sended And Added To card also",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // getting reviews According meal id
  const id = item._id;
  // console.log(id)

  const { data: reviewsData = [], isLoading: loading2 } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews`, {
        params: { mealId: id },
      });
      return res.data;
    },
  });

  // console.log(reviewsData)

  if (loading2) {
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
      <div className="relative">
        <img className="w-full h-80 rounded" src={item.image} alt="" />
        <h1 className="bg-black text-white p-2 rounded-xl absolute top-2 right-2">
          {item.price}
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
              <FaThumbsUp></FaThumbsUp>
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
              {reviewsData.length} {item.reviews > 0 ? "Reviews" : "Review"}
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
      <div className="flex gap-5 justify-center">
        <button
          onClick={() => {
            handleRequestMeals(item._id);
          }}
          className="text-center mt-3 p-2 border-b-4 border-orange-200 hover:bg-orange-200 hover:text-white rounded-xl my-2 hover:border-orange-300 transition-all duration-700 ease-in-out"
        >
          Request Meal
        </button>
        <Link
          to={`/mealDetails/${item._id}`}
          className="text-center mt-3 p-2 border-b-4 border-blue-200 hover:bg-blue-200 hover:text-white rounded-xl my-2 hover:border-blue-300 transition-all duration-700 ease-in-out"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default MealsCard;
