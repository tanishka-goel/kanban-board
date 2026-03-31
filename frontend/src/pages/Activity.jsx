import Header from "@/components/shared/Header";
import HeaderSkeleton from "@/components/shared/skeletons/HeaderSkeleton";
import TableSkeleton from "@/components/shared/skeletons/TableSkeleton";
import { useActivityDetails } from "@/hooks/useActivityDetails";
import { useActivityLogs } from "@/queries/activity.query";
import React, { useMemo } from "react";
import { usePagination } from "@/hooks/usePagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";



const Activity = () => {
  const { activities, loading: activityLoading } = useActivityDetails();
  console.log("Activity: ", activities);

  const activityActionsColors = {
    created: {
      text: "text-green-600",
      bg: "bg-green-100",
    },
    updated: {
      text: "text-blue-600",
      bg: "bg-blue-100",
    },
    deleted: {
      text: "text-red-600",
      bg: "bg-red-100",
    },
  };

  
const activityActions = useMemo(() =>
  activities?.map((act) => {
    const style = activityActionsColors[act.action] || {
      text: "text-gray-600",
      bg: "bg-gray-100",
    };
    return { ...act, textColor: style.text, bgColor: style.bg };
  })||[],
[activities]);

  // const activityActions = activities?.map((act) => {
  //   const style = activityActionsColors[act.action] || {
  //     text: "text-gray-600",
  //     bg: "bg-gray-100",
  //   };

  //   return {
  //     ...act,
  //     textColor: style.text,
  //     bgColor: style.bg,
  //   };
  // });

   const { currentData, currentPage, totalPages, nextPage, prevPage } =
      usePagination(activityActions, 9);

  if (activityLoading) return (
   <div className="p-4">
    <HeaderSkeleton/><br />
     <TableSkeleton/>
   </div>
  );
  return (
    <div className="p-5">
      <Header header={"Activity Logs"} />

      <div className="hidden md:grid grid-cols-5 mt-5 px-6 py-3 text-sm font-semibold text-gray-500">
        <h1>User</h1>
        <h1>Action</h1>
        <h1>Workspace/Task</h1>
        <h1>Details</h1>
        <h1>Date</h1>
      </div>

      <div className="p-4">
        {currentData?.map((act) => (
          
          <div
  key={act.id}
  className="grid grid-cols-5 py-4 border-b transform transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md hover:bg-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-black w-10 h-10 flex items-center justify-center rounded-full">
                <div className="font-semibold text-white text-sm">
                  {act.user?.slice(0, 1)}
                </div>
              </div>
              <div className="font-semibold text-sm">{act.user}</div>
            </div>

            <div>
              {" "}
              <span
                className={`${act.bgColor} ${act.textColor} p-1 px-3 text-sm w-fit rounded-full`}
              >
                {act.action}
              </span>
            </div>
            <div className="font-semibold text-sm">{act.item}</div>
            <div className="font-semibold text-sm">{act.description}</div>
            <div className="font-semibold text-sm">{act.date}</div>
          </div>
        ))}
      </div>

       <div className="flex bottom-1  justify-center items-center text-center gap-10  md:p-10">
        <button
          disabled={currentPage === 1}
          className={`px-3 py-3 rounded-full 
            ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-linear-to-r from-primary  to-darkest text-white"
            }`}
          onClick={prevPage}
        >
          <ChevronLeftIcon />
        </button>
        <p className="text-custom-wine font-medium text-md text-center">
          {currentPage} / {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          className={`px-3 py-3 rounded-full 
            ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-linear-to-r from-primary  to-darkest  text-white"
            }`}
          onClick={nextPage}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

export default Activity;
