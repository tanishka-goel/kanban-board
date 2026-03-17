import ProfileDialog from "@/components/ProfileDialog";
import NewButton from "@/components/shared/NewButton";
import { User } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [openProfileDialog, setOpenProfileDialog] = useState(false);

  const handleProfileToggle = () => {
    setOpenProfileDialog((prev) => !prev);
  };

  return (
    <div className="flex bg-linear-to-br from-darkest to-light h-15 p-3 md:pr-5 mb-3 w-full items-center justify-between border-secondary border">
      
      <h1 className="text-white flex gap-2 font-bold text-xl p-2 tracking-widest animate-in fade-in duration-300">
        TaskForge
      </h1>

      <div className="grid grid-cols-2 items-center gap-3">
        <NewButton text={"Create"} className="bg-white text-black hover:bg-gray-200"/>

      <div className="relative">
        <button onClick={handleProfileToggle}>
          <div className="flex items-center justify-center bg-[#001919] w-10 h-10 text-white rounded-full">
            <User size={20} />
          </div>
        </button>
 {openProfileDialog && <ProfileDialog />}
      </div>


       
      </div>
      
    </div>
  );
};

export default Header;