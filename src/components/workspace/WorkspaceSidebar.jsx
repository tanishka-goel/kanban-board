import React from "react";
import {
  Rows3,
} from "lucide-react";

const WorkspaceSidebar = ({ collapsed }) => {
  return (
    <div className="p-3 space-y-3">

      {!collapsed && (
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Workspace
        </h2>
      )}

      <nav className="space-y-2">
        <SidebarItem icon={<Rows3 size={18} />} label="Workspace1" collapsed={collapsed} />
        <SidebarItem icon={<Rows3  size={18} />} label="Workspace2" collapsed={collapsed} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, label, collapsed }) => (
  <div className="flex items-center gap-3 p-2 uppercase rounded-lg hover:bg-gray-100 cursor-pointer">
    {label.slice(0,2)}
    {!collapsed && <span className="text-sm font-medium">{label}</span>}
  </div>
);

export default WorkspaceSidebar;