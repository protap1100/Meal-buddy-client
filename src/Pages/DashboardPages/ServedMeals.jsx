import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../../Others/Loading";

const ServedMeals = () => {
  const axiosPublic = useAxiosPublic();

  const { data: serving = [], isLoading} = useQuery({
    queryKey: ["serving"],
    queryFn: async () => {
      const res =await axiosPublic.get("/servingMeals");
      return res.data;
    },
  });


//   console.log(serving);

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
          <table className="table text-xl">
            <thead>
              <tr className="text-lg">
                <th className="text-center">#</th>
                <th className="text-center">Name</th>
                <th className="text-center">Image</th>
                <th className="text-center">Category</th>
                <th className="text-center">Description</th>
                <th className="text-center">Rating</th>
                <th className="text-center">Likes</th>
                <th className="text-center">Price</th>
                <th className="text-center">Email</th>
                <th className="text-center">ServingMeals</th>
              </tr>
            </thead>
            <tbody>
              {serving.map((m, index) => (
                <tr key={m._id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{m.title}</td>
                  <td className="flex justify-center">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={m.image}
                            alt="Meal"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{m.category}</td>
                  <td className="text-center">{m.description}</td>
                  <td className="text-center">{m.rating}</td>
                  <td className="text-center">{m.likes}</td>
                  <td className="text-center">{m.price}</td>
                  <td className="text-center">{m.email}</td>
                  <td className="text-center">{m.ServingStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default ServedMeals;
