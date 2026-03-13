import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts"; // Added Cell for color mapping
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { status: "Pending", tasks: 5 },
  { status: "Completed", tasks: 8 },
  { status: "In-Progress", tasks: 3 },
];

const chartConfig = {
  Pending: {
    label: "Pending",
    color: "#ef4444", // red-500
  },
  Completed: {
    label: "Completed",
    color: "#10b981", // primary/green
  },
  "In-Progress": {
    label: "In Progress",
    color: "#f59e0b", // yellow-500
  },
};

export function PieDonutText() {
  const totalTasks = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.tasks, 0);
  }, []);

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

      <div className="grid grid-cols-1 items-center justify-center md:grid-cols-3">
        <div className="flex items-center gap-2">
          <div className="bg-red-500 w-3 h-3 rounded-full"></div> <p>Pending</p>
        </div>

         <div className="flex items-center gap-2">
          <div className="bg-primary w-3 h-3 rounded-full"></div> <p>Completed</p>
        </div>

         <div className="flex items-center gap-2">
          <div className="bg-yellow-500 w-3 h-3 rounded-full"></div> <p>In Progress</p>
        </div>
      </div>
    </div>
  );
}

export default PieDonutText;
