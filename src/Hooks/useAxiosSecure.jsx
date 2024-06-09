import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "https://meal-buddy-server.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  // Request  Interceptor to add authorization header for every secure call to the api's
  useEffect(()=>{
    axiosSecure.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem('access-token')
        // console.log("Auth Token", token);
        // console.log("Request Stopped By Interceptor");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    ),
      // interceptor 401 and 403
      axiosSecure.interceptors.response.use(
        function (response) {
          return response;
        },
        async (error) => {
          const status = error.response.status;
          console.log("status error in the interceptor", status);
          console.log(error)
          // For 401 or 403 we are  login out the user
          if (status === 401 || status === 403) {
            await logOut();
            navigate("/login");
          }
          return Promise.reject(error);
        });
  
  },[logOut,navigate])
  return axiosSecure;
};

export default useAxiosSecure;
