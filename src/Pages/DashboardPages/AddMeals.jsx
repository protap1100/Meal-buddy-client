import SectionTitle from "../../Components/Shared/SectionTitle";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddMeals = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    // handle form submission
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
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div className="col-span-2 lg:col-span-1" data-aos="fade-right">
              <label className="font-bold text-xl">Category</label>
              <input
                {...register("category", { required: "Category is required" })}
                type="text"
                className="mt-2 border border-[#1313181A] text-sm rounded-lg block w-full p-5"
                placeholder="Enter the category"
              />
              {errors.category && <p className="text-red-500">{errors.category.message}</p>}
            </div>
            <div className="col-span-2 lg:col-span-1" data-aos="fade-right">
              <label className="font-bold text-xl">Ingredients</label>
              <input
                {...register("ingredients", { required: "Ingredients are required" })}
                type="text"
                className="mt-2 border border-[#1313181A] text-sm rounded-lg block w-full p-5"
                placeholder="Enter the ingredients"
              />
              {errors.ingredients && <p className="text-red-500">{errors.ingredients.message}</p>}
            </div>
            <div className="col-span-2 lg:col-span-1" data-aos="fade-right">
              <label className="font-bold text-xl">Description</label>
              <input
                {...register("description", { required: "Description is required" })}
                type="text"
                className="mt-2 border border-[#1313181A] text-sm rounded-lg block w-full p-5"
                placeholder="Enter the description"
              />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            <div className="col-span-2 lg:col-span-1" data-aos="fade-right">
              <label className="font-bold text-xl">Price</label>
              <input
                {...register("price", { required: "Price is required" })}
                type="number"
                className="mt-2 border border-[#1313181A] text-sm rounded-lg block w-full p-5"
                placeholder="Enter the price"
              />
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}
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
              {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
            </div>
            <div className="col-span-2" data-aos="fade-right">
              <label className="font-bold text-xl">Image</label>
              <input
                {...register("image", { required: "Image is required" })}
                type="file"
                className="mt-2 border border-[#1313181A] w-full p-3 rounded-xl"
              />
              {errors.image && <p className="text-red-500">{errors.image.message}</p>}
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

export default AddMeals;
