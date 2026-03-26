import Search from "@/components/shared/Search";
import {
  useAddUser,
  useUsers,
  useEditUser,
  useDeleteUser,
} from "@/queries/users.query";
import { Edit, Trash2 } from "lucide-react";
import NewButton from "@/components/shared/NewButton";
import { useMemo, useState } from "react";
import AddUserFormModal from "@/components/shared/modals/AddUserFormModal";
import { toast } from "sonner";
import Header from "@/components/shared/Header";
import DeleteModal from "@/components/shared/modals/DeleteModal";
import TableSkeleton from "@/components/shared/skeletons/TableSkeleton";
import HeaderSkeleton from "@/components/shared/skeletons/HeaderSkeleton";

const ManageUsers = () => {
  const { data, isLoading, error } = useUsers();
  const { mutate: addUser } = useAddUser();
  const { mutate: editUser } = useEditUser();
  const { mutate: deleteUser } = useDeleteUser();
  const [openUserModal, setOpenUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

 

  const users = data?.filter((user) => user.role === "user");

  const handleAddClick = () => {
    setSelectedUser(null);
    setOpenUserModal(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenUserModal(true);
  };


const filteredUsers = useMemo(() => {
  return users?.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||  user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) 
  )
}, [searchTerm, users])

 if (isLoading) return (
    <div className="p-4">
      <HeaderSkeleton rightpart/><br />
      <TableSkeleton />
    </div>
  );
  if (error) return <p>Error fetching users</p>;

  return (
    <div className="p-4 md:p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Header header={"MANAGE ALL USERS"} />

        <div className="flex justify-around items-center gap-4">
          <Search onSearchChange={setSearchTerm}/>
          <NewButton onClick={handleAddClick} text={"Add Users"} />
        </div>
      </div>
      {openUserModal && (
        <AddUserFormModal
          selectedUser={selectedUser}
          closeModal={() => setOpenUserModal(false)}
          onUserAddition={(formData) => {
            if (selectedUser) {
              editUser(
                {
                  id: selectedUser.id,
                  newData: { ...formData, id: selectedUser.id },
                },
                {
                  onSuccess: () => {
                    toast.success("User updated successfully");
                    setOpenUserModal(false);
                  },
                  onError: (error) => {
                    toast.error(
                      error?.response?.data?.error ||
                        "Failed to update user. Please try again.",
                    );
                  },
                },
              );
            } else {
              addUser(formData, {
                onSuccess: () => {
                  toast.success("User added successfully");
                  setOpenUserModal(false);
                },
                onError: (error) => {
                  toast.error(
                    error?.response?.data?.error ||
                      "Failed to add user. Please try again.",
                  );
                },
              });
            }
          }}
        />
      )}
      

{/* <TableSkeleton/> */}
      <div className="hidden md:grid grid-cols-5 px-6 ml-13 py-3 text-sm font-semibold text-gray-500">
        <p>Name</p>
        <p>Active Workspaces</p>
        <p>Joined Date</p>
        <p>Role</p>
        <p className="text-center">Actions</p>
      </div>
      <hr />

      <div>
        {filteredUsers?.map((user) => (
          <div
            key={user.id}
            className="grid md:grid-cols-5 gap-4 items-center px-4 md:px-12 py-4 border-b"
          >
            <div className="flex items-center gap-3">
              <div className="bg-black w-10 h-10 flex items-center justify-center rounded-full">
                <p className="text-white font-semibold text-sm">
                  {user.first_name[0]}
                  {user.last_name[0]}
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-xs text-gray-500">@{user.username}</p>
              </div>
            </div>

            <p className="text-sm md:ml-20 text-gray-600">0</p>

            <p className="text-sm md:ml-5 font-medium  text-gray-600">
              {user.created_at.slice(0, 10) ?? "—"}
            </p>

            <p className="uppercase md:ml-2 font-semibold border border-purple-700 text-purple-500 text-xs bg-purple-300/20 px-3 py-1 rounded-2xl w-fit">
              {user.role}
            </p>

            <div className="flex md:ml-10 items-center gap-2 md:justify-center">
              <button
                onClick={() => handleEditClick(user)}
                className="text-primary bg-green-100 hover:bg-green-200 p-1.5 rounded-lg"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => setOpenDeleteModal(user.id)}
                className="text-red-600 bg-red-100 hover:bg-red-200 p-1.5 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
          </div>
        ))}
      </div>
      {openDeleteModal && (
              <DeleteModal
                title={users?.find(u => u.id === openDeleteModal)?.first_name}
                deleteEntity={()=>{
                  deleteUser(openDeleteModal,{
                    onSuccess:() =>{setOpenDeleteModal(null)
                    }
                  })
                }}
                closeModal={() => setOpenDeleteModal(null)}
              />
            )}
    </div>
    
  );
};

export default ManageUsers;
