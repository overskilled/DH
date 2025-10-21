"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const progressValue = value || 0;
  const safeValue = Math.max(0, Math.min(100, progressValue));
  
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-blue-100",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
        style={{ width: `${safeValue}%` }}
      />
    </ProgressPrimitive.Root>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }