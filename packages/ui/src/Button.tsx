import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-black border-black hover:bg-primary/90",
      secondary: "bg-secondary text-black border-black hover:bg-secondary/90",
      outline: "bg-transparent text-white border-white hover:bg-white/10",
      ghost: "bg-transparent text-white border-transparent hover:bg-white/10 shadow-none",
    };

    const sizes = {
      sm: "h-8 px-3 py-1 text-[10px]",
      md: "h-10 px-4 py-2 text-xs",
      lg: "h-12 px-6 py-3 text-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center justify-center whitespace-nowrap font-bold uppercase tracking-widest transition-all",
          variant !== "ghost" && "border-3 shadow-brutalist active:translate-x-1 active:translate-y-1 active:shadow-none",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
