import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import ProtectedRoute from "./ProtectedRoutes";
import MainLayout from "../layout/MainLayout";
import Profile from "@/pages/Profile";
import Workspace from "@/pages/user/Workspace";
import Activity from "@/pages/Activity";
import ManageUsers from "@/pages/admin/ManageUsers";

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
           <Route path="/activity" element={<Activity/>}/>
            <Route element={<ProtectedRoute allowedRole="admin" />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/manage-users" element={<ManageUsers />} />
            </Route>

            <Route element={<ProtectedRoute allowedRole="user" />}>
              <Route path="/for-you" element={<UserDashboard />} />
              <Route path="/your-workspaces" element={<Workspace />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
