import React from "react";

const TableSkeleton = () => {
  return (
    <div className="w-full min-h-screen animate-shimmer bg-gray-100 p-4 md:p-6">
      <div className="hidden md:grid grid-cols-5 gap-6 px-4 py-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="mt-2 h-6 w-28 animate-shimmer rounded-2xl bg-gray-400" />
        ))}
      </div>

      <div>
        <ul>
          {Array.from({ length: 11 }).map((_, index) => (
            <div className="grid items-center gap-4 border-b px-4 py-4 md:grid-cols-5" key={index}>
              <div className="flex items-center gap-3">
                <li className="h-10 w-10 rounded-full animate-shimmer bg-gray-300" />
                <li className="h-6 w-24 rounded-full bg-gray-200" />
              </div>

              <li className="h-6 w-24 rounded-xl  animate-shimmer bg-gray-200" />
              <li className="h-6 w-32 rounded-lg  animate-shimmer bg-gray-200" />
              <li className="h-6 w-36 rounded-xl  animate-shimmer bg-gray-200" />
              <li className="h-6 w-28 rounded-lg  animate-shimmer bg-gray-200" />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TableSkeleton;
