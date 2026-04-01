import React, { useEffect, useState } from "react";
import FormInput from "../FormInput";
import NewButton from "../NewButton";
import { useSelector } from "react-redux";
import { useUsers } from "@/queries/users.query";
import { workspaceSchema } from "@/validation/schemas/workspaceSchema";
import { toast } from "sonner";
import WarningModal from "./WarningModal";

const WorkspaceModal = ({
  onWorkspaceAddition,
  closeModal,
  selectedWorkspace,
}) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const { data: users } = useUsers();
  const [showWarning, setShowWarning] = useState(false)
  const [isChanged, setIsChanged]=useState(false)
  //console.log("users in Wm", users);
  const [formdata, setFormdata] = useState({
    workspace_name: "",
    description: "",
    creatorName: "",
    creatorID: "",
    members: [],
  });

  const isEditMode = !!selectedWorkspace;

  useEffect(() => {
    if (selectedWorkspace) {
      const workspaceData = selectedWorkspace.data ?? selectedWorkspace;
      //console.log("WS data", workspaceData)
      setFormdata({
        workspace_name: workspaceData.workspace_name || "",
        description: workspaceData.description || "",
        creatorName: workspaceData.creatorName || "",
        creatorID: workspaceData.creatorID || "",
        members: workspaceData.members || [],
      });
    }
  }, [selectedWorkspace]);

  useEffect(() => {
    if (currentUser && !isEditMode) {
      setFormdata((prev) => ({
        ...prev,
        creatorName: `${currentUser.first_name} ${currentUser.last_name}`,
        creatorID: currentUser.id,
      }));
    }
  }, [currentUser, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
    setIsChanged(true)
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddMember = (userId) => {
    if (!formdata.members.includes(userId)) {
      setFormdata((prev) => ({
        ...prev,
        members: [...prev.members, userId],
      }));
    }
  };

  const handleRemoveMember = (userId) => {
    setFormdata((prev) => ({
      ...prev,
      members: prev.members.filter((id) => id !== userId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = workspaceSchema.safeParse(formdata)

    if(!res.success){
      const fieldErrors = {}
      res.error.issues.forEach((err)=>
      {
        fieldErrors[err.path[0]] = err.message;
      })
    setErrors(fieldErrors)
      toast.error("Please fill the fields correctly");
      return;
    }
   onWorkspaceAddition?.(formdata);
      
  };

  const handleClose = () =>{
    if(isChanged){
      setShowWarning(true)
    } else{
      closeModal()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Add Workspace</h1>
          <NewButton
            className="bg-red-600 hover:bg-red-700 text-white h-8 w-8 flex items-center justify-center rounded-md"
            text={"X"}
            onClick={handleClose}
          />
        </div>

        {showWarning && (
          <WarningModal
          onConfirm={()=>{setShowWarning(false), closeModal()}}
          onCancel={()=>{setShowWarning(false)}}
          />
        )}

        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            labelTitle={"Workspace Name"}
            placeholder={"Enter Workspace name"}
            name="workspace_name"
            required
            onChange={handleChange}
            inputValue={formdata.workspace_name}
            error={errors.workspace_name}
          />

          <FormInput
            labelTitle={"Description"}
            placeholder={"Description"}
            name="description"
            required
            textarea
            onChange={handleChange}
            inputValue={formdata.description}
            error={errors.description}
          />

          <FormInput
            labelTitle={"Created By"}
            placeholder={"Enter your name"}
            name="creatorName"
            required
            readOnly
            onChange={handleChange}
            inputValue={formdata.creatorName}
            error={errors.creatorName}
          />

          <FormInput
            labelTitle={"Creator ID"}
            placeholder={"Enter your ID"}
            name="creatorID"
            required
            readOnly
            onChange={handleChange}
            inputValue={formdata.creatorID}
            error={errors.creatorID}
          />

          <div>
            <label className="text-sm font-medium">Members</label>
            <select
              onChange={(e) => handleAddMember(e.target.value)}
              className="w-full border rounded-md p-2 mt-1"
            >
              <option value="">Select member</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user?.first_name} {user?.last_name}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2 mt-2">
              {formdata.members.map((memberId) => {
                const user = users?.find((u) => u.id === memberId);
                return (
                  <div
                    key={memberId}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
                  >
                    <span className=" text-md">{user?.first_name} {user?.last_name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(memberId)}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
            <NewButton
              type="submit"
              text={isEditMode ? "Update Workspace" : "Add Workspace"}
              className="bg-secondary hover:bg-emerald-800 text-white px-5 py-2 rounded-lg"
            />
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkspaceModal;
