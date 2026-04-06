import { useGetNotifications } from "@/queries/notifications.query";
import { ClipboardCheck, Loader2Icon, Meh, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const NotificationsModal = () => {
  const { user: currUser } = useSelector((state) => state.auth);
  const { data: allNotifications = [], isLoading: notificationLoading } =
    useGetNotifications(currUser?.id);

  //console.log("curr user", currUser)
  console.log("all notifs", allNotifications)

  if(notificationLoading) return (
    <div className="absolute p-2 right-0 mt-3 w-120 max-w-4xl bg-white rounded-xl shadow-xl z-50 border border-gray-200 overflow-hidden">
       <div className="p-4  text-sm text-center text-gray-600">
            <div className="bg-gray-200 animate-shimmer flex items-center flex-col p-2 rounded-lg">
              <br />
              <div>
                <Loader2Icon className="animate-spin" size={40} />
              </div>
              <h1 className="p-3"> Loading notifications</h1>
            </div>
          </div>
    </div>
  )

  return (
    <div className="absolute p-2 right-0 mt-3 w-120 max-w-4xl bg-white rounded-xl shadow-xl z-50 border border-gray-200 overflow-hidden">
      <div className="p-4 font-semibold border-b">Notifications</div>

      <div className="max-h-180 h-auto overflow-y-auto">
        {allNotifications.length === 0 ? (
          <div className="p-4  text-sm text-center text-gray-600">
            <div className="bg-gray-200 flex items-center flex-col p-2 rounded-lg">
              <br />
              <div>
                <Meh size={40} />
              </div>
              <h1 className="p-3"> No new notifications</h1>
            </div>
          </div>
        ) : (
          <div className="p-2">
            <div className="flex items-center gap-1.5 px-4 pt-3 pb-1.5">
                  <ClipboardCheck size={11} className="text-gray-500" />
                  <span className="text-[10.5px] font-semibold uppercase tracking-wider text-gray-400">
                    Workspaces & Tasks
                  </span>
                </div>
            {allNotifications.map((notif) => (
              <div key={notif.id}>
                

                <div className="flex items-center hover:bg-gray-50 px-2 transition-transform duration-300 ease-in justify-between">
                  <div className="">
                    <div className="my-3 flex items-center gap-2">
                      <div className={`${notif.entity_type === "task"? "bg-purple-100":"bg-indigo-100"} rounded-xl w-14 h-14 flex items-center justify-center`}>
                        <p className={`font-bold ${notif.entity_type === "task"? "text-purple-600":"text-indigo-600"}  text-lg`}>
                          {" "}
                          {notif.actor?.first_name.slice(0,1) ?? notif?.creatorName}  
                        </p>
                      </div>
                      <div className="">
                        <p className="text-md mb-0.5">
                          {" "} <span className={`text-xs font-medium text-gray-500 uppercase ${notif.title === "Task assigned" ? "text-red-600" :"text-blue-400"}`}>{notif.title} : </span>
                          <b>
                             {notif.actor?.first_name ?? notif?.creatorName} 
                          </b>{" "}
                          {notif.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-400 text-sm">2m ago</p>
                          <div className="bg-blue-100 p-1 px-3 rounded-2xl">
                            {" "}
                            <p className="text-xs font-medium text-gray-800">
                              {notif.entity_type}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-full h-2 w-2 bg-emerald-500 animate-pulse"></div>
                </div>
              </div>
            ))}

            {/* <div className="flex items-center gap-1.5 px-4 pt-2 pb-1.5">
              <MessageCircle size={11} className="text-gray-500" />
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-gray-400">
                Messages
              </span>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsModal;
