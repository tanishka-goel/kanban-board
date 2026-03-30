import { useTasks } from "@/queries/tasks.query";
import React, { useEffect, useState } from "react";
import NewButton from "@/components/shared/NewButton";
import FormInput from "@/components/shared/FormInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWorkspaces } from "@/queries/workspaces.query";
import { useSelector } from "react-redux";
import { useUsers } from "@/queries/users.query";
import { taskSchema } from "@/validation/schemas/taskSchema";
import { toast } from "sonner";
import { createPortal } from "react-dom"

const AddTaskModal = ({ onTaskAddition, closeModal, selectedTask, workspaceMembers, workspaceId }) => {
  // const { data:allTasks } = useTasks()
  const { data: workspaces } = useWorkspaces();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { data: allUsers } = useUsers();
  const [errors, setErrors] = useState({});

  const assignableUsers = workspaceMembers
    ? allUsers?.filter(user => workspaceMembers.includes(user.id))
    : allUsers; 

  // console.log("WS", allUsers)

  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    creator_name: "",
    creator_id: "",
    status: "todo",
    due_date: "",
    priority: "medium",
    workspace_id: workspaceId|| "",
    assigned_user_id: "",
  });

  //console.log("All tasks", allTasks)

  const isEditMode = !!selectedTask;

  useEffect(() => {
    if (selectedTask) {
      const taskData = selectedTask.data ?? selectedTask;
      setFormdata({
        title: taskData.title || "",
        description: taskData.description || "",
        creator_name: taskData.creator_name || "",
        creator_id: taskData.creator_id || "",
        status: taskData.status || "todo",
        due_date: taskData.due_date
          ? new Date(taskData.due_date).toISOString().slice(0, 16)
          : "",
        priority: taskData.priority || "medium",
        workspace_id: taskData.workspace_id || "",
        assigned_user_id: taskData.assigned_user_id || "",
      });
    }
  }, []);

  useEffect(() => {
    if (currentUser && !isEditMode) {
      setFormdata((prev) => ({
        ...prev,
        creator_name: `${currentUser.first_name} ${currentUser.last_name}`,
        creator_id: currentUser.id,
      }));
    }
  }, [currentUser, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("FORM SUBMITTED");
    const formattedData = {
      ...formdata,
      due_date: formdata.due_date
        ? new Date(formdata.due_date).toISOString()
        : null,
      assigned_user_id:formdata.assigned_user_id || null
    };

    const res = taskSchema.safeParse(formattedData);

    if (!res.success) {
      const fieldErrors = {};
      
      res.error?.errors?.forEach((err) => {   
      fieldErrors[err.path[0]] = err.message;
    });
      setErrors(fieldErrors);
      toast.error("Please fill the fields correctly");
      return;
    }

    onTaskAddition?.(res.data);
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Add Task</h1>
          <NewButton
            className="bg-red-600 hover:bg-red-700 text-white h-8 w-8 flex items-center justify-center rounded-md"
            text={"X"}
            onClick={closeModal}
          />
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="space-y-6 max-w-5xl"
        >
          <FormInput
            labelTitle={"Task Name"}
            placeholder={"Enter task name"}
            name="title"
            required
            onChange={handleChange}
            inputValue={formdata.title}
            error={errors.title}
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

          <div className="grid grid-cols-2 gap-3">
            <FormInput
              labelTitle={"Created By"}
              placeholder={"Enter your name"}
              name="creator_name"
              required
              readOnly
              className={"text-gray-400 bg-gray-100 cursor-not-allowed"}
              onChange={handleChange}
              inputValue={formdata.creator_name}
              error={errors.creator_name}
            />

            <FormInput
              labelTitle={"Creator ID"}
              placeholder={"Enter your ID"}
              name="creator_id"
              required
              className={"text-gray-400 bg-gray-100 cursor-not-allowed"}
              readOnly
              onChange={handleChange}
              inputValue={formdata.creator_id}
              error={errors.creator_id}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Task Status
              </label>
              <Select
                value={formdata.status}
                onValueChange={(value) =>
                  setFormdata((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="w-full bg-white max-w-48">
                  <SelectValue placeholder="Select Task status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className={"bg-white"}>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in_review">In Review</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Priority
              </label>
              <Select
                value={formdata.priority}
                onValueChange={(value) =>
                  setFormdata((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select Task status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className={"bg-white"}>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="urgent"><span className="rounded-full bg-red-500 w-2.5 h-2.5"></span>Urgent</SelectItem>
                    <SelectItem value="high"><span className="rounded-full bg-orange-500 w-2.5 h-2.5"></span>High</SelectItem>
                    <SelectItem value="medium"><span className="rounded-full bg-blue-500 w-2.5 h-2.5"></span>Medium</SelectItem>
                    <SelectItem value="low"><span className="rounded-full bg-emerald-500 w-2.5 h-2.5"></span>Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="datetime-local"
                name="due_date"
                value={formdata.due_date}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Select Workspace
              </label>
              <Select
                value={formdata.workspace_id}
                onValueChange={(value) =>
                  setFormdata((prev) => ({
                    ...prev,
                    workspace_id: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Workspace" />
                </SelectTrigger>

                <SelectContent className={"bg-white"}>
                  {workspaces?.map((ws) => (
                    <SelectItem key={ws.id} value={ws.id}>
                      {ws?.workspace_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Assign To
              </label>

              <Select
                value={formdata.assigned_user_id}
                onValueChange={(value) =>
                  setFormdata((prev) => ({
                    ...prev,
                    assigned_user_id: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Assignee" />
                </SelectTrigger>

                <SelectContent position="popper" className={"bg-white"}>
                  {assignableUsers?.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user?.first_name} {user?.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            {/* <label className="text-sm font-medium">Members</label>
            <select
              onChange={(e) => handleAddMember(e.target.value)}
              className="w-full border rounded-md p-2 mt-1"
            >
              <option value="">Select member</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user?.data?.first_name} {user?.data?.last_name}
                </option>
              ))}
            </select> */}

            <div className="pt-4 flex justify-end">
              <NewButton
                type="submit"
                text={isEditMode ? "Update Task" : "Add Task"}
                className="bg-secondary hover:bg-emerald-800 text-white px-5 py-2 rounded-lg"
              />
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddTaskModal;
