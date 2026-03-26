import React, { useEffect, useState } from "react";
import NewButton from "@/components/shared/NewButton";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/queries/users.query";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const ChatArea = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { data: allusers } = useUsers();
  const { userId } = useParams();

  const getChatUser = allusers?.find(
    (gcu) => gcu.id === userId
  );

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      const message = {
        userId,
        text: input,
      };

      socket.emit("sendMessage", message);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-170">
      
      <div className="bg-secondary p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white w-10 h-10 rounded-full"></div>

          {!getChatUser ? (
            <div>Select user from sidebar to chat</div>
          ) : (
            <h1>
              {getChatUser.first_name} {getChatUser.last_name}
            </h1>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="bg-gray-200 px-3 py-1 rounded-lg inline-block">
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 p-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <NewButton text={"send"} onClick={sendMessage} />
      </div>
    </div>
  );
};

export default ChatArea;