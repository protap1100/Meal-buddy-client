import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Review = () => {

    const axiosPublic = useAxiosPublic();

    const {data: review = [] } = useQuery({
        queryKey : ['reviews'],
        queryFn : async () =>{
            const res = await axiosPublic.get('/reviews')
            return res.data
        }
    })

    console.log(review)


    return (
        <div>
            <SectionTitle heading='Reviews About Food' subHeading="User's Review's On Specific Meals"></SectionTitle>
            <div className="mt-10">

            </div>
        </div>
    );
};

export default Review;