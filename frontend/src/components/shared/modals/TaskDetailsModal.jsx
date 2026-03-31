import React from "react";
import NewButton from "../NewButton";
import { format } from "date-fns";

const TaskDetailsModal = ({ closeModal, data }) => {
  const formatDate = (date) => {
    if (!date) return "—";
    try {
      return format(new Date(date), "do MMM yyyy · h:mma");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8 relative animate-in fade-in zoom-in-95 duration-200">


        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Task Details
          </h1>
          <button
            onClick={closeModal}
            className="bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 h-9 w-9 flex items-center justify-center rounded-full transition"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {data?.title || "Untitled Task"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {data?.description || "No description provided"}
          </p>
          <h2 className="text-sm font-medium mt-2 text-gray-500 mt-1">{data?.workspace_name ?? "Unknown"}</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-4">
            <div>
              <p className="text-gray-400">Status</p>
              <span className="inline-block mt-1 px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                {data?.status || "—"}
              </span>
            </div>

            <div>
              <p className="text-gray-400">Priority</p>
              <span className="inline-block mt-1 px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
                {data?.priority || "—"}
              </span>
            </div>

            <div>
              <p className="text-gray-400">Assigned By</p>
              <p className="font-medium text-gray-800">
                {data?.creator_name || "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Assigned To</p>
              <p className="font-medium text-gray-800">
                {data?.assignee_name || "Unknown"}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-400">Created At</p>
              <p className="font-medium text-gray-800">
                {formatDate(data?.created_at)}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Updated At</p>
              <p className="font-medium text-gray-800">
                {formatDate(data?.updated_at)}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Due Date</p>
              <p className="font-medium text-gray-800">
                {formatDate(data?.due_date)}
              </p>
            </div>
          </div>
        </div>

        

      </div>
    </div>
  );
};

export default TaskDetailsModal;