"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoAnimated from "@/components/LogoAnimated";


type PageTransitionProps = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export default function PageTransition({ isLoading, setIsLoading }: PageTransitionProps) {

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, setIsLoading]);

  return (
    <AnimatePresence mode="popLayout">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0, ease: "easeIn", type: "spring" } }}
          exit={{ opacity: 0, transition: { duration: 0.75, ease: "easeIn" } }}
          className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-blue-500 text-white"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <LogoAnimated />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
