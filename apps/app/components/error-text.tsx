import { cn } from "@workspace/ui/lib/utils";
import React from "react";

export const ErrorText = ({
  className,
  message,
}: {
  className?: string;
  message?: string;
}) => {
  return (
    <em className={cn("text-destructive text-sm", className)}>{message}</em>
  );
};
