"use client";

import { api } from "@workspace/network";
import { Loader2, Check, X } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  loginFormSchema,
  signupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@workspace/validations";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { useEffect, useState } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

export type AuthMode =
  | "login"
  | "signup"
  | "forgot-password"
  | "reset-password";

export const AuthForm = ({
  mode,
  className,
}: {
  mode: AuthMode;
  className?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "loading" | "available" | "unavailable"
  >("idle");
  const [usernameMessage, setUsernameMessage] = useState("");

  const checkUsername = async (username: string) => {
    if (!username || username.length < 2) {
      setUsernameStatus("idle");
      return;
    }

    setUsernameStatus("loading");
    try {
      const { data } = await api.get(`/check-username?username=${username}`);
      if (data.available) {
        setUsernameStatus("available");
        setUsernameMessage("Username is available");
      } else {
        setUsernameStatus("unavailable");
        setUsernameMessage(data.reason || "Username is taken");
      }
    } catch (error) {
      setUsernameStatus("unavailable");
      // console.error(error); // silent fail or user feedback
      setUsernameMessage("Error checking availability");
    }
  };

  let schema;
  let title = "";
  let subtitle = "";

  switch (mode) {
    case "login":
      schema = loginFormSchema;
      title = "Welcome back";
      subtitle = "Enter your credentials to access your account";
      break;
    case "signup":
      schema = signupSchema;
      title = "Create an account";
      subtitle = "Enter your information to get started";
      break;
    case "forgot-password":
      schema = forgotPasswordSchema;
      title = "Forgot password?";
      subtitle = "Enter your email to reset your password";
      break;
    case "reset-password":
      schema = resetPasswordSchema;
      title = "Reset password";
      subtitle = "Enter your new password below";
      break;
    default:
      schema = loginFormSchema;
      title = "Welcome back";
      subtitle = "Enter your credentials to access your account";
  }

  const form = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: {
      identifier: "",
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      username: "",
    },
  });

  function onSubmit(values: any) {
    if (mode === "login") {
      const { identifier, password } = values;
      const isEmail = identifier.includes("@");

      const payload = {
        email: isEmail ? identifier : undefined,
        username: isEmail ? undefined : identifier,
        password,
      };

      const result = loginSchema.safeParse(payload);

      if (result.success) {
        console.log("Login Payload:", result.data);
      } else {
        console.error("Login Validation Failed:", result.error);
      }
    } else {
      console.log(values);
    }
  }

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
        <CardDescription className="text-center">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {mode === "signup" && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="johndoe"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => {
                              field.onChange(e);
                              if (usernameStatus !== "idle")
                                setUsernameStatus("idle");
                            }}
                            onBlur={(e) => {
                              field.onBlur();
                              checkUsername(e.target.value);
                            }}
                          />
                          {usernameStatus === "loading" && (
                            <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
                          )}
                          {usernameStatus === "available" && (
                            <Check className="absolute right-3 top-2.5 h-4 w-4 text-green-500" />
                          )}
                          {usernameStatus === "unavailable" && (
                            <X className="absolute right-3 top-2.5 h-4 w-4 text-destructive" />
                          )}
                        </div>
                        {usernameStatus === "unavailable" && (
                          <p className="text-[0.8rem] font-medium text-destructive mt-1">
                            {usernameMessage}
                          </p>
                        )}
                        {usernameStatus === "available" && (
                          <p className="text-[0.8rem] font-medium text-green-500 mt-1">
                            {usernameMessage}
                          </p>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {mode === "login" && (
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com or johndoe"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {mode === "forgot-password" && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {["login", "signup", "reset-password"].includes(mode) && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {mode === "reset-password" ? "New Password" : "Password"}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="******"
                          {...field}
                          value={field.value || ""}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {mode === "reset-password" && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="******"
                          {...field}
                          value={field.value || ""}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {mode === "login" && (
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            <Button className="w-full" type="submit">
              {mode === "login" && "Login"}
              {mode === "signup" && "Sign Up"}
              {mode === "forgot-password" && "Send Reset Link"}
              {mode === "reset-password" && "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center text-sm">
          {mode === "login" && (
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          )}
          {mode === "signup" && (
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          )}
          {mode === "forgot-password" && (
            <p>
              Remember your password?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
