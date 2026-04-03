import ProfileDialog from "@/components/ProfileDialog";
import NewButton from "@/components/shared/NewButton";
import AddTaskModal from "@/components/shared/modals/AddTaskModal";
import NotificationsModal from "@/components/shared/modals/NotificationsModal";
import { useCreateTask } from "@/queries/tasks.query";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useClickOutside from "@/hooks/useClickOutside";

const Header = () => {
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const { mutateAsync: createTask } = useCreateTask();
  const { user } = useSelector((state) => state.auth);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const handleTaskToggle = () => {
    setOpenTaskDialog((prev) => !prev);
  };

  const handleProfileToggle = () => {
    setOpenProfileDialog((prev) => !prev);
  };

  const handleTaskAddition = async (taskData) => {
    try {
      await createTask(taskData);
      toast.success("Task created successfully");
      setOpenTaskDialog(false);
    } catch (error) {
      console.error("Failed to create task", error);
      toast.error("Failed to create task");
    }
  };

  useClickOutside(
    notifRef,
    () => setOpenNotifications(false),
    openNotifications,
  );
  useClickOutside(
    profileRef,
    () => setOpenProfileDialog(false),
    openProfileDialog,
  );

  return (
    <div className="flex bg-linear-to-r from-slate-950 via-secondary to-slate-950  h-16 px-4 md:px-6 mb-3 w-full items-center justify-between border border-secondary">
      <h1 className="text-white font-bold text-xl tracking-widest flex items-center gap-2">
        TaskForge
      </h1>

      <div className="flex items-center mr-4 gap-4">
        {/* <NewButton
          onClick={handleTaskToggle}
          text={"Create Task"}
          className="bg-white text-black hover:bg-gray-200 transition-all"
        />

        {openTaskDialog && (
          <AddTaskModal
            closeModal={() => setOpenTaskDialog(false)}
            onTaskAddition={handleTaskAddition}
          />
        )} */}

        <div ref={notifRef} className="relative group w-fit">
          <button onClick={() => setOpenNotifications((prev) => !prev)}>
            <div className="bg-secondary w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-secondary/80">
              <Bell size={20} className="text-white" />
            </div>
          </button>
          {openNotifications && <NotificationsModal />}
        </div>

        <div ref={profileRef} className="relative">
          <button onClick={handleProfileToggle}>
            <div className="bg-secondary w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold tracking-wide transition-all hover:bg-secondary/80">
              <span className="leading-none">
                {user?.first_name?.[0]}
                {user?.last_name?.[0]}
              </span>
            </div>
          </button>

          {openProfileDialog && <ProfileDialog user={user} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
