import Header from "@/components/shared/Header";
import WorkspaceCard from "@/components/shared/WorkspaceCard";
import { useUsers } from "@/queries/users.query";
import { useWorkspaces } from "@/queries/workspaces.query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateWorkspace,
  useEditWorkspace,
} from "@/queries/workspaces.query";
import NewButton from "@/components/shared/NewButton";
import WorkspaceModal from "@/components/shared/modals/WorkspaceModal";
import { toast } from "sonner";

const AdminAllWorkspaces = () => {
  const { mutate: createWorkspace } = useCreateWorkspace();
  const { mutate: editWorkspace } = useEditWorkspace();
  //console.log("edit ws", editWorkspace)
  const [openWorkspaceModal, setOpenWorkspaceModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const { user } = useSelector((state) => state.auth);
  //console.log("get curr user", user)

  const { data: allWorkspaces } = useWorkspaces();

  const handleAddWorkspace = () => {
    setOpenWorkspaceModal(true);
    setSelectedWorkspace(null);
  };

  const handleEditWorkspace = (ws) => {
    setOpenWorkspaceModal(true);
    setSelectedWorkspace(ws);
  };
  //console.log("all ws", allWorkspaces)
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <Header header={"All Workspaces"} />
        <div className="flex items-center justify-around gap-4">
          <p>Search</p>
          <p>Sort</p>
          <NewButton
            onClick={handleAddWorkspace}
            text={"Create New Workspace"}
          />
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
      </div>

 <div className="grid gap-4 grid-cols-3">
      {allWorkspaces?.map((aws) => {
        return (
         
             <WorkspaceCard
            onClick={() => {
              handleEditWorkspace(aws);
            }}
            key={aws.id}
            data={aws}
          />
         
         
        );
      })}
       </div>
    </div>
  );
};

export default AdminAllWorkspaces;
