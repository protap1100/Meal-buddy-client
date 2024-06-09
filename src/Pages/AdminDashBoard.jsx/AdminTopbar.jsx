import { Link } from "react-router-dom";
import logo from "../../assets/Logo/Logo1.png";
const AdminTopbar = () => {
  return (
    <>
      <div className="h-20 flex gap-20 items-center justify-center bg-red-200">
        <div>
         <Link className="text-xl font-bold" to='/'>Home</Link>
        </div>
        <div className="">
          <Link to="/">
            <img src={logo} className="h-8 w-20 rounded" alt="" />
          </Link>
        </div>
        <h1 className="text-center text-3xl">Welcome To Admin Dashboard</h1>
      </div>
    </>
  );
};

export default AdminTopbar;
