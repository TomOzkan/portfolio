"use client";

import { motion } from "framer-motion";

type LogoAnimatedProps = {
  duration?: number;
  color?: string;
};

export default function LogoAnimated({ duration, color }: LogoAnimatedProps) {
  const fillColor = color || "#FFF";
  const animationDuration = duration || 1;

  return (
    <motion.svg
      width="160"
      height="260"
      viewBox="0 0 450 450"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        strokeDasharray="1000"
        strokeDashoffset="1000"
        initial={{ strokeDashoffset: 1000, fill: "none" }}
        animate={{ strokeDashoffset: 0, fill: fillColor }}
        transition={{
          duration: animationDuration,
          fill: { delay: animationDuration * 0.5, duration: animationDuration * 0.5 },
          repeat: Infinity,
          repeatType: "reverse",
        }}
        exit={{ strokeDashoffset: 1000 }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M184.15 33.584L251.025 54.151L149.012 385.852C137.654 422.786 98.5043 443.519 61.5701 432.161L184.15 33.584Z"
        stroke={fillColor}
        strokeOpacity="0.5"
        fillOpacity={0.5}
        strokeWidth="2.75"
      />
      <motion.path
        strokeDasharray="1000"
        strokeDashoffset="1000"
        initial={{ strokeDashoffset: 1000, fill: "none" }}
        animate={{ strokeDashoffset: 0, fill: fillColor }}
        transition={{
          duration: animationDuration,
          fill: { delay: animationDuration * 0.5, duration: animationDuration * 0.5 },
          repeat: Infinity,
          repeatType: "reverse",
        }}
        exit={{ strokeDashoffset: 1000 }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 70L0 0L417 0C417 38.6599 385.66 70 347 70L0 70Z"
        stroke={fillColor}
        fillOpacity={0.5}
        strokeOpacity="0.5"
        strokeWidth="2.75"
      />
      <motion.circle
        cx="292.5"
        cy="351.5"
        r="85.5"
        initial={{ strokeDashoffset: 1000, fill: "none", scale: 0 }}
        animate={{ strokeDashoffset: 0, fill: fillColor, scale: 1 }}
        transition={{
          duration: animationDuration,
          fill: { delay: animationDuration * 0.5, duration: animationDuration * 0.5 },
          scale: { duration: animationDuration },
          repeat: Infinity,
          repeatType: "reverse",
        }}
        fillOpacity={0.5}
        stroke={fillColor}
      />
    </motion.svg>
  );
}
