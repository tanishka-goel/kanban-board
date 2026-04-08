import {
  useGetNotifications,
  useGetReadNotifications,
  useMarkAsRead,
} from "@/queries/notifications.query";
import { format } from "date-fns";
import {
  ClipboardCheck,
  Loader2Icon,
  Meh,
  MessageCircle,
  X,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const NotificationsModal = () => {
  const { user: currUser } = useSelector((state) => state.auth);
  const { data: allNotifications = [], isLoading: notificationLoading } =
    useGetNotifications(currUser?.id);
  const {
    data: allReadNotifications = [],
    isLoading: readNotificationLoading,
  } = useGetReadNotifications(currUser?.id);
  const { mutate: markAsRead } = useMarkAsRead();
  const [activeTab, setActiveTab] = useState("Unread");

  const isUnreadTab = activeTab === "Unread";
  const notifications = isUnreadTab ? allNotifications : allReadNotifications;

  const handleRead = (notifId) => {
    markAsRead(notifId);
  };


  const allLoading = readNotificationLoading || notificationLoading;
  if (allLoading)
    return (
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
    );

  return (
    <div className="absolute p-2 right-0 mt-3 w-120 max-w-4xl bg-white rounded-xl shadow-xl z-50 border border-gray-200 overflow-hidden">
      <div className="p-4 flex items-center justify-between font-semibold border-b">
        <h1>Notifications</h1>
        <div className="relative flex items-center bg-gray-100 rounded-lg p-1 w-fit">
          <div
            className={`absolute top-1 bottom-1 w-1/2 rounded-md bg-white shadow transition-all duration-300 ${
              activeTab === "Unread" ? "left-1" : "left-[calc(50%-2px)]"
            }`}
          />

          <button
            onClick={() => setActiveTab("Unread")}
            className={`relative z-10 px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === "Unread"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Unread
          </button>

          <button
            onClick={() => setActiveTab("Read")}
            className={`relative z-10 px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === "Read"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Read
          </button>
        </div>
      </div>

      <div></div>

      <div className="max-h-180 h-auto overflow-y-auto">
        {notifications.length === 0 && allReadNotifications === 0 ? (
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
          <div className="p-2 h-110">
            <div className="flex items-center gap-1.5 px-4 pt-3 pb-1.5">
              <ClipboardCheck size={11} className="text-gray-500" />
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-gray-400">
                Workspaces & Tasks
              </span>
            </div>

            {notifications.length === 0 ? (
              isUnreadTab ? (
                <div className="p-3 bg-gray-200 h-full flex flex-col items-center text-center">
                  <h1 className="mt-40 text-gray-500">No unread notifications</h1>
                </div>
              ) : (
               <div className="p-2 bg-gray-200  h-full flex flex-col items-center text-center">
                  <h1 className="mt-40 text-gray-500">No Read notifications</h1>
                </div>
              )
            ) : (
              notifications.map((notif) => (
                <div key={notif.id}>
                  <div className="flex items-center hover:bg-gray-50 px-2 transition-transform duration-300 ease-in justify-between">
                    <div className="my-3 flex items-center gap-2">
                      <div
                        className={`${
                          notif.entity_type === "task"
                            ? "bg-purple-100"
                            : "bg-indigo-100"
                        } rounded-xl w-14 h-14 flex items-center justify-center`}
                      >
                        <p
                          className={`font-bold ${
                            notif.entity_type === "task"
                              ? "text-purple-600"
                              : "text-indigo-600"
                          } text-lg`}
                        >
                          {notif.actor?.first_name?.slice(0, 1) ??
                            notif?.creatorName}
                        </p>
                      </div>

                      <div>
                        <p className="text-md mb-0.5">
                          <span
                            className={`text-xs font-medium uppercase ${
                              notif.title === "Task assigned"
                                ? "text-purple-600 font-medium"
                                : "text-blue-400 font-medium"
                            }`}
                          >
                            {notif.title} :
                          </span>{" "}
                          <b>{notif.actor?.first_name ?? notif?.creatorName}</b>{" "}
                          {notif.description}
                        </p>

                        <div className="flex items-center gap-2">
                          <p className="text-gray-400 text-sm">
                            {format(notif.created_at, "MMM do • hh:mm a")}
                          </p>

                          <div
                            className={`${
                              notif.title === "Task assigned"
                                ? "text-black bg-pink-100"
                                : "bg-cyan-100 text-black font-medium"
                            } p-1 px-3 rounded-2xl`}
                          >
                            <p className="text-xs font-medium text-gray-800">
                              {notif.entity_type}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isUnreadTab && (
                      <button
                        onClick={() => handleRead(notif.id)}
                        className="bg-gray-100 p-1 hover:bg-gray-200 rounded-full"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsModal;
