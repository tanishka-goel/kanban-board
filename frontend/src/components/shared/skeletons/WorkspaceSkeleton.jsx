import React from "react";

const WorkspaceSkeleton = () => {
  return (
    <div className="bg-gray-100 animate-shimmer mb-3 py-4 px-4 rounded-xl ">
      <div className="flex animate-shimmer items-center gap-4">
        <div className="bg-gray-200 animate-shimmer w-100 mt-3 h-5"></div>
        <div className="bg-gray-200 animate-shimmer w-20 rounded-full mt-3 h-10"></div>
        <div className="bg-gray-200 animate-shimmer w-20 rounded-full mt-3  h-10"></div>
      </div>
      <div className="bg-gray-200 w-fit mt-3 animate-shimmer h-5"></div>
      <div className="flex items-center animate-shimmer gap-4">
        <div className="bg-gray-200 w-30 animate-shimmer mt-3 h-5"></div>
        <div className="bg-gray-200 w-30 animate-shimmer rounded-2xl mt-3 mr-40 h-5"></div>
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-gray-200 w-30 animate-shimmer mt-3 h-5"></div>
        <div className="bg-gray-200 w-30 animate-shimmer rounded-2xl mt-3 mr-40 h-5"></div>
      </div>
    </div>
  );
};

export default WorkspaceSkeleton;
