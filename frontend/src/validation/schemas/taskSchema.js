import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  status: z.enum(["todo", "in_progress", "in_review", "completed"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  creator_id: z.string().min(1, "Creator ID is required"),
  creator_name: z.string().min(1, "Creator name is required"),
  workspace_id: z.string().min(1, "Workspace is required"),
  
  assigned_user_id: z.string().nullable().optional(),

  due_date: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "Invalid date format"
    ),
});
