import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SectionTitle from "../../Components/Shared/SectionTitle";
import loginImg from "../../assets/Authentications_image/Login.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "Login Successful",
          text: "Login Successful",
          icon: "success",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch(() => {
        // console.log(error,'Kaj Hocche na ')
        toast.error("Wrong Password or Email Please Try again");
        // setErrorMessage(error.message)
      });
  };

  return (
    <div>
      <SectionTitle
        heading="Login Here"
        subHeading="Use Email And Password to Join"
      ></SectionTitle>
      <div className="mt-10 flex flex-col lg:flex-row justify-center items-center">
        <div className="flex-1">
          <img className="rounded" src={loginImg} alt="" />
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                {...register("email", { required: true })}
                required
              />
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
              <button className="p-2 bg-button hover:bg-hover text-white font-bold rounded">
                Login In
              </button>
              <div className="mt-2">
                <SocialLogin></SocialLogin>
              </div>
            </div>
          </form>
          <div className="text-center">
            Want to Join Us?
            <Link className="font-bold text-green-500" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
