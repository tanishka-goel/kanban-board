import {z} from "zod";

export const workspaceSchema = z.object({
  workspace_name: z.string().min(2, "Workspace name must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 words"),
  creatorName: z.string().min(1),
  creatorID: z.string().min(1),
  members: z.array(z.string()).min(1, "At least one member required"),
});