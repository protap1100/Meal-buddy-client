import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminTopbar from "./AdminTopbar";

const AdminDashboard = () => {
  return (
    <>
    <div>
        <AdminTopbar></AdminTopbar>
    </div>
      <div className="mt-5 flex gap-5">
        <div className="w-1/6">
          <AdminNavbar></AdminNavbar>
        </div>
        <div className="w-5/6 bg-blue-50">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
