import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../../Components/Shared/SectionTitle";
import Loading from "../../Others/Loading";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Aos from "aos";

const UpdateUpcomingMeals = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: meal, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/upcomingMeals/${id}`);
      return res.data;
    },
  });
  console.log(meal);
  const image_hosting_key = import.meta.env.VITE_IMBB_API_URL;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  console.log(image_hosting_api);

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const updateItem = {
        title: data.title,
        category: data.category,
        price: parseFloat(data.price),
        description: data.description,
        rating: parseFloat(data.rating),
        image: res.data.data.display_url,
        review: meal?.review,
        likes: meal?.likes,
        ingredients: data.ingredients,
        name: meal?.displayName,
        email: meal?.email,
        createdAt: meal?.createdAt,
      };
      const menuRes = await axiosPublic.patch(
        `/updateUpcomingMeals/${meal?._id}`,
        updateItem
      );
      // console.log(menuRes.data);
      // console.log("With Image Url", res.data);
      console.log(menuRes)
      if (menuRes.data.modifiedCount > 0) {
        reset(); // Reset the form here
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Update Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state ? location.state : "/dashboard/allMeals");
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <SectionTitle
        heading="Update Your Meal Info"
        subHeading="Give New Information About Your Meal"
      />
      <div className="mt-10">
        <form
          className="flex-grow"
          data-aos="fade-right"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-6 mb-6 grid-cols-1  lg:grid-cols-2 md:grid-cols-2 px-10">
            <div className="col-span-2 lg:col-span-1" data-aos="fade-right">
              <label className="font-bold text-xl">Title</label>
              <input
                defaultValue={meal?.title}
                {...register("title", { required: "Title is required" })}
                type="text"
                className="mt-2 border border-[#1313181A] text-sm rounded-lg block w-full p-5"
                placeholder="Enter the title"
                spellCheck="true"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="col-span-2 lg:col-span-1" data-aos="fade-right">
              <label className="font-bold text-xl">Category</label>
              <select
                defaultValue={meal?.category}
                {...register("category", { required: "Category is required" })}
                className="mt-2 border border-[#1313181A] text-sm rounded-lg block w-full p-5"
              >
                <option value="">Select category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
            <div className="col-span-2 lg:col-span-1" data-aos="fade-right">
              <label className="font-bold text-xl">Ingredients</label>
              <input
                defaultValue={meal?.ingredients}
                {...register("ingredients", {
                  required: "Ingredients are required",
                })}
                type="text"
                className="mt-2 border border-[#1313181A] text-sm rounded-lg block w-full p-5"
                placeholder="Enter the Ingredients"
                spellCheck="true"
              />
              {errors.ingredients && (
                <p className="text-red-500">{errors.ingredients.message}</p>
              )}
            </div>
            <div className="col-span-2 lg:col-span-1" data-aos="fade-right">
              <label className="font-bold text-xl">Description</label>
              <input
                defaultValue={meal?.description}
                {...register("description", {
                  required: "Description is required",
                })}
                type="text"
                className="mt-2 border border-[#1313181A] text-sm rounded-lg block w-full p-5"
                placeholder="Enter the description"
                spellCheck="true"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="col-span-2 lg:col-span-1" data-aos="fade-right">
              <label className="font-bold text-xl">Price</label>
              <input
                defaultValue={meal?.price}
                {...register("price", { required: "Price is required" })}
                type="number"
                className="mt-2 border border-[#1313181A] text-sm rounded-lg block w-full p-5"
                placeholder="Enter the price"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div className="col-span-2 lg:col-span-1" data-aos="fade-right">
              <label className="font-bold text-xl">Rating</label>
              <input
                defaultValue={meal?.rating}
                {...register("rating", { required: "Rating is required" })}
                type="number"
                step="0.1"
                min={0}
                max={5}
                className="mt-2 border border-[#1313181A] text-sm rounded-lg block w-full p-5"
                placeholder="Enter the rating"
              />
              {errors.rating && (
                <p className="text-red-500">{errors.rating.message}</p>
              )}
            </div>
            <div className="col-span-2" data-aos="fade-right">
              <label className="font-bold text-xl">Image</label>
              <div className="flex items-center gap-20">
                <div>
                  <input
                    {...register("image", { required: "Image is required" })}
                    type="file"
                    className="mt-2 border border-[#1313181A] w-full p-3 rounded-xl"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="">Current Image:</label>
                  {meal?.image && (
                    <img
                      src={meal.image}
                      alt="Current meal"
                      className=" rounded-lg  w-12 h-12"
                    />
                  )}
                </div>
              </div>
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>
          </div>
          <div className="px-10">
            <button
              type="submit"
              className="text-center mt-3 p-2 border-b-4 bg-blue-400 border-blue-400 w-full hover:bg-blue-200 text-white rounded-xl my-2 hover:border-blue-300 transition-all duration-700 ease-in-out"
            >
              Update Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUpcomingMeals;
