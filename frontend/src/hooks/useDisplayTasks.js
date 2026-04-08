import { useTasks } from "@/queries/tasks.query";
import { useSelector } from "react-redux";

export const useDisplayTasks = () => {
  const { data: alltasks } = useTasks();
  const { user } = useSelector((state) => state.auth);

  //console.log("userid for current task : ", user.id)
  //console.log("All tasks", alltasks)

  let countTodo = 0;
  let countInProgress = 0;
  let countCompleted = 0;
  let countInReview = 0;

  const getTasksforcurruser = alltasks?.filter((at) => {
    //console.log("taskid : ", at.assigned_user_id + " "+ at.status)
    return at.assigned_user_id === user.id;
  });

  const tasksToUse = user?.role === "admin" ? alltasks : getTasksforcurruser;

  //console.log("T", getTasksforcurruser)

  tasksToUse?.forEach((task) => {
    if (task.status === "todo") countTodo++;
    else if (task.status === "in_progress") countInProgress++;
    else if (task.status === "completed") countCompleted++;
    else if (task.status === "in_review") countInReview++;
  });

  const chartData = [
    { status: "Pending", tasks: countTodo },
    { status: "Completed", tasks: countCompleted },
    { status: "In-Progress", tasks: countInProgress },
    { status: "In-Review", tasks: countInReview },
  ];

  return {
    chartData,
    tasks: tasksToUse,
    countCompleted,
    countInProgress,
    countInReview,
    countTodo,
  };
};
