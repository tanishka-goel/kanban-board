import { logout } from "@/features/auth/authSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ProfileDialog = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="absolute z-40 right-0 top-full mt-2 bg-white p-2 rounded-lg w-60 shadow-2xl shadow-gray-500 backdrop-blur-sm animate-in fade-in slide-in-from-top-1 duration-300 ease-out origin-top-right">
      <div>
        <div className="flex items-center gap-4 p-4 pb-3">
          <div className="shrink-0 bg-purple-700 rounded-full w-13 h-13 flex items-center justify-center">
            <span className="text-xl font-bold text-white ">
              {user?.first_name.slice(0, 1)}
              {user?.last_name.slice(0, 1)}
            </span>
          </div>

          <div className="overflow-hidden">
            <h1 className="text-lg font-bold text-gray-950 truncate">
              {user?.first_name} {user?.last_name}
            </h1>
            <h2 className="text-sm text-gray-500 truncate">{user.email}</h2>
          </div>
        </div>

        <div className="bg-gray-100 w-full h-px my-1"></div>

        <div className="space-y-1 pt-1">
          <Link
            to="/profile"
            className="flex items-center gap-3.5 p-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100/70 hover:text-gray-950 transition-colors duration-200"
          >
            Profile
          </Link>

          <div className="hover:bg-red-50">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3.5 p-3 rounded-xl text-sm font-semibold text-red-600 transition-colors duration-200"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDialog;
