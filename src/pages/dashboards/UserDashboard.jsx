import { loginThunk } from "@/features/auth/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  console.log("user: ", user?.data);

  const date = new Date()

  const formattedDate = date.toLocaleDateString('en-US',{
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // useEffect(()=>{
  //     try{
  //         const user = dispatch(loginThunk()).unwrap()
  //         console.log("user: ", user?.data)
  //         return user
  //     } catch (error){
  //         console.log(error)
  //     }
  // },[dispatch])

  return (
    <div className="p-2">
      <div className="w-full rounded-2xl h-30 p-5 shadow-lg shadow-gray-400 bg-linear-to-br from-darkest via-primary to-light">
        <p className="text-white pb-3 text-sm">{formattedDate}</p>
        <h1 className="text-2xl text-white font-semibold">Hello, </h1>
      </div>
    </div>
  );
};

export default UserDashboard;
