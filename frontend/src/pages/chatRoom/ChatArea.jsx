import React, { useEffect, useMemo, useState } from "react";
import NewButton from "@/components/shared/NewButton";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/queries/users.query";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useMessages } from "@/queries/messages.query";
import { format } from "date-fns";
import { Check, Send } from "lucide-react";

const CHAT_SERVER_URL =
  import.meta.env.VITE_CHAT_SERVER_URL || "http://localhost:3000";
const socket = io(CHAT_SERVER_URL);

const ChatArea = () => {
  const [realtimeMessages, setRealtimeMessages] = useState([]);
  const [input, setInput] = useState("");
  const { data: allusers } = useUsers();
  const { user: currUser } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const { data: chatHistory = [] } = useMessages(currUser?.id, userId);

  const messageSeen = chatHistory.some(
    (m) => m.sender_id === currUser?.id && m.seen === true,
  );

  const [readBy, setReadBy] = useState(messageSeen ? { [userId]: true } : {});

  const getChatUser = allusers?.find((gcu) => gcu.id === userId);

  useEffect(() => {
    const onReceiveMessage = (message) => {
      setRealtimeMessages((prev) => {
        if (
          message.id &&
          prev.some((prevMessage) => prevMessage.id === message.id)
        ) {
          return prev;
        }

        return [...prev, message];
      });
    };

    const onConnect = () => {
      if (currUser?.id) {
        socket.emit("registerUser", currUser.id);
      }
    };

    const onSeen = ({ by }) => {
        setReadBy((prev) => ({ ...prev, [by]: true }));
      };

    socket.on("connect", onConnect);

    if (currUser?.id) {
      socket.emit("registerUser", currUser.id);
    }

    socket.on("receiveMessage", onReceiveMessage);

    if (userId && currUser?.id) {
      socket.emit("seen", {
        senderId: currUser?.id,
        receiverId: userId,
      });

      
      socket.on("seen", onSeen);
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("receiveMessage", onReceiveMessage);
      socket.off("seen", onSeen);
    };
  }, [currUser?.id, userId]);

  const messages = useMemo(() => {
    return [...chatHistory, ...realtimeMessages]
      .filter((message, index, allMessages) => {
        const isSameChat =
          (message.sender_id === currUser?.id &&
            message.receiver_id === userId) ||
          (message.sender_id === userId &&
            message.receiver_id === currUser?.id);

        if (!isSameChat) return false;

        if (!message.id) return true;

        return allMessages.findIndex((msg) => msg.id === message.id) === index;
      })
      .sort((a, b) => {
        const first = new Date(a.created_at || 0).getTime();
        const second = new Date(b.created_at || 0).getTime();
        return first - second;
      });
  }, [chatHistory, realtimeMessages, currUser?.id, userId]);

  const sendMessage = () => {
    const trimmed = input.trim();

    if (!trimmed || !currUser?.id || !userId) return;

    const message = {
      sender_id: currUser.id,
      receiver_id: userId,
      text: trimmed,
    };

    socket.emit("sendMessage", message);
    setInput("");
  };

  const lastSentIndex = messages.findLastIndex(
  (m) => m.sender_id === currUser?.id
);

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      <div className="bg-secondary p-4 text-white shrink-0">
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

      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
          key={msg.id || index}
          >
            <div
              
              className={`mb-2 flex ${msg.sender_id === currUser?.id ? "justify-end" : "justify-start"}`}
            >
              <span
                className={`inline-block max-w-[75%] rounded-2xl px-4 py-3 text-md wrap-break-word ${
                  msg.sender_id === currUser?.id
                    ? "bg-secondary text-white rounded-br-sm"
                    : "bg-gray-200 text-gray-900 rounded-bl-sm"
                }`}
              >
                {msg.message || msg.text}
                <div className="flex items-center gap-2 justify-end">
                  <p
                    className={`text-xs font-medium text-right ${msg.sender_id === currUser?.id ? "text-gray-300" : "text-gray-500"} `}
                  >
                    {format(msg.created_at, " h:mm aa")}
                  </p>
                  {msg.sender_id === currUser?.id && (  // ✅ only on sent messages
  readBy[userId] && index === lastSentIndex ? (
    <div className="flex text-blue-300">
      <Check size={12} />
      <Check size={12} className="-ml-1.5" />
    </div>
  ) : (
    <Check size={12} className="text-gray-300" />
  )
)}
                </div>
              </span>
            </div>
          </div>
        ))}
      </div>

      {userId && (
        <div className="flex items-center gap-2 p-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            className="bg-primary hover:bg-darkest p-3 py-3 rounded-2xl"
          >
            <Send size={18} className="text-white" />
          </button>

          {/* <NewButton text={"send"} onClick={sendMessage} /> */}
        </div>
      )}
    </div>
  );
};

export default ChatArea;
