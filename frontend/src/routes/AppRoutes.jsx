import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import ProtectedRoute from "./ProtectedRoutes";
import MainLayout from "../layout/MainLayout";
import AllWorkspace from "@/pages/user/AllWorkspace";
import ManageUsers from "@/pages/admin/ManageUsers";
import WorkspaceDashboard from "@/pages/user/WorkspaceDashboard";
import AdminAllWorkspaces from "@/pages/admin/AdminAllWorkspaces";
import React, { Suspense } from "react";
import WorkspaceSkeleton from "@/components/shared/skeletons/WorkspaceSkeleton";
import ChatLayout from "@/pages/chatRoom/ChatLayout";
import Notifications from "@/pages/Test";
import Test from "@/pages/Test";

const Profile = React.lazy(() => import("../pages/Profile"));
const Activity = React.lazy(() => import("../pages/Activity"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
          <Route path="/notifications" element={<Notifications/>}/>
            <Route
              path="/profile"
              element={
                <Suspense fallback={<WorkspaceSkeleton />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="/activity"
              element={
                <Suspense>
                  <Activity />
                </Suspense>
              }
            />

            <Route path="/test" element={<Test/>}/>
            <Route path="/chats" element={<ChatLayout />} />
            <Route path="/chats/:userId" element={<ChatLayout />} />
            <Route element={<ProtectedRoute allowedRole="admin" />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/manage-users" element={<ManageUsers />} />
              <Route
                path="/admin/all-workspaces"
                element={<AdminAllWorkspaces />}
              />
              <Route
                path="/admin/all-workspaces/:workspaceId"
                element={<WorkspaceDashboard />}
              />
            </Route>

            <Route element={<ProtectedRoute allowedRole="user" />}>
              <Route path="/for-you" element={<UserDashboard />} />
              <Route path="/your-workspaces" element={<AllWorkspace />} />
              <Route
                path={"/your-workspaces/:workspaceId"}
                element={<WorkspaceDashboard />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
