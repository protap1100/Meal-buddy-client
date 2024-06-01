import { SocialIcon } from "react-social-icons";
import logo from '../../assets/Logo/Logo1.png'

const Footer = () => {
  return (
    <div className="bg-gray-800 mt-10 text-white py-5 rounded-xl">
      <footer>
        <div className="flex justify-center gap-10 my-3 items-center">
          <h1>About Our Meals</h1>
          <img className="h-10 w-20 rounded-xl" src={logo} alt="" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4 text-center">
            <h2 className="font-medium">Our Menu</h2>
            <div className="flex flex-col space-y-2 text-sm">
              <a href="#">View Meals</a>
              <a href="#">Categories</a>
              <a href="#">Special Offers</a>
              <a href="#">Order Now</a>
            </div>
          </div>

          <div className="space-y-4  text-center">
            <h2 className="font-medium">Discover Recipes</h2>
            <div className="flex flex-col space-y-2 text-sm">
              <a href="#">Popular Recipes</a>
              <a href="#">Latest Additions</a>
              <a href="#">Cooking Tips</a>
              <a href="#">Submit Your Recipe</a>
            </div>
          </div>
          <div className="space-y-4  text-center">
            <h2 className="font-medium">About Us</h2>
            <div className="flex flex-col space-y-2 text-sm">
              <a href="#">Our Story</a>
              <a href="#">Our Chefs</a>
              <a href="#">Events & News</a>
              <a href="#">Customer Reviews</a>
            </div>
          </div>

          <div className="space-y-4  text-center">
            <h2 className="font-medium">Connect With Us</h2>
            <div className="flex flex-col space-y-2 text-sm">
              <a href="#">Contact Us</a>
              <a href="#">FAQs</a>
              <a href="#">Subscribe to Newsletter</a>
              <a href="#">Follow Us on Social Media</a>
            </div>
          </div>
        </div>

        <div className="rounded-xl text-center p-9">
          <div className="flex justify-center mt-5 gap-5">
            <h1 href="#">
              <i className="text-2xl">
                <SocialIcon url="https://facebook.com" />{" "}
              </i>
            </h1>
            <h1 href="#">
              <i className="text-2xl">
                <SocialIcon url="https://instagram.com" />
              </i>
            </h1>
            <h1 href="#">
              <i className="text-2xl">
                <SocialIcon url="https://twitter.com" />
              </i>
            </h1>
            <h1 href="#">
              <i className="text-2xl">
                <SocialIcon url="https://github.com" />
              </i>
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center  text-sm">
          <span>
            &copy; {new Date().getFullYear()} Meal Buddy. All Rights
            Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
