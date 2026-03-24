import { Trash2 } from "lucide-react";

const DeleteModal = ({ title, deleteEntity, closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-50 mb-5">
         <Trash2 className="text-red-500"/>
        </div>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Are you sure you want to delete <b className="text-slate-900">{title}</b>?
        </p>

        <div className="flex gap-3 w-full">
          <button
            className="flex-1 px-4 py-2.5 text-slate-700 bg-white border border-slate-300 font-medium rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            onClick={closeModal}
          >
            No, cancel
          </button>
          <button
            className="flex-1 px-4 py-2.5 text-white bg-red-600 font-medium rounded-xl hover:bg-red-700 active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600/20"
            onClick={deleteEntity}
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;