import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useUser = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
// console.log(user)
  const {
    data: singleUser,
    isPending: loading3,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled : !!user,
  });
  return [singleUser, loading3, refetch];
};

export default useUser;
