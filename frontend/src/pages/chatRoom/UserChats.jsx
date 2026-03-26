import Search from "@/components/shared/Search";
import React from "react";
import { Link } from "react-router-dom";
import { useUsers } from "@/queries/users.query";
import { useSelector } from "react-redux";

const UserChats = () => {
  const { data: allUsers } = useUsers();
  const { user: currUser } = useSelector((state) => state.auth);
  // console.log("users for chat", allUsers)

  const userChats = allUsers?.filter((uc) => uc.id !== currUser.id);
  console.log("UC", userChats);

  return (
    <div className="p-3 border-r-2 h-screen">
      <Search />

      <div className="p-4 mt-5">
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
                <div>
                  {ucs?.first_name} {ucs?.last_name}
                </div>
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
