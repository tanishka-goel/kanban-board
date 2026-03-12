import Search from "@/components/shared/Search";
import { useUsers } from "@/queries/users.query";
import { Edit, Trash2 } from "lucide-react";
import NewButton from "@/components/shared/NewButton";
import { useState } from "react";
import AddUserFormModal from "@/components/AddUserFormModal";

const ManageUsers = () => {
  const { data, isLoading, error } = useUsers();
  const [openUserModal, setOpenUserModal] = useState(false)

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users</p>;

  const users = data?.filter((user) => user.data.role === "user");

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          MANAGE ALL USERS
        </h1>

        <div className="flex justify-around items-center gap-4">
        <Search />
        <NewButton onClick={()=>{setOpenUserModal(true)}} text={"Add Users"}/>
       
        </div>
       
      </div>
      {openUserModal && 
      <AddUserFormModal
      closeModal={()=>setOpenUserModal(false)}
      />}

      <div className="hidden md:grid grid-cols-5 px-6 ml-13 py-3 text-sm font-semibold text-gray-500">
        <p>Name</p>
        <p>Active Workspaces</p>
        <p>Joined Date</p>
        <p>Role</p>
        <p className="text-center">Actions</p>
      </div>
      <hr />

      <div>
        {users?.map((user) => (
          <div
            key={user.id}
            className="grid md:grid-cols-5 gap-4 items-center px-4 md:px-12 py-4 border-b"
          >
            <div className="flex items-center gap-3">
              <div className="bg-black w-10 h-10 flex items-center justify-center rounded-full">
                <p className="text-white font-semibold text-sm">
                  {user.data.first_name[0]}
                  {user.data.last_name[0]}
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  {user.data.first_name} {user.data.last_name}
                </p>
                <p className="text-xs text-gray-500">@{user.data.username}</p>
              </div>
            </div>

            <p className="text-sm md:ml-20 text-gray-600">
             0
            </p>

            <p className="text-sm md:ml-13 text-gray-600">
              {user.data.createdAt ?? "—"}
            </p>

            <p className="uppercase md:ml-2 font-semibold border border-purple-700 text-purple-500 text-xs bg-purple-300/20 px-3 py-1 rounded-2xl w-fit">
              {user.data.role}
            </p>

            <div className="flex md:ml-10 items-center gap-2 md:justify-center">
              <button 
              onClick={()=>setOpenUserModal(true)}
              className="text-primary bg-green-100 hover:bg-green-200 p-1.5 rounded-lg">
                <Edit size={18} />
              </button>
              <button className="text-red-600 bg-red-100 hover:bg-red-200 p-1.5 rounded-lg">
                <Trash2 size={18} />
              </button>
            </div> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;