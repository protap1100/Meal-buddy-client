import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useCart = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    data: meal = [],
    isPending: CartLoading,
    refetch,
  } = useQuery({
    queryKey: ["meal"],
    queryFn: async () => {
      const res = await axiosPublic.get(`sServingMeals/${user?.email}`);
      return res.data;
    },
  });

  return [meal, CartLoading, refetch];
};

export default useCart;
