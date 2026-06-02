import ProfileDialog from "@/components/ProfileDialog";
import NotificationsModal from "@/components/shared/modals/NotificationsModal";
import { Bell } from "lucide-react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "@/hooks/useClickOutside";
import { useGetNotifications } from "@/queries/notifications.query";

const Header = () => {
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const { data: allNotifs } = useGetNotifications(user.id);


  const handleProfileToggle = () => {
    setOpenProfileDialog((prev) => !prev);
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
        <div ref={notifRef} className="relative group w-fit">
          <button onClick={() => setOpenNotifications((prev) => !prev)}>
            <div className="bg-secondary w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-secondary/80">
              <Bell size={20} className="text-white" />
              {allNotifs?.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-red-600" />
              )}
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
