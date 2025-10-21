"use client"

import { forwardRef } from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const safeValue = Math.max(0, Math.min(100, value || 0))
  
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-primary transition-all duration-300 ease-in-out"
        style={{ 
          width: `${safeValue}%`,
          // Using transform for better performance
          transform: `translateX(-${100 - safeValue}%)`
        }}
      />
    </ProgressPrimitive.Root>
  )
})

Progress.displayName = "Progress"

export { Progress }