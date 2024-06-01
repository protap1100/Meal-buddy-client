import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMeals from "../../Hooks/useMeals";
import Loading from "../../Others/Loading";
import SectionTitle from "../../Components/Shared/SectionTitle";
import MealsCategory from "./MealsCategory";

const Meals = () => {
  const [meal, loading, ,] = useMeals();
  const Breakfast = meal.filter((item) => item.category === "Breakfast");
  const Lunch = meal.filter((item) => item.category === "Lunch");
  const dinner = meal.filter((item) => item.category === "Dinner");
  console.log(dinner);
  console.log(Breakfast);
  console.log(Lunch);

  loading && <Loading></Loading>;

  return (
    <div>
      <SectionTitle
        heading="Our Menu"
        subHeading="Choose Your Favorite Food"
      ></SectionTitle>
      <div className="mt-10 text-center">
        <Tabs>
          <TabList>
            <Tab>All Meals</Tab>
            <Tab>Breakfast</Tab>
            <Tab>Lunch</Tab>
            <Tab>Dinner</Tab>
          </TabList>
          <TabPanel>
            <MealsCategory items={meal}></MealsCategory>
          </TabPanel>
          <TabPanel>
            <MealsCategory items={Breakfast}></MealsCategory>
          </TabPanel>
          <TabPanel>
            <MealsCategory items={Lunch}></MealsCategory>
          </TabPanel>
          <TabPanel>
            <MealsCategory items={dinner}></MealsCategory>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Meals;
