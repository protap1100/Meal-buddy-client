import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="text-center my-40">
      <ReactLoading type='spinningBubbles' color='#3a86ff' height={"50%"} width={"50%"} />
    </div>
  );
};

export default Loading;
