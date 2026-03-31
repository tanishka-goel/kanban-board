import Search from "@/components/shared/Search";
import React from "react"; // Removed unused useState
import { Link } from "react-router-dom";
import { useUsers } from "@/queries/users.query";
import { useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";

const UserChats = ({ onToggle, isCollapsed }) => {
  const { data: allUsers } = useUsers();
  const { user: currUser } = useSelector((state) => state.auth);

  const userChats = allUsers?.filter((uc) => uc.id !== currUser.id);

  return (
    <div className="border-r border-gray-200 h-full min-h-0 relative flex flex-col bg-white">
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-100">
          <Search />
        </div>
      )}

      <button
        onClick={onToggle}
        className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10 bg-secondary text-white border-2 border-white rounded-full p-1 shadow-md hover:bg-darkest transition-colors duration-200 focus:outline-none"
        aria-label="Toggle Sidebar"
      >
        <ChevronRight
          className={`w-4 h-4 transition-transform duration-500 ${
            isCollapsed ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-1">
        {userChats?.map((ucs) => (
          <Link key={ucs.id} to={`/chats/${ucs.id}`} className="block">
            <div
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-gray-100 cursor-pointer ${
                isCollapsed ? "justify-center" : "justify-start"
              }`}
            >
      
               <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-darkest to-slate-900 
                                flex items-center justify-center shadow-sm">
                  <span className="text-white font-sans text-sm font-semibold tracking-wide">
                    {ucs?.first_name.slice(0, 1)}
                    {ucs?.last_name.slice(0, 1)}
                  </span>
                </div>
                {/* Online dot */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 
                                 border-2 border-white rounded-full" />
              </div>

            
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium truncate">
                    {ucs?.first_name} {ucs?.last_name}
                  </p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserChats;