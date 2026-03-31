import Header from "@/components/shared/Header";
import WorkspaceCard from "@/components/shared/WorkspaceCard";
import { useUsers } from "@/queries/users.query";
import { useDeleteWorkspace, useWorkspaces } from "@/queries/workspaces.query";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateWorkspace,
  useEditWorkspace,
} from "@/queries/workspaces.query";
import NewButton from "@/components/shared/NewButton";
import WorkspaceModal from "@/components/shared/modals/WorkspaceModal";
import { toast } from "sonner";
import WorkspaceSkeleton from "@/components/shared/skeletons/WorkspaceSkeleton";
import HeaderSkeleton from "@/components/shared/skeletons/HeaderSkeleton";
import Search from "@/components/shared/Search";
import { usePagination } from "@/hooks/usePagination";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import DeleteModal from "@/components/shared/modals/DeleteModal";

const AdminAllWorkspaces = () => {
  const { mutate: createWorkspace } = useCreateWorkspace();
  const { mutate: editWorkspace } = useEditWorkspace();
  const {mutate:deleteWorkspace} = useDeleteWorkspace()
  //console.log("edit ws", editWorkspace)
  const [openWorkspaceModal, setOpenWorkspaceModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const { user } = useSelector((state) => state.auth);
  //console.log("get curr user", user)
  const [searchTerm, setSearchTerm] = useState("");
  const { data: allWorkspaces, isLoading: workspaceLoading } = useWorkspaces();
  const [openDeleteModal, setOpenDeleteModal] = useState(null)

  const handleAddWorkspace = () => {
    setOpenWorkspaceModal(true);
    setSelectedWorkspace(null);
  };

  const handleEditWorkspace = (ws) => {
    setOpenWorkspaceModal(true);
    setSelectedWorkspace(ws);
  };
  //console.log("all ws", allWorkspaces)

  const filteredWorkspaces = useMemo(() => {
    return (allWorkspaces ?? []).filter((fWs) =>
      fWs.workspace_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allWorkspaces, searchTerm]);

  const { currentData, currentPage, totalPages, nextPage, prevPage } =
    usePagination(filteredWorkspaces, 9);

  const getWorkspaceName = allWorkspaces?.find((wsn) => wsn.id === openDeleteModal)?.workspace_name

    //console.log("current data", getWorkspaceName)

  if (workspaceLoading)
    return (
      <div className="p-4">
        <HeaderSkeleton rightpart />
        <div className="grid mt-10 grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <WorkspaceSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <Header header={"All Workspaces"} />
        <div className="flex items-center justify-around gap-4">
          <Search onSearchChange={setSearchTerm} />
          {/* <p>Sort</p> */}
          <NewButton
            onClick={handleAddWorkspace}
            text={"Create New Workspace"}
          />
        </div>
      </div>
      {openWorkspaceModal && (
        <WorkspaceModal
          selectedWorkspace={selectedWorkspace}
          closeModal={() => setOpenWorkspaceModal(false)}
          onWorkspaceAddition={(formdata) => {
            if (selectedWorkspace) {
              editWorkspace(
                {
                  id: selectedWorkspace.id,
                  newData: formdata,
                },
                {
                  onSuccess: () => {
                    toast.success("Workspace updated successfully");
                    setOpenWorkspaceModal(false);
                  },
                  onError: (error) => {
                    toast.error(
                      error?.response?.data?.error ||
                        "Failed to Workspace user. Please try again.",
                    );
                  },
                },
              );
            } else {
              createWorkspace(formdata, {
                onSuccess: () => {
                  toast.success("Workspace added successfully");
                  setOpenWorkspaceModal(false);
                },
                onError: (error) => {
                  toast.error(
                    error?.response?.data?.error ||
                      "Failed to Workspace user. Please try again.",
                  );
                },
              });
            }
          }}
        />
      )}

      <div className="grid gap-4 mt-10 grid-cols-3">
        {/* <WorkspaceSkeleton/> */}
        {currentData?.map((aws) => {
          const hasAccess = user.role === "admin";
          return (
            <WorkspaceCard
              hasAccess={hasAccess}
              onClick={() => {
                handleEditWorkspace(aws);
                
              }}
              onDelete={()=>{setOpenDeleteModal(aws.id)}}
              key={aws.id}
              data={aws}
            />
          );
        })}
        {openDeleteModal && 
        <DeleteModal
        closeModal={()=>{setOpenDeleteModal(null)}}
        title={allWorkspaces?.find((wsn) => wsn.id === openDeleteModal)?.workspace_name}
        deleteEntity={() => {
            deleteWorkspace(openDeleteModal, {
              onSuccess: () => {
                setOpenDeleteModal(null);
              },
            });
          }}
        />}
      </div>

      <div className="flex justify-center items-center text-center gap-10  md:p-10">
        <button
          disabled={currentPage === 1}
          className={`px-3 py-3 rounded-full 
            ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-linear-to-r from-primary  to-darkest text-white"
            }`}
          onClick={prevPage}
        >
          <ChevronLeftIcon />
        </button>
        <p className="text-custom-wine font-medium text-md text-center">
          {currentPage} / {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          className={`px-3 py-3 rounded-full 
            ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-linear-to-r from-primary  to-darkest  text-white"
            }`}
          onClick={nextPage}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

export default AdminAllWorkspaces;
