import React, { useState } from "react";
import WorkspaceSidebar from "./WorkspaceSidebar";
import Board from "./Board";
import { PanelLeft } from "lucide-react";

const WorkspaceLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex w-full h-[calc(100vh-64px)]">
      <div
        className={`border-r bg-white transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <WorkspaceSidebar collapsed={isCollapsed} />
      </div>
      <div className="flex-1 p-4 overflow-auto">

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mb-4 p-2 rounded-lg hover:bg-gray-200"
        >
          <PanelLeft size={18} />
        </button>

        <Board />

      </div>

    </div>
  );
};

export default WorkspaceLayout;