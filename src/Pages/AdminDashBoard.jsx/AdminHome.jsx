import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Shared/SectionTitle";
import Loading from "../../Others/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: adminState = [], isPending: loading } = useQuery({
    queryKey: ["adminState"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin-state`);
      return res.data;
    },
  });
  if (loading) {
    return <Loading></Loading>;
  }

  let totalRevenue = 0 
  const money = adminState.payment;
  for(const dollar of money ){
    totalRevenue = dollar.price + totalRevenue;
  }

  return (
    <>
      <SectionTitle
        heading="Welcome To Dashboard"
        subHeading="See state about your website"
      />
      <div className="flex justify-center items-center mt-10">
        {adminState && (
          <div className=" shadow grid grid-cols-3 rounded gap-3 ">
            <div className="stat rounded bg-primary">
              <div className="stat-title text-center">Users</div>
                <div className="stat-value text-center gap-2">{adminState?.users.length} </div>
            </div>
            <div className="stat rounded bg-secondary">
              <div className="stat-figure text-secondary"></div>
              <div className="stat-title text-center">Total Meals</div>
              <div className="stat-value text-center">{adminState?.meals.length}</div>
            </div>
            <div className="stat rounded bg-accent">
              <div className="stat-figure text-secondary">
              </div>
              <div className="stat-title text-center">Served Meals</div>
              <div className="stat-value text-center">{adminState?.served.length}</div>
            </div>
            <div className="stat rounded bg-error">
              <div className="stat-figure text-secondary">
              </div>
              <div className="stat-title text-center">Total Meal Reviews</div>
              <div className="stat-value text-center">{adminState?.review.length}</div>
            </div>
            <div className="stat rounded bg-info">
              <div className="stat-figure text-secondary">
              </div>
              <div className="stat-title text-center">Total Payment s By User</div>
              <div className="stat-value text-center">{adminState?.payment.length}</div>
            </div>
            <div className="stat rounded bg-success">
              <div className="stat-figure text-secondary">
              </div>
              <div className="stat-title text-center">Total Revenue</div>
              <div className="stat-value text-center">
              {totalRevenue.toFixed(2)}$
              </div>
            </div>
            <div className="stat rounded bg-secondary">
              <div className="stat-figure text-secondary">
              </div>
              <div className="stat-title text-center">Total Messages</div>
              <div className="stat-value text-center">{adminState?.contacts.length}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminHome;
