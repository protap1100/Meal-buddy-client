import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMeals from "../../Hooks/useMeals";
import Loading from "../../Others/Loading";
import SectionTitle from "../../Components/Shared/SectionTitle";
import MealsCategory from "./MealsCategory";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Meals = ({ children }) => {
  const [meals, loading] = useMeals();
  const [name, setName] = useState("");
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const axiosPublic = useAxiosPublic();

  const handleSearch = async () => {
    setLoading2(true);
    try {
      const response = await axiosPublic.get(`searchMeals?title=${name}`);
      setFilteredMeals(response.data);
    } catch (error) {
      console.error("Error filtering meals:", error);
    }
    setLoading2(false);
  };

  const handleFilter = async () => {
    setLoading2(true);
    try {
      const response = await axiosPublic.get(
        `filterMeals?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      console.log("Response data:", response.data);
      setFilteredMeals(response.data);
    } catch (error) {
      console.error("Error filtering rooms:", error);
    }
    setLoading2(false);
  };

  const displayedMeals = filteredMeals.length > 0 ? filteredMeals : meals;

  if (loading || loading2) {
    return <Loading />;
  }

  return (
    <div>
      <SectionTitle heading="Our Menu" subHeading="Choose Your Favorite Food" />
      <div className="">
        {/* Search Functionality */}
        <p className="text-center text-2xl mt-5">Search Meal By price</p>
        <div className="mt-10 flex items-center justify-center">
          <div className="flex items-center gap-4  space-x-2">
            <input
              type="text"
              placeholder="Search Your Meal"
              className="p-1 lg:p-2 text-black rounded border border-1"
              name="searchMeal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="p-2 lg:p-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>
        {/*Price Sorting Search Functionality */}
        <p className="text-center text-2xl mt-5">Filter Meal By Price Range</p>
        <div className="mt-2 flex flex-col lg:flex-row justify-center lg:gap-1 gap-4">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-400 rounded-md py-1 px-3"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-400 rounded-md py-1 px-3 ml-2"
          />
          <button
            onClick={handleFilter}
            className="p-2 lg:p-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>
      <div className="mt-10 text-center">
        <Tabs>
          <TabList>
            <Tab>All Meals</Tab>
            <Tab>Breakfast</Tab>
            <Tab>Lunch</Tab>
            <Tab>Dinner</Tab>
          </TabList>
          <TabPanel>
            <MealsCategory items={displayedMeals} />
          </TabPanel>
          <TabPanel>
            <MealsCategory
              items={displayedMeals.filter(
                (item) => item.category === "Breakfast"
              )}
            />
          </TabPanel>
          <TabPanel>
            <MealsCategory
              items={displayedMeals.filter((item) => item.category === "Lunch")}
            />
          </TabPanel>
          <TabPanel>
            <MealsCategory
              items={displayedMeals.filter(
                (item) => item.category === "Dinner"
              )}
            />
          </TabPanel>
        </Tabs>
      </div>
      {children && <div className="my-10 text-center">{children}</div>}
    </div>
  );
};

export default Meals;
