
"use client";
import { cn } from "../../lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
  className?: string;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className="relative w-full overflow-hidden bg-white transition-bg"
      {...props}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-100)_10%,var(--sky-100)_15%,var(--blue-50)_20%,var(--indigo-100)_25%,var(--blue-100)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[100px]
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] 
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_85%)]`
          )}
        ></div>
      </div>
      
      {/* 
         Alignment Fix: Apply 'className' to this div so that flex-center 
         and other layout utilities work exactly as they did on the original 'section'.
      */}
      <div className={cn("relative z-10 w-full h-full", className)}>
        {children}
      </div>
    </div>
  );
};
