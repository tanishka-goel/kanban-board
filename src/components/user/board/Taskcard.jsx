import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

const Taskcard = ({ data, taskId }) => {

  const datee = data.due_date
  console.log("datee", datee)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: taskId,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const headerColor = {
    urgent: {
      divBar: "bg-red-500",
      badge: "bg-red-50 text-red-500",
    },
    high: {
      divBar: "bg-orange-500",
      badge: "bg-orange-50 text-orange-500",
    },
    low: {
      divBar: "bg-blue-500",
      badge: "bg-blue-50 text-blue-500",
    },
    medium: {
      divBar: "bg-yellow-500",
      badge: "bg-yellow-50 text-yellow-600",
    },
  };

  const priority = data.priority || "low";
  const colors = headerColor[priority];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="group cursor-grab active:cursor-grabbing 
      p-4 mb-3 rounded-2xl bg-white 
      border border-gray-200/70
      shadow-sm hover:shadow-lg
      transition-all duration-300 ease-out
      hover:-translate-y-1"
    >
      <div
        className={`${colors.divBar} mb-3 w-full h-1.5 rounded-full opacity-80`}
      />

      <h1 className="font-medium text-[15px] text-gray-900 -tracking-normal line-clamp-2">
        {data?.title}
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Assignee:{" "}
        <span className="text-gray-600 font-medium">
          {data.assignee_name || "Unassigned"}
        </span>
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span
          className={`${colors.badge} text-xs px-3 py-1 rounded-full font-semibold capitalize`}
        >
          {priority}
        </span>

        <span className="text-xs text-gray-400">
          Due : {data.due_date || "No Due Date"}
        </span>
      </div>
    </div>
  );
};

export default Taskcard;