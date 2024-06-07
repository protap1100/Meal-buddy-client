import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMeals from "../../Hooks/useMeals";
import Loading from "../../Others/Loading";
import SectionTitle from "../../Components/Shared/SectionTitle";
import MealsCategory from "./MealsCategory";

const Meals = ({ limit, children }) => {
  const [meal, loading] = useMeals();
  const Breakfast = meal.filter((item) => item.category === "Breakfast");
  const Lunch = meal.filter((item) => item.category === "Lunch");
  const dinner = meal.filter((item) => item.category === "Dinner");

  if (loading) {
    return <Loading/>;
  }

  const displayedMeals = meal.slice(0, limit);
  // console.log(meal);

  return (
    <div>
      <SectionTitle heading="Our Menu" subHeading="Choose Your Favorite Food" />
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
            <MealsCategory items={Breakfast} />
          </TabPanel>
          <TabPanel>
            <MealsCategory items={Lunch} />
          </TabPanel>
          <TabPanel>
            <MealsCategory items={dinner} />
          </TabPanel>
        </Tabs>
      </div>
      {children && <div className="my-10 text-center">{children}</div>}
    </div>
  );
};

export default Meals;
