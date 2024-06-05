import SectionTitle from "../../../Components/Shared/SectionTitle";
import useCart from "../../../Hooks/useCart";
import Loading from "../../../Others/Loading";

const UserCart = () => {

    const [meal,loading,refetch] = useCart();

    console.log(meal)
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div>
            <SectionTitle heading='Your Cart Item' subHeading='Item You Have Sended Request'></SectionTitle>
        </div>
    );
};

export default UserCart;