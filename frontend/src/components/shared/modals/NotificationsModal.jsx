import { ClipboardCheck, Meh, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const NotificationsModal = () => {
  const [notifications, setNotifications] = useState(true);
  const { user: currUser } = useSelector((state) => state.auth);

  //console.log("curr user", currUser)

  return (
    <div className="absolute p-2 right-0 mt-3 w-120 max-w-4xl bg-white rounded-xl shadow-xl z-50 border border-gray-200 overflow-hidden">
      <div className="p-4 font-semibold border-b">Notifications</div>

      <div className="max-h-180 h-auto overflow-y-auto">
        {!notifications ? (
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
            <div>
              <div className="flex items-center gap-1.5 px-4 pt-3 pb-1.5">
                <ClipboardCheck size={11} className="text-gray-500" />
                <span className="text-[10.5px] font-semibold uppercase tracking-wider text-gray-400">
                  Workspaces & Tasks
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="">
                  <div className="my-3 flex items-center gap-2">
                    <div className="bg-purple-100 rounded-xl w-14 h-14 flex items-center justify-center">
                      <p className="font-bold text-purple-600 text-lg">A</p>
                    </div>
                    <div className="">
                      <p className="text-md mb-0.5">
                        {" "}
                        <b>Arjun</b> assigned you to{" "}
                        <b>Design system audit</b>{" "}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-400 text-sm">2m ago</p>
                        <div className="bg-blue-100 p-1 px-3 rounded-2xl">
                          {" "}
                          <p className="text-xs font-medium text-gray-800">
                            Task
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-full h-2 w-2 bg-emerald-500 animate-pulse"></div>
              </div>

              
            </div>

            <div className="flex items-center gap-1.5 px-4 pt-2 pb-1.5">
              <MessageCircle size={11} className="text-gray-500" />
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-gray-400">
                Messages
              </span>
            </div>

           
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsModal;
