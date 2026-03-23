import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts"; // Added Cell for color mapping
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDisplayTasks } from "@/hooks/useDisplayTasks";



const chartConfig = {
  Pending: {
    label: "Pending",
    color: "#EF4444", // red-500
  },
  Completed: {
    label: "Completed",
    color: "#10B981", // primary/green
  },
  "In-Progress": {
    label: "In Progress",
    color: "#f59e0b", // yellow-500
  },
  "In-Review": {
    label: "In Review",
    color: "#3B82F6",
  },
};

export function PieDonutText() {

  const {chartData, tasksToUse, countCompleted, countInProgress, countInReview, countTodo} = useDisplayTasks()

  const totalTasks = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.tasks, 0);
  }, [chartData]);

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold">Task Statistics</h3>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ChartContainer
          className="aspect-square w-80 h-80"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
            <Pie
              data={chartData}
              dataKey="tasks"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.status]?.color || "#ccc"}
                />
              ))}

              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        dominantBaseline="middle"
                        textAnchor="middle"
                        x={viewBox.cx}
                        y={viewBox.cy}
                      >
                        <tspan
                          className="fill-foreground text-3xl font-bold"
                          x={viewBox.cx}
                          y={viewBox.cy}
                        >
                          {totalTasks.toLocaleString()}
                        </tspan>
                        <tspan
                          className="fill-muted-foreground"
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-red-500 w-3 h-3 rounded-full shrink-0" />
          <p className="text-sm font-medium">Pending</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-primary w-3 h-3 rounded-full shrink-0" />
          <p className="text-sm font-medium">Completed</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-yellow-500 w-3 h-3 rounded-full shrink-0" />
          <p className="text-sm font-medium">In Progress</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 w-3 h-3 rounded-full shrink-0" />
          <p className="text-sm font-medium">In Review</p>
        </div>
      </div>
    </div>
  );
}

export default PieDonutText;
