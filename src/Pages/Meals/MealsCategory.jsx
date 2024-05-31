const MealsCategory = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item._id}>
            {item.title}
        </div>
      ))}
    </div>
  );
};

export default MealsCategory;
