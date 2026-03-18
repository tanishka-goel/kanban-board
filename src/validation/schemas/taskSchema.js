import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z
    .string()
    .min(2, "Description name must be at least 2 characters"),
  status: z.enum(["todo", "in_progress", "in_review", "completed"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  creator_id: z.string(),
  workspace_id: z.string(),
});
