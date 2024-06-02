import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminTopbar from "./AdminTopbar";

const AdminDashboard = () => {
  return (
    <>
    <div>
        <AdminTopbar></AdminTopbar>
    </div>
      <div className=" flex gap-5">
        <div className="w-1/4">
          <AdminNavbar></AdminNavbar>
        </div>
        <div className="w-3/4 bg-blue-400">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
