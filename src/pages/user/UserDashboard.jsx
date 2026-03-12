import UserGreeting from "@/components/shared/skeletons/UserGreeting";
import { loginThunk } from "@/features/auth/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  // console.log("user: ", user);
  // console.log(user?.first_name);

  // console.log("Error", error)
  const date = new Date()
  const formattedDate = date.toLocaleDateString('en-US',{
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (isLoading) return (
    <div>
      <UserGreeting/>
    </div>
  )
  return (
    <div className="p-2">
      
      <div className="w-full rounded-2xl h-30 p-5 shadow-lg shadow-gray-400 bg-white border-8 border-blue-200">
        <p className="text-black text-sm">{formattedDate}</p>
        <h1 className="text-2xl text-black font-semibold">Hello, {user?.first_name} {user?.last_name}</h1>
      </div>
    </div>
  );
};

export default UserDashboard;
