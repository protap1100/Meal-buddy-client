import { useQuery } from '@tanstack/react-query'
// import { useEffect, useState } from "react";
import useAxiosSecure from './useAxiosSecure';

const useUpcomingMeals = () => {
  const axiosSecure = useAxiosSecure();
  // const [isAdmin, isAdminLoading] = useAdmin()

  const {
    data: upcomingMeal = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ['upcomingMeals'],
    // enabled: !isAdminLoading && !!isAdmin?.admin,
    queryFn: async () => {
        const res = await axiosSecure.get('/upcomingMeals')
        console.log(res);
        return res.data
    },
  })

  return [upcomingMeal, loading, refetch]
}

export default useUpcomingMeals
