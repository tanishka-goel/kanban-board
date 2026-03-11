import ProfileDialog from "@/components/ProfileDialog";
import { User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {

    const[openProfileDialog, setOpenProfileDialog] = useState(false)

    const handleProfileToggle = () =>{
        setOpenProfileDialog(!openProfileDialog)
    }


  return (
    <div className="flex bg-linear-to-br  from-[#001919] via-darkest to-light h-15 p-3 md:pr-5 mb-3 w-full items-center justify-between border-secondary border">
      {/* <img src="/logo.png" alt="logo" width="45px"/> */}
      <h1 className=" text-white flex gap-2 font-bold  text-xl p-2 tracking-widest animate-in fade-in duration-300">
        TaskForge
      </h1>
      <button
      onClick={handleProfileToggle}
      >
      <div className="flex items-center justify-center bg-[#001919] w-10 h-10 text-white rounded-full">
        <User size={20} />
      </div>
      </button>
      {openProfileDialog && (<ProfileDialog/>)}
      
    </div>
  );
};

export default Header;
