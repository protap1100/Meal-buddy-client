import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useMeals = () => {
  const axiosPublic = useAxiosPublic();

  const {data: meal =[] ,isPending : loading, refetch} = useQuery({
    queryKey: ['meal'],
    queryFn : async() =>{
      const res = await axiosPublic.get('/meals');
      return res.data;
    }
  })


  return [meal,loading,refetch]


};

export default useMeals;
