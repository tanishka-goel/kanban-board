import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/queries/users.query";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useMessages } from "@/queries/messages.query";
import { format } from "date-fns";
import { Check, CheckCheck, MessagesSquareIcon, Send } from "lucide-react";
import ChatAreaSkeleton from "@/components/shared/skeletons/chatSkeletons/ChatAreaSkeleton";

const CHAT_SERVER_URL =
  import.meta.env.VITE_CHAT_SERVER_URL || "http://localhost:3000";

const socket = io(CHAT_SERVER_URL);

const ChatArea = () => {
  const [realtimeMessages, setRealtimeMessages] = useState([]);
  const [input, setInput] = useState("");
  const { data: allusers, isLoading:usersLoading } = useUsers();
  const { user: currUser } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const { data: chatHistory = [], isLoading:messageLoading } = useMessages(currUser?.id, userId);

  const getChatUser = allusers?.find((u) => u.id === userId);

  useEffect(() => {
    const onReceiveMessage = (message) => {
      setRealtimeMessages((prev) => {
        if (message.id && prev.some((m) => m.id === message.id)) return prev;

        return [...prev, message];
      });
    };

    const onSeen = ({ by }) => {
      setReadBy((prev) => ({ ...prev, [by]: true }));
    };

    if (currUser?.id) {
      socket.emit("registerUser", currUser.id);
    }

    socket.on("receiveMessage", onReceiveMessage);
    socket.on("seen", onSeen);

    return () => {
      socket.off("receiveMessage", onReceiveMessage);
      socket.off("seen", onSeen);
    };
  }, [currUser?.id]);

  const messages = useMemo(() => {
    return [...chatHistory, ...realtimeMessages]
      .filter((msg, index, arr) => {
        const valid =
          (msg.sender_id === currUser?.id && msg.receiver_id === userId) ||
          (msg.sender_id === userId && msg.receiver_id === currUser?.id);

        if (!valid) return false;

        if (!msg.id) return true;

        return arr.findIndex((m) => m.id === msg.id) === index;
      })
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }, [chatHistory, realtimeMessages, currUser?.id, userId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("sendMessage", {
      sender_id: currUser.id,
      receiver_id: userId,
      text: input,
    });

    setInput("");
  };

  useEffect(() => {
    if (!messages.length) return;

    socket.emit("seen", {
      sender_id: userId,
      receiver_id: currUser?.id,
    });
  }, [messages]);

  const msgDate = messages?.map((md) => md.created_at.replace(" ", "T"));
  //  const newDate = new Date(messages.created_at.replace(" ", "T"))
  console.log("msg date", msgDate);
  //console.log("msg date", newDate)

  const [readBy, setReadBy] = useState({});

  function getDateLabel(dateStr) {
    const date = new Date(dateStr.replace(" ", "T"));
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return format(date, "MMMM d, yyyy");
  }

  const pageLoading = usersLoading || (!!userId && messageLoading);
  if (pageLoading) {
    return <ChatAreaSkeleton />;
  }

  return (
    <>
      {!getChatUser ? (
        <div className="flex hover:scale-103 transition-transform ease-out duration-300 flex-1 items-center justify-center h-full">
          <div
            className="flex flex-col items-center justify-center gap-6 
                  w-full max-w-4xl h-[80%]
                  bg-white/70 backdrop-blur-lg 
                  border border-gray-200 
                  shadow-2xl rounded-3xl 
                  px-12 py-16 text-center 
                  transition-all"
          >
            <div className="bg-secondary/20 p-6 rounded-full">
              <MessagesSquareIcon className="w-14 h-14 text-secondary" />
            </div>

            <h1 className="text-2xl font-semibold text-gray-800">
              Start a Conversation
            </h1>

            <p className="text-base text-gray-500 max-w-md">
              Select a user from the sidebar to begin chatting. Your messages
              will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="bg-linear-to-r from-secondary to-slate-950 p-4 text-white">
            {getChatUser && (
              <div className="flex items-center gap-2">
                <div className=" relative rounded-full  w-10 h-10 bg-linear-to-br from-black to-darkest">
                  <h1 className="absolute  text-white ml-2.5 mt-2 font-medium text-sm">
                    {getChatUser.first_name.slice(0, 1)}
                    {getChatUser.last_name.slice(0, 1)}
                  </h1>
                </div>
                <h1>
                  {getChatUser.first_name} {getChatUser.last_name}
                </h1>
              </div>
            )}
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 bg-cover bg-center"
            style={{
              backgroundImage: "url('/chatbg3.png')",
            }}
          >
            {messages.map((msg, index) => {
              const isOwn = msg.sender_id === currUser?.id;
              const msgDateStr = msg.created_at.replace(" ", "T");
              const msgDate = format(new Date(msgDateStr), "yyyy-MM-dd");
              const prevMsgDate =
                index > 0
                  ? format(
                      new Date(
                        messages[index - 1].created_at.replace(" ", "T"),
                      ),
                      "yyyy-MM-dd",
                    )
                  : null;

              const showDateBadge = msgDate !== prevMsgDate;

              return (
                <div key={msg.id || index}>
                  {showDateBadge && (
                    <div className="flex justify-center my-3">
                      <span className="bg-black/40 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                        {getDateLabel(msg.created_at)}
                      </span>
                    </div>
                  )}

                  <div
                    className={`flex mb-2 ${
                      isOwn ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span
                      className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                        isOwn
                          ? "bg-secondary text-white"
                          : "bg-darkest text-white"
                      }`}
                    >
                      {msg.message}

                      <div className="flex justify-end items-center gap-2">
                        <p
                          className={`text-xs  ${
                            isOwn ? "text-gray-300" : "text-gray-300"
                          }`}
                        >
                          {format(msg.created_at, "hh:mm a")}
                        </p>

                        {isOwn &&
                          (msg.seen ? (
                            <div className="flex text-blue-400">
                              <CheckCheck size={12} />
                            </div>
                          ) : (
                            <Check size={12} />
                          ))}
                      </div>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex p-2 gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={sendMessage} className="bg-primary p-3 rounded-xl">
              <Send className="text-white" size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatArea;
