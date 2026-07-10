import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export default function Card({ className, glass = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 transition-all duration-300",
        glass
          ? "bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/8 hover:border-white/20"
          : "bg-white border-gray-200 shadow-sm hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
