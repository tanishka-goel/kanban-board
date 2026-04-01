import React, { useState } from "react";
import UserChats from "./UserChats";
import ChatArea from "./ChatArea";

const ChatLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-full min-h-0 overflow-hidden items-stretch">
      <div className={`transition-all duration-300 ${
        isCollapsed ? "w-24" : "w-1/4"
      } bg-gray-50/60 h-full min-h-0`}>
        <UserChats
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed((prev) => !prev)}
        />
      </div>

      <div className={`transition-all duration-300 h-full min-h-0 ${
        isCollapsed ? "w-[calc(100%-4rem)]" : "w-3/4"
      } bg-gray-50/70`}>
        <ChatArea />
      </div>
    </div>
  );
};

export default ChatLayout;