import { LucideArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const WorkspaceCard = ({ data }) => {
  return (
    <div
      className="shadow-lg transition-transform duration-500 transform-gpu
      ease-[cubic-bezier(0.25,1,0.5,1)]
      hover:scale-[1.02] md:hover:scale-104 hover:shadow-xl
      p-3 md:p-4 m-1 md:m-2 rounded-xl bg-white"
    >
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-base sm:text-lg md:text-xl py-1 tracking-wider font-bold text-blue-600 wrap-break-word">
          {data?.data?.workspace_name}
        </h1>

        <p className="p-1 px-3 md:px-4 text-[10px] sm:text-xs rounded-full font-medium bg-cyan-200/60">
          {data?.id.slice(0, 6)}
        </p>
      </div>
        <p className="my-2 text-md font-medium text-gray-500">{data?.data?.description}</p>
      <h1 className="text-xs sm:text-sm my-1 tracking-wide font-bold text-gray-800">
        CREATED BY : <span className="bg-purple-200 rounded-4xl p-1 px-4">{data?.data?.creatorName}</span> 
      </h1>

      <div className="flex items-center justify-between mt-1">
        <h1 className="text-[11px] sm:text-xs md:text-sm tracking-wide font-bold text-gray-500">
          Updated On : {data?.updated_at.slice(0, 10)}
        </h1>

        <Link
          to={``}
          className="hover:bg-gray-200 rounded-full p-1.5 sm:p-2 transition"
        >
          <LucideArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default WorkspaceCard;