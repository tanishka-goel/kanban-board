const TaskStatisticsSkeleton = () => {
  return (
    <div className="bg-gray-50 animate-shimmer flex gap-3 flex-col p-4 items-center">
      <div className="bg-gray-200 animate-shimmer mb-10 mt-10 w-40 rounded-lg h-7" />
      <div className="flex  items-center justify-center">
        <div className="relative flex items-center justify-center h-98 w-98 animate-shimmer rounded-full bg-gray-100 ">
          <div className="absolute h-62 w-62 rounded-full animate-shimmer bg-white" />
        </div>
      </div>
      <div className="mt-5">
        <ul className="flex animate-shimmer list-disc gap-5">
          <li className="bg-gray-200 animate-shimmer w-20 h-5 rounded-lg" />
          <li className="bg-gray-200 animate-shimmer w-20 h-5 rounded-lg" />
          <li className="bg-gray-200 animate-shimmer w-20 h-5 rounded-lg" />
          <li className="bg-gray-200 animate-shimmer w-20 h-5 rounded-lg" />
        </ul>
      </div>
    </div>
  );
};

export default TaskStatisticsSkeleton;
