import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import Loading from "../Others/Loading";

const AdminRouter = ({children}) => {
    const {user,loading}= useAuth();
    const [isAdmin,isAdminLoading] = useAdmin();
    if(loading || isAdminLoading){
        return <Loading type='bubbles'></Loading>
    }

    if(user && isAdmin){
        return children;
    }
    return <Navigate state={location.pathname} to="/"></Navigate>;
};

export default AdminRouter;