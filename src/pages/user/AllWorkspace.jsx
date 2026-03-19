import React, { useState } from "react";
import WorkspaceCard from "@/components/user/WorkspaceCard";
import { useVisibleWorkspace } from "@/hooks/useVisibleWorkspaces";
import { WorkflowIcon } from "lucide-react";
import Header from "@/components/shared/Header";
import NewButton from "@/components/shared/NewButton";
import WorkspaceModal from "@/components/user/WorkspaceModal";
import { toast } from "sonner";
import {
  useCreateWorkspace,
  useEditWorkspace,
} from "@/queries/workspaces.query";

const AllWorkspace = () => {
  const { visibleWorkspaces, workspaceLoading, authLoading } =
    useVisibleWorkspace();
  const pageLoading = workspaceLoading || authLoading;
  const { mutate: createWorkspace } = useCreateWorkspace();
  const { mutate: editWorkspace } = useEditWorkspace();
  //console.log("edit ws", editWorkspace)
  const [openWorkspaceModal, setOpenWorkspaceModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);


  const handleAddWorkspace = () => {
    setOpenWorkspaceModal(true);
    setSelectedWorkspace(null);
  };

  const handleEditWorkspace = (ws) => {
    setOpenWorkspaceModal(true);
    setSelectedWorkspace(ws);
  };

  if (pageLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <Header header={"Your Workspaces"} />
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

      <div className="p-4 md:mx-5">
        <div className="h-screen overflow-y-auto pr-2 custom-scrollbar">
          {visibleWorkspaces.length === 0 && (
            <div>Create a Workspace to get started</div>
          )}
          {visibleWorkspaces.map((ws) => (
            <WorkspaceCard
              onClick={() => handleEditWorkspace(ws)}
              key={ws.id}
              data={ws}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllWorkspace;
