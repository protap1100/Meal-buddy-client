import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../../Others/Loading";

const ServedMeals = () => {
  const axiosPublic = useAxiosPublic();

  const { data: serving = [], isLoading } = useQuery({
    queryKey: ["serving"],
    queryFn: async () => {
      const res = await axiosPublic.get("/servingMeals");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <SectionTitle
        heading="Serving Meals"
        subHeading="Meals Are About to be served"
      ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border text-center">#</th>
              <th className="py-2 px-4 border text-center">Name</th>
              <th className="py-2 px-4 border text-center">Image</th>
              <th className="py-2 px-4 border text-center">Category</th>
              <th className="py-2 px-4 border text-center">Description</th>
              <th className="py-2 px-4 border text-center">Rating</th>
              <th className="py-2 px-4 border text-center">Likes</th>
              <th className="py-2 px-4 border text-center">Price</th>
              <th className="py-2 px-4 border text-center">Email</th>
              <th className="py-2 px-4 border text-center">Serving Meals</th>
            </tr>
          </thead>
          <tbody>
            {serving.map((m, index) => (
              <tr key={m._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border text-center">{m.title}</td>
                <td className="py-2 px-4 border flex justify-center">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={m.image}
                          alt="Meal"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border text-center">{m.category}</td>
                <td className="py-2 px-4 border text-center">{m.description}</td>
                <td className="py-2 px-4 border text-center">{m.rating}</td>
                <td className="py-2 px-4 border text-center">{m.likes}</td>
                <td className="py-2 px-4 border text-center">{m.price}</td>
                <td className="py-2 px-4 border text-center">{m.email}</td>
                <td className="py-2 px-4 border text-center">{m.ServingStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServedMeals;
