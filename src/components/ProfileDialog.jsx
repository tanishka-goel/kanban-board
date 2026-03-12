import React from "react";
import { Link } from "react-router-dom";

const ProfileDialog = () => {
  return (
    <div className="absolute right-0 top-full mt-2 bg-white p-2 rounded-3xl w-72 shadow-2xl shadow-gray-500 border border-gray-500 backdrop-blur-sm animate-in fade-in slide-in-from-top-1 duration-300 ease-out origin-top-right">
      <div>
        <div className="flex items-center gap-4 p-4 pb-3">
          <div className="shrink-0 bg-purple-700 rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-xl font-bold text-white ">
              AB
            </span>
          </div>

          <div className="overflow-hidden">
            <h1 className="text-lg font-bold text-gray-950 truncate">Name</h1>
            <h2 className="text-sm text-gray-500 truncate">Email</h2>
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

          <Link
            to="/login"
            className="flex items-center gap-3.5 p-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDialog;