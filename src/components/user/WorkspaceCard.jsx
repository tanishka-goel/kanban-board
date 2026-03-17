import { Edit, LucideArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const WorkspaceCard = ({ data, onClick }) => {
  return (
    <div
      className="shadow-lg transition-transform duration-500 transform-gpu
      ease-[cubic-bezier(0.25,1,0.5,1)]
      hover:scale-[1.02] md:hover:scale-104 hover:shadow-xl
      p-3 md:p-4 m-1 md:m-2 rounded-xl bg-white"
    >
     <div className="flex items-start justify-between gap-2">
  <div className="flex flex-wrap items-center gap-2">
    <h1 className="text-base sm:text-lg md:text-xl py-1 tracking-wider leading-snug font-bold text-gray-800 wrap-break-word">
      {data?.data?.workspace_name}
    </h1>

    <p className="mt-1 w-fit px-3 py-0.5 text-[10px] sm:text-xs rounded-full font-medium bg-blue-100 text-blue-700">
      {data?.id.slice(0, 6)}
    </p>
  </div>

  <button onClick={onClick} className="bg-green-100 rounded-xl hover:bg-green-200 p-2 transition shrink-0">
    <Edit size={18} className="text-green-600" />
  </button>
</div>
        <p className="my-2 text-md font-medium text-gray-500">{data?.data?.description}</p>
      <h1 className="text-xs sm:text-sm my-1 tracking-wide font-bold text-gray-800">
        CREATED BY : <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
            {data?.data?.creatorName}
          </span>
      </h1>

      <div className="flex items-center justify-between mt-1">
        <h1 className="text-[11px] sm:text-xs md:text-sm tracking-wide font-bold text-gray-500">
          Updated On : {data?.updated_at.slice(0, 10)}
        </h1>

        <Link
          to={`/your-workspaces/${data.id}`}
          className="hover:bg-gray-200 bg-gray-100 rounded-full p-1.5 sm:p-2 transition"
        >
          <LucideArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default WorkspaceCard;