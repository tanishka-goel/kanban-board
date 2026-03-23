import { Clock, List } from "lucide-react";
import React from "react";

const StatusCard = ({ status, icon, color, stats, col }) => {
  return (

    
    <div className="bg-white transition-all hover:shadow-accent duration-300 hover:scale-102 rounded-2xl p-3 shadow-2xl">
        <div className={`${color} w-full p-1 animate-pulse mb-2 h-2`}/>

        <div className="flex justify-evenly w-auto">
      <div
        className={`${color} w-20 h-20 flex items-center justify-center rounded-full`}
      >
        {icon}
      </div>
      <div className="items-center text-center mt-3">
        <h1 className={`${col} text-xl font-bold`}>{stats ?? 6}</h1>
        <h1 className={` text-md text-gray-400 font-medium`}>{status}</h1>
      </div>
      </div>
    </div>
  );
};

export default StatusCard;
