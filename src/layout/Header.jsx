import { User } from "lucide-react";

const Header = () => {
  return (
    <div className="flex bg-primary/20 h-15 p-3 md:pr-5 mb-3 w-full items-center justify-between border-secondary border">
      {/* <img src="/logo.png" alt="logo" width="45px"/> */}
      <h1 className=" text-darkest flex gap-2 font-bold  text-xl p-2 tracking-widest animate-in fade-in duration-300">
        TaskForge
      </h1>
      <div className="flex items-center justify-center bg-secondary w-10 h-10 text-white rounded-full">
  <User size={20} />
</div>
    </div>
  );
};

export default Header;
