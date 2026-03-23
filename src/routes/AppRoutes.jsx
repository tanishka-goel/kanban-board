import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import ProtectedRoute from "./ProtectedRoutes";
import MainLayout from "../layout/MainLayout";
import Profile from "@/pages/Profile";
import AllWorkspace from "@/pages/user/AllWorkspace";
import Activity from "@/pages/Activity";
import ManageUsers from "@/pages/admin/ManageUsers";
import WorkspaceDashboard from "@/pages/user/WorkspaceDashboard";
import { useVisibleWorkspace } from "@/hooks/useVisibleWorkspaces";
import AdminAllWorkspaces from "@/pages/admin/AdminAllWorkspaces";

const AppRoutes = () => {
  const {user, visibleWorkspaces} = useVisibleWorkspace()
  // console.log("vw in ap", visibleWorkspaces)
  // console.log("user in ap", user)
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
              <Route path="/admin/all-workspaces" element={<AdminAllWorkspaces />} />
               <Route path="/admin/all-workspaces/:workspaceId" element={<WorkspaceDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRole="user" />}>
              <Route path="/for-you" element={<UserDashboard />} />
              <Route path="/your-workspaces" element={<AllWorkspace />} />
              <Route path={"/your-workspaces/:workspaceId"} element={<WorkspaceDashboard/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
