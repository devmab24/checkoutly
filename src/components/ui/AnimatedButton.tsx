
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonProps {
  asChild?: boolean;
  animation?: 
    | "scale" 
    | "slide-right" 
    | "slide-up" 
    | "none";
  containerClassName?: string;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, asChild = false, animation = "scale", containerClassName, ...props }, ref) => {
    const Comp = asChild ? Slot : Button;

    const buttonTransition = {
      scale: "hover:scale-105 active:scale-95",
      "slide-right": "group-hover:translate-x-1",
      "slide-up": "group-hover:-translate-y-1",
      none: "",
    };

    return (
      <div className={cn("group relative inline-flex", containerClassName)}>
        <Comp
          className={cn(
            "transition-all duration-200 ease-out",
            buttonTransition[animation],
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      </div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
