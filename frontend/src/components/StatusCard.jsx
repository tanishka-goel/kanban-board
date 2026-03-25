import React from "react";

const StatusCard = ({ status, icon, color, stats, col }) => {
  return (
    <div className="bg-white transition-all duration-300 hover:shadow-xl hover:shadow-accent hover:-translate-y-1 rounded-2xl p-4 shadow-md border border-gray-50">
      <div className={`${color} w-full h-1.5 rounded-full mb-4 opacity-80`} />

      <div className="flex items-center justify-around w-full">
        <div
          className={`${color} w-16 h-16 flex items-center justify-center rounded-full shadow-sm`}
        >
          {icon}
        </div>
        <div className="flex flex-col items-center text-center">
          <h1 className={`${col} text-3xl font-extrabold tracking-tight`}>
            {stats ?? 6}
          </h1>
          <h2 className="text-sm text-gray-500 font-semibold uppercase tracking-wide mt-1">
            {status}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;