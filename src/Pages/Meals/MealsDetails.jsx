import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import Loading from "../../Others/Loading";
import { FaComment, FaThumbsUp } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import { Controller, useForm } from "react-hook-form";
import "@smastrom/react-rating/style.css";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useUser from "../../Hooks/useUser";
import { useState } from "react";
// import EmojiPicker from "emoji-picker-react";

const MealsDetails = () => {
  const axiosPublic = useAxiosPublic();
  const [likeLoading, setLikeLoading] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const [singleUser] = useUser();

  console.log("single user", singleUser);

  const { data: meal = {}, isLoading: loading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals/${id}`);
      return res.data;
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      rating: 0,
    },
  });

  const onSubmit = async (data) => {
    // console.log(data.name, data.rating, data.message)
    const reviewData = {
      reviewerName: data.name,
      rating: data.rating,
      message: data.message,
      date: new Date(),
      MealId: _id,
      name: user?.displayName,
      email: user?.email,
      title: title,
      image: image,
      category: category,
      price: price,
    };
    const review = await axiosPublic.post("/review", reviewData);
    console.log(review);
    if (review.data.result.insertedId) {
      reset();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Review Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
    }
  };

  const handleRequestMeals = () => {
    // console.log(id)
    // console.log(item);
    if (singleUser.badge === "Bronze" || "") {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "You Need Any MemberShip To Request For meal",
      });
    } else {
      const servedMeals = {
        id: singleUser._id,
        title: title,
        image: image,
        category: category,
        ingredients: ingredients,
        description: description,
        price: price,
        rating: rating,
        likes: likes,
        ServingStatus: "Pending",
        name: user?.displayName,
        email: user?.email,
      };
      axiosPublic.post("/servedMeals", servedMeals).then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Meals Request Successfully Sended",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  // Handling Like
  const handleLike = (id) => {
    if (!singleUser?.name) {
      console.log("nam nai");
      Swal.fire({
        icon: "error",
        text: "Please Login To Give Like",
      });
    } else {
      setLikeLoading(true);
      const userId = _id;
      axiosPublic
        .patch(`/likes/${id}`, { userId })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              text: "Like Added Reload the page it will update",
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

  // getting reviews According meal id
  const { data: reviewsData = [], isLoading: loading2 } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews`, {
        params: { mealId: id },
      });
      return res.data;
    },
  });

  if (loading || loading2 || likeLoading) {
    return <Loading />;
  }
  const {
    _id,
    title,
    image,
    category,
    ingredients,
    description,
    price,
    rating,
    post_time,
    likes,
    reviews,
  } = meal;

  return (
    <div>
      <SectionTitle
        heading="Meal Details"
        subHeading={`Details Of ${meal.title}`}
      ></SectionTitle>
      <div
        className={`${
          category === "Breakfast"
            ? "bg-green-100"
            : category === "Lunch"
            ? "bg-blue-100"
            : "bg-red-100"
        } p-10 mt-5 rounded flex lg:w-3/4 w-full  flex-col lg:flex-row items-center mx-auto justify-center`}
      >
        <div className="flex flex-col  lg:items-left justify-center items-center">
          <div className="relative w-full lg:w-3/4 bg-white  rounded">
            <img className="w-full h-80 rounded" src={image} alt="" />
            <h1 className="bg-black text-white p-2 rounded-xl absolute top-2 right-2">
              {price}
            </h1>
            <div className="w-40 my-2 absolute bottom-0">
              {<Rating readOnly value={rating} key={rating} />}
            </div>
            <div className=" my-2 p-1 bg-blue-100 rounded absolute bottom-0 right-2">
              <h1 className="text-xl">{category}</h1>
            </div>
          </div>
          <div className="text-left w-full lg:w-4/5">
            <div className="mt-2 flex gap-20">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleLike(_id);
                  }}
                  className="text-blue-500 cursor-pointer"
                >
                  <FaThumbsUp></FaThumbsUp>
                </button>
                <h1>
                  {likes} {likes > 0 ? "Likes" : "Like"}
                </h1>
              </div>
              <div className="flex items-center gap-3 ">
                <h1>
                  <FaComment></FaComment>
                </h1>
                <h1>
                  {reviewsData.length} {reviews > 0 ? "Reviews" : "Review"}
                </h1>
              </div>
            </div>
            <h1 className="font-bold text-orange-500">
              Added Time: {post_time}
            </h1>
            <div>
              <h1 className="text-xl font-bold text-left mt-2">{title}</h1>
              <h1>{description}</h1>
            </div>
            <h1 className="text-xl font-bold"> Ingredients </h1>
            <div
              className={`${
                category === "Breakfast"
                  ? "text-red-600"
                  : category === "Lunch"
                  ? "text-green-600"
                  : "text-blue-600"
              }
          grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  text-red-800`}
            >
              {Array.isArray(ingredients) ? (
                ingredients.map((ingredient, index) => (
                  <h1 key={index}>
                    {index + 1}. {ingredient}
                  </h1>
                ))
              ) : (
                <>{ingredients}</>
              )}
            </div>
          </div>
          <div className="flex gap-5 justify-center">
            <button
              onClick={() => {
                handleRequestMeals(_id);
              }}
              className="text-center mt-3 p-2 border-b-4 border-orange-200 hover:bg-orange-200 hover:text-white rounded-xl my-2 hover:border-orange-300 transition-all duration-700 ease-in-out"
            >
              Request Meal
            </button>
          </div>
        </div>
        <form
          className="max-w-md  lg:w-2/3 w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Your name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              id="name"
              {...register("name", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1">Name is required.</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Your Comment
            </label>
            <textarea
              type="textarea"
              placeholder="Enter Your Message About This Meal"
              id="message"
              {...register("message", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.message && (
              <div className="text-red-500 text-sm mt-1">
                Message is required.
              </div>
            )}
          </div>

          <div className="mb-4">
            <div
              id="rating_label"
              className="block text-lg font-medium text-gray-700"
            >
              Rating
            </div>
            <Controller
              control={control}
              name="rating"
              rules={{
                validate: (rating) => rating > 0,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Rating
                  value={value}
                  isRequired
                  onChange={onChange}
                  visibleLabelId="rating_label"
                  onBlur={onBlur}
                  className="mt-1 w-4 h-10"
                />
              )}
            />
            {errors.rating && (
              <div className="text-red-500 text-sm mt-1">
                Rating is required.
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full text-center mt-3 p-2 border-b-4 border-orange-200 hover:bg-orange-200 hover:text-white rounded-xl my-2 hover:border-orange-300 transition-all duration-700 ease-in-out"
          >
            Submit review
          </button>
        </form>
      </div>
      <div className="lg:w-3/4 w-full mx-auto my-5 space-y-2">
        <h1 className="text-center text-2xl font-bold">
          User Reaction About This Food
          <p>Total Reviews:{reviewsData.length}</p>
        </h1>
        <div
          className={`grid ${
            reviewsData.length > 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          } grid-cols-2 md:grid-cols-2  gap-5`}
        >
          {reviewsData.map((rev) => (
            <div
              className="bg-blue-100 grid my-2 rounded justify-center items-center"
              key={rev._id}
            >
              <h1 className="text-xl text-orange-500">
                Name: {rev.reviewerName}
              </h1>
              <h1 className="text-xl text-orange-500" style={{ maxWidth: 140 }}>
                {<Rating readOnly value={rev.rating} key={rev.rating} />}
              </h1>
              <h1 className="text-xl text-orange-500">Message:{rev.message}</h1>
              <h1 className="text-xl text-orange-500">Time:{rev.time}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealsDetails;
