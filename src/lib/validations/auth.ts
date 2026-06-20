import * as zod from "zod";

const loginSchema = zod.object({
  username: zod.string().min(1, "Username is required"),
  password: zod.string().min(1, "Password is required"),
});

const registerSchema = zod
  .object({
    username: zod.string().min(1, "Username is required"),
    email: zod.email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: zod.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export { loginSchema, registerSchema };