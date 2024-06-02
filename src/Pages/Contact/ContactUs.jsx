import { useForm } from "react-hook-form";
import Aos from "aos";
import "aos/dist/aos.css";
import image1 from "../../assets/ContactUs/icons/Group 1171275317.png";
import image2 from "../../assets/ContactUs/icons/Group 1171275318.png";
import image3 from "../../assets/ContactUs/icons/Group 1171275321.png";
import { useEffect } from "react";
// import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useAuth from "../../Hooks/useAuth";

const ContactUs = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const customData = {
      ...data,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      userName: user?.displayName,
      date: new Date()
    };
    fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(customData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Good job!",
            text: "Thank You For Contacting Us",
            icon: "success",
          });
          // <Navigate state={location.pathname} to="/allRoom"></Navigate>;
        }
      });
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      {/* <Helmet>
        <link
          rel="icon"
          type="image/png"
          href="/src/assets/images/titleIcon/contact.png"
        />
        <title>Contact Us</title>
      </Helmet> */}
      <SectionTitle
        heading="Get in Touch"
        subHeading="Get in touch with us! Fill out the form below for personalized
          assistance and quick responses to your inquiries"
      ></SectionTitle>
      <section className="container mx-auto my-5 bg-gradient-to-r from-indigo-400 from-10% via-sky-200 via-30% to-emerald-200 to-90% rounded-xl ">
        <div className="border-dashed border mt-8 border-[#13131833] lg:mx-0 mx-2"></div>

        <div className="mt-8 lg:flex px-5" data-aos="fade-right">
          <div
            className="flex-grow-0 p-12 border border-[#1313181A] space-y-2 rounded-2xl"
            data-aos="fade-right"
          >
            <div
              className="bg-[#bced6e1a] rounded-xl p-5 flex flex-col  lg:items-start items-center"
              data-aos="fade-right"
            >
              <img src={image1} alt="" />
              <p className="mt-10">Phone Number</p>
              <h1 className="mt-2 font-extrabold">+8801957290864</h1>
            </div>
            <div
              className="bg-[#fddb5f1a] rounded-xl  p-5 flex flex-col  lg:items-start items-center"
              data-aos="fade-right"
            >
              <img src={image2} alt="" />
              <p className="mt-10">Email</p>
              <h1 className="mt-2 font-extrabold">protapb23@gmail.com</h1>
            </div>
            <div
              className="bg-[#629cf31a] rounded-xl p-5 flex flex-col  lg:items-start items-center"
              data-aos="fade-right"
            >
              <img src={image3} alt="" />
              <p className="mt-10">Location</p>
              <h1 className="mt-2 font-extrabold">Savar,Dhaka 1353</h1>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-grow"
            data-aos="fade-right"
          >
            <div className="grid gap-6 mb-6 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 px-10">
              <div className=" col-span-2 lg:col-span-1" data-aos="fade-right">
                <label className="font-bold text-xl">First name</label>
                <input
                  {...register("firstName")}
                  type="text"
                  className="mt-2 border border-[#1313181A] text-sm rounded-lg  block w-full p-5 "
                  placeholder="Enter Your Full Name"
                  required
                />
              </div>
              <div className="col-span-2 lg:col-span-1" data-aos="fade-right">
                <label className="font-bold text-xl">Your Email</label>
                <input
                  {...register("email")}
                  type="text"
                  className="mt-2 border border-[#1313181A] text-sm rounded-lg  block w-full p-5 "
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className=" col-span-2 lg:col-span-1" data-aos="fade-right">
                <label className="font-bold text-xl">Subject</label>
                <input
                  {...register("subject")}
                  type="text"
                  className="mt-2 border border-[#1313181A] text-sm rounded-lg  block w-full p-5 "
                  placeholder="Enter Your Subject"
                  required
                />
              </div>
              <div className=" col-span-2 lg:col-span-1" data-aos="fade-right">
                <label className="font-bold text-xl">Phone</label>
                <input
                  {...register("phone")}
                  type="text"
                  className="mt-2 border border-[#1313181A] text-sm rounded-lg  block w-full p-5 "
                  placeholder="Enter Your Phone"
                  required
                />
              </div>
              <div className="col-span-2" data-aos="fade-right">
                <label className="font-bold text-xl">Your Message</label>
                <textarea
                  {...register("message")}
                  className="mt-2 border border-[#1313181A] text-sm rounded-lg p-5 w-full lg:h-[400px]"
                  placeholder="Your Message"
                ></textarea>
              </div>
            </div>
            <div className="px-10">
              <button
                type="submit"
                className="text-center mt-3 p-2 border-b-4 bg-blue-400 border-blue-400 w-full hover:bg-blue-200 text-white rounded-xl my-2 hover:border-blue-300 transition-all duration-700 ease-in-out"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
