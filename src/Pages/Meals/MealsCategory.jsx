import MealsCard from "./MealsCard";

const MealsCategory = ({ items }) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
      {items.map((item) => (
        <MealsCard key={item._id} item={item}></MealsCard>
      ))}
    </div>
  );
};

export default MealsCategory;
