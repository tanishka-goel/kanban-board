import { Edit, LucideArrowRight, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const WorkspaceCard = ({ data, onClick, onDelete, hasAccess }) => {
  const { user } = useSelector((state) => state.auth);
  const basePath =
    user.role === "admin" ? `admin/all-workspaces` : `your-workspaces`;

  return (
    <div
      className="
        group relative overflow-hidden
        bg-white border border-gray-100
        rounded-2xl shadow-sm hover:shadow-md
        transition-all duration-300 ease-out
        hover:-translate-y-0.5
        p-5 m-2
      "
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-400 via-violet-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-col gap-1.5 min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight leading-snug truncate">
            {data?.workspace_name}
          </h1>
          <span className="w-fit px-2.5 py-0.5 text-[10px] font-mono font-medium tracking-widest rounded-md bg-gray-100 text-gray-500 border border-gray-200">
            #{data?.id.slice(0, 8)}
          </span>
        </div>

{hasAccess && <div>
          <button
            onClick={onClick}
            className="
            shrink-0 p-2 rounded-xl
            bg-emerald-50 text-emerald-600
            hover:bg-emerald-100 hover:scale-105
            active:scale-95
            transition-all duration-200
          "
          >
            <Edit size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="
            shrink-0 p-2 rounded-xl
            bg-red-50 text-red-600
            hover:bg-red-100 hover:scale-105
            active:scale-95
            transition-all duration-200
          "
          >
            <Trash2 size={16} />
          </button>
        </div> }
        
      </div>

      {data?.description && (
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {data?.description}
        </p>
      )}

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
              Created by :
            </span>
            <span className="text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full truncate max-w-30">
              {data?.creatorName}
            </span>
          </div>
          <span className="text-[11px] text-gray-400 font-medium">
            Updated {format(data?.updated_at, "MMM do, yyyy · h:mma")}
          </span>
        </div>

        <Link
          to={`/${basePath}/${data.id}`}
          className="
            shrink-0 flex items-center justify-center
            w-9 h-9 rounded-xl
            bg-gray-900 text-white
            hover:bg-gray-700 hover:scale-105
            active:scale-95
            transition-all duration-200
          "
        >
          <LucideArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default WorkspaceCard;
