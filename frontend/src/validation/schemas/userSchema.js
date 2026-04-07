import { z } from "zod";

export const userSchema = z.object({
  first_name: z
    .string()
    .min(1, "Please enter your first name")
    .min(2, "First name must be at least 2 characters"),

  last_name: z
    .string()
    .min(1, "Please enter your last name")
    .min(2, "Last name must be at least 2 characters"),

  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Invalid email address"),

  username: z
    .string()
    .min(1, "Please enter a username")
    .min(3, "Username must be at least 3 characters"),

  password: z
    .string()
    .min(1, "Please enter a password")
    .min(6, "Password must be at least 6 characters")
    .optional(),

  role: z.enum(["user", "admin"], {
    errorMap: (issue) => {
      if (issue.code === "invalid_type") return { message: "Please select a role" };
      return { message: "Invalid role selected" };
    },
  }),
});