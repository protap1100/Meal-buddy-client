import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../Components/Shared/SectionTitle";
import registerImg from "../../assets/Authentications_image/Registration.jpg";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [regSuccess, setRegSuccess] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const photoUrl = data.photoUrl;
    console.log(name, email, photoUrl, password);

    if (!/(?=.*[a-z])/.test(password)) {
      setRegSuccess("");
      toast.error('Password must contain at least one lowercase letter', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setRegSuccess("");
      toast.error('Password must contain at least one uppercase letter', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else if (password.length < 6) {
      setRegSuccess("");
      toast.error('Password must be 6 character or higher', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      createUser(email, password)
        .then((result) => {
          console.log(result.user, "user");
          updateUserProfile(name, photoUrl)
            .then(() => {
              const userInfo = {
                name: data.name,
                email: data.email,
                badge: "Bronze",
              };
              axiosPublic.post("/users", userInfo).then((res) => {
                console.log("user added to the database");
                if (res.data.insertedId) {
                  reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Created Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/");
                }
              });
            })
            .catch((error) => console.log(error));
        })
        .then((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <SectionTitle
        heading="Register Here"
        subHeading="Fill Up The Form To Join Us"
      ></SectionTitle>
      <div className="mt-10 flex flex-col lg:flex-row justify-center items-center">
        <div className="flex-1">
          <img className="rounded" src={registerImg} alt="" />
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">Enter Your Name Please</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">Enter Your Email Please</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoUrl</span>
              </label>
              <input
                type="text"
                placeholder="PhotoUrl"
                {...register("photoUrl", { required: true })}
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">Enter Your Photo Please</span>
              )}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative animate__animated animate__fadeInDown">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="input animate__animated animate__fadeInDown input-bordered w-full"
                  required
                />
                <span
                  className="absolute animate__animated animate__fadeInDown inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <FaEye className="text-gray-800 text-2xl cursor-pointer" />
                  ) : (
                    <FaEyeSlash className="text-gray-800 text-2xl cursor-pointer" />
                  )}
                </span>
                {errors.name && (
                  <span className="text-red-600">Enter Your Photo Please</span>
                )}
              </div>
            </div>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="p-2 bg-button hover:bg-hover text-white font-bold rounded"
              >
                Sign Up
              </button>
            </div>
          </form>
          <span>{regSuccess}</span>
          <div className="text-center">
            Already Have An Account
            <Link className="font-bold text-green-500" to="/login">
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
