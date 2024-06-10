import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/home/01.jpg";
import img2 from "../../assets/home/02.jpg";
import img3 from "../../assets/home/03.png";
import img4 from "../../assets/home/04.jpg";
import img5 from "../../assets/home/05.png";
import img6 from "../../assets/home/06.png";

const Banner = () => {

  return (
    <div className="my-10">
      <Carousel>
        {[img1, img2, img3, img4, img5, img6].map((img, index) => (
          <div key={index} className="relative">
            <img src={img} alt={`Slide ${index + 1}`} />
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
              <h2 className="text-white text-xs lg:text-4xl font-bold bg-black bg-opacity-50 p-4 rounded">
                Search Your Favorite Food
              </h2>
              <h2 className="text-white lg:text-lg text-xs w-full lg:w-1/3 font-bold bg-black bg-opacity-50 p-4 rounded">
                Discover Delicious Meals: Search and buy your favorite dishes
                effortlessly. Enjoy a wide variety of mouth-watering options
                delivered straight to your door. Your next meal is just a click
                away!
              </h2>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
