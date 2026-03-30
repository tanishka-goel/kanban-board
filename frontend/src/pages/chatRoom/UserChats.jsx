import Search from "@/components/shared/Search";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "@/queries/users.query";
import { useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";

const UserChats = ({onToggle, isCollapsed}) => {
  const { data: allUsers } = useUsers();
  const { user: currUser } = useSelector((state) => state.auth);
  // console.log("users for chat", allUsers)

  const userChats = allUsers?.filter((uc) => uc.id !== currUser.id);
  //console.log("UC", userChats);

  return (
    <div className="border-r-2 h-full min-h-0 relative flex flex-col">
      {!isCollapsed && <Search />}

      <button
  onClick={onToggle}
  className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 
             bg-secondary text-white border rounded-full p-1 shadow-md hover:bg-darkest"
>
  <ChevronRight
    className={`w-5 h-5 transition-transform duration-500 ${
      isCollapsed ? "rotate-180" : "rotate-0"
    }`}
  />
</button>
      <div className="flex-1 min-h-0 overflow-y-auto p-4 mt-5">
        {userChats?.map((ucs) => (
          <Link key={ucs.id} to={`/chats/${ucs.id}`}>
            <div>
              <div className="flex gap-2 hover:bg-gray-100  my-3 items-center">
                <div className="bg-darkest rounded-full w-11 h-11 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {ucs?.first_name.slice(0, 1)}
                    {ucs?.last_name.slice(0, 1)}
                  </span>
                </div>

                {isCollapsed ? <div></div> :
                 <div>
                  {ucs?.first_name} {ucs?.last_name}
                </div> }
               
              </div>
              <hr className=" border-t-2 border-gray-300" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserChats;
