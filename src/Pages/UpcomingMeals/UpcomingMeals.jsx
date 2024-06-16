import SectionTitle from "../../Components/Shared/SectionTitle";
import useUpcomingMeals from "../../Hooks/useUpcomingMeals";
import Loading from "../../Others/Loading";
import UpcomingMealsCard from "./UpcomingMealsCard";

const UpcomingMeals = () => {
  const [upcomingMeal, loading, refetch] = useUpcomingMeals();

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <SectionTitle
        heading="Upcoming Meals"
        subHeading="Meals Are About To Come"
      ></SectionTitle>
      <div className="grid lg:grid-cols-3 grid-cols-1 md-grid-cols-2 gap-5 ">
        {
            upcomingMeal.map(item =><UpcomingMealsCard key={item._id} refetch={refetch} item={item}></UpcomingMealsCard>)
        }
      </div>
    </div>
  );
};

export default UpcomingMeals;
