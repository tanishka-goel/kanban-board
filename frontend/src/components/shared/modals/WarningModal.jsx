import { TriangleAlert } from "lucide-react";
import React from "react";

const WarningModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 text-center animate-in fade-in zoom-in-95 duration-200">
        
        <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100">
          <TriangleAlert className="text-yellow-600" size={28} />
        </div>

        <h2 className="text-lg font-semibold text-gray-800">
          Unsaved Changes
        </h2>

        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Are you sure you want to leave? Your changes will not be saved.
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium transition"
          >
            Leave Anyway
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;