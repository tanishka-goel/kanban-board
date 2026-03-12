import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/dashboards/AdminDashboard";
import UserDashboard from "../pages/dashboards/UserDashboard";
import ProtectedRoute from "./ProtectedRoutes";
import MainLayout from "../layout/MainLayout";
import Profile from "@/pages/Profile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login />} />
           {/* <Route element={<MainLayout />}>
           <Route path="/for-you" element={<UserDashboard />} />
           <Route path="/profile" element={<Profile/>}/>
           </Route> */}
         
        {/* <Route path="/register" element={<Register/>}/> */}

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
           <Route path="/profile" element={<Profile/>}/>
            <Route element={<ProtectedRoute allowedRole="admin" />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRole="user" />}>
              <Route path="/for-you" element={<UserDashboard />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
