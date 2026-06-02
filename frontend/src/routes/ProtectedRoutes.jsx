import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({allowedRole}) => {
    const {isAuthenticated, role} = useSelector((state)=>state.auth);
    if(!isAuthenticated){
      return <Navigate to="/login" replace />
    }

    if(allowedRole && role!==allowedRole){
      return <Navigate to={role ==="admin"?"/admin/dashboard":"/for-you"} replace />;
    }

  return <Outlet/>
}

export default ProtectedRoute