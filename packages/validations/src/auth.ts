import { z } from "zod";

export const bannedUsernames = [
  "admin",
  "administrator",
  "root",
  "support",
  "help",
  "info",
  "contact",
  "webmaster",
  "hostmaster",
  "postmaster",
  "moderator",
  "billing",
  "payments",
  "sales",
  "marketing",
  "legal",
  "privacy",
  "terms",
  "security",
  "api",
  "app",
  "dashboard",
  "settings",
  "config",
  "profile",
  "user",
  "users",
  "group",
  "groups",
  "team",
  "teams",
  "org",
  "organization",
  "organizations",
  "invite",
  "invites",
  "auth",
  "authentication",
  "login",
  "logout",
  "signup",
  "register",
  "reset",
  "password",
  "email",
  "notification",
  "notifications",
  "static",
  "media",
  "assets",
  "public",
  "private",
  "test",
  "dev",
  "development",
  "prod",
  "production",
  "staging",
  "error",
  "status",
  "health",
  "ever-sub",
  "system",
  "bot",
  "noreply",
  "no-reply",
];

export const loginFormSchema = z.object({
  identifier: z.string().min(2, "Invalid username or email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z
  .object({
    email: z.string().email().optional(),
    username: z.string().min(2).optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.email || data.username, {
    message: "Email or Username is required",
    path: ["email"],
  });

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .refine(
      (username) => !bannedUsernames.includes(username.toLowerCase()),
      "This username is not allowed"
    ),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
