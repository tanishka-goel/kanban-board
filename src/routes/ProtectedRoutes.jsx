import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({allowedRole}) => {
    const {isAuthenticated, role} = useSelector((state)=>state.auth);
    if(!isAuthenticated){
      return <Navigate to="/" replace />
    }

    if(allowedRole && role!==allowedRole){
      return <Navigate to="*" replace />;
    }

  return <Outlet/>
}

export default ProtectedRoute