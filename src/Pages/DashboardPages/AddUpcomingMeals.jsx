import SectionTitle from "../../Components/Shared/SectionTitle";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMBB_API_URL;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
console.log(image_hosting_api);

const AddUpcomingMeals = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const mealsItem = {
        title: data.title,
        category: data.category,
        price: parseFloat(data.price),
        description: data.description,
        rating: parseFloat(data.rating),
        image: res.data.data.display_url,
        review: 0,
        likes: 0,
        ingredients: data.ingredients,
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
      };
      const menuRes = await axiosPublic.post("/upcomingMeals", mealsItem);
      console.log(menuRes.data);
      console.log("With Image Url", res.data);
      if (menuRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Successfully inserted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <SectionTitle
        heading="Add Meals"
        subHeading="Add Healthy Meals for Your Students"
      />
      <div className="mt-10">
        <form
          className="flex-grow"
          data-aos="fade-right"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-6 mb-6 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 px-10">
            <div className="col-span-2 lg:col-span-1" data-aos="fade-right">
              <label className="font-bold text-xl">Title</label>
              <input
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
                {...register("rating", { required: "Rating is required" })}
                type="number"
                step="0.1"
                className="mt-2 border border-[#1313181A] text-sm rounded-lg block w-full p-5"
                placeholder="Enter the rating"
              />
              {errors.rating && (
                <p className="text-red-500">{errors.rating.message}</p>
              )}
            </div>
            <div className="col-span-2" data-aos="fade-right">
              <label className="font-bold text-xl">Image</label>
              <input
                {...register("image", { required: "Image is required" })}
                type="file"
                className="mt-2 border border-[#1313181A] w-full p-3 rounded-xl"
              />
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
              Add Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpcomingMeals;

