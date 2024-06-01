import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="text-center my-40">
      <ReactLoading type='spin' color='#8ecae6'  height={200} width={150} />
    </div>
  );
};

export default Loading;
