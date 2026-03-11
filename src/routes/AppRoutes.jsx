import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminDashboard from "../pages/dashboards/AdminDashboard";
import UserDashboard from "../pages/dashboards/UserDashboard";
import ProtectedRoute from "./ProtectedRoutes";
import MainLayout from "../layout/MainLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register/>}/> */}

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
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
