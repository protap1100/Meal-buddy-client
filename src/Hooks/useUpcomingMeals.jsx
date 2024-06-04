import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useUpcomingMeals = () => {
  const axiosPublic = useAxiosPublic();

  const {data: upcomingMeal =[] ,isPending : loading, refetch} = useQuery({
    queryKey: ['upcomingMeals'],
    queryFn : async() =>{
      const res = await axiosPublic.get('/upcomingMeals');
      return res.data;
    }
  })


  return [upcomingMeal,loading,refetch]


};

export default useUpcomingMeals;
