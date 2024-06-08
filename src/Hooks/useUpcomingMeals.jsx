import { useQuery } from '@tanstack/react-query'
// import { useEffect, useState } from "react";
import useAxiosPublic from './useAxiosPublic';

const useUpcomingMeals = () => {
  const axiosPublic = useAxiosPublic();
  // const [isAdmin, isAdminLoading] = useAdmin()

  const {
    data: upcomingMeal = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ['upcomingMeals'],
    // enabled: !isAdminLoading && !!isAdmin?.admin,
    queryFn: async () => {
        const res = await axiosPublic.get('/upcomingMeals')
        // console.log(res);
        return res.data
    },
  })

  return [upcomingMeal, loading, refetch]
}

export default useUpcomingMeals
