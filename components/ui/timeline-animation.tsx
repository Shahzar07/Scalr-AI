
"use client";
import React from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// Fix: define explicit props interface for TimelineContent
interface TimelineContentProps {
  // Fix: make children optional to satisfy TS compiler in cases where JSX children aren't mapped to props
  children?: React.ReactNode;
  animationNum?: number;
  // Fix: use any for RefObject to avoid strict variance issues with specific HTML element types
  timelineRef: React.RefObject<any>;
  customVariants?: Variants;
  className?: string;
  as?: any;
}

export const TimelineContent = ({
  children,
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
  as = 'div'
}: TimelineContentProps) => {
  // useInView expects a ref of an element to monitor visibility
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });
  
  // Dynamically select the motion component based on the 'as' prop
  const Tag = (motion as any)[as as string] || motion.div;

  return (
    <Tag
      variants={customVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      className={className}
    >
      {children}
    </Tag>
  );
};
