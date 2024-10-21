// src/components/ui/avatar.tsx
import * as React from "react"
import {cn} from "../../lib/utils"

export function Avatar({ className="", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative flex shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  )
}

export function AvatarImage({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      className={cn("aspect-square h-full w-full", className || "")}
      {...props}
    />
  )
}

export function AvatarFallback({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className || ""
      )}
      {...props}
    />
  )
}
