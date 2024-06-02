import { useContext, useState } from "react";
import SectionTitle from "../../Components/Shared/SectionTitle";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const newDisplayName = formData.name;
    const newPhotoURL = formData.photoURL;

    updateUserProfile(newDisplayName, newPhotoURL)
      .then(() => {
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div>
      <SectionTitle
        heading={`Welcome Back ${user?.displayName}`}
        subHeading={"Upgrade Your Profile Here"}
      ></SectionTitle>
      <div className="mt-10">
        <div className="flex flex-col justify-center items-center my-10">
          <img
            className="h-72 w-72 mt-5 rounded-xl"
            src={user?.photoURL || "default-photo-url.jpg"} 
            alt="User Profile"
          />
        </div>
        <div className="py-5 flex items-center justify-center rounded-xl flex-col">
          <div className="shrink-0 w-2/3 lg:w-2/4 py-5 border rounded-xl px-2 lg:px-20 bg-base-100 ">
            <form
              onSubmit={handleUpdateProfile}
              className="my-10 border border-btn flex flex-col justify-center rounded-xl items-center "
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Current Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter New Name"
                  className="input input-bordered"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Current Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  value={formData.photoURL}
                  placeholder="Enter New Photo URL"
                  className="input input-bordered"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button className="text-center mt-3 p-2 border-b-4 border-blue-200 hover:bg-blue-200 hover:text-white rounded-xl my-2 hover:border-blue-300 transition-all duration-700 ease-in-out">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
