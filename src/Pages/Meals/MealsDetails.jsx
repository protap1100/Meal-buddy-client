import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import Loading from "../../Others/Loading";

const MealsDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const { data: meal = [], isPending: loading } = useQuery({
    queryKey: ["meal"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals/${id}`);
      return res.data;
    },
  });
//   console.log(meal)

  loading && <Loading></Loading>;

  return (
    <div>
      <SectionTitle heading="Meal Details" subHeading=""></SectionTitle>
    </div>
  );
};

export default MealsDetails;
