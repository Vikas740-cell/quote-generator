import React from "react";
import { motion as Motion } from "framer-motion";

const Background = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary Blob */}
      <Motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute -top-20 -left-20 w-96 h-96 rounded-full blur-[100px] opacity-20 dark:opacity-40 
          ${isDark ? "bg-purple-600" : "bg-purple-400"}`}
      />

      {/* Secondary Blob */}
      <Motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute top-1/2 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-15 dark:opacity-30 
          ${isDark ? "bg-blue-600" : "bg-blue-400"}`}
      />

      {/* Tertiary Blob */}
      <Motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 150, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute -bottom-20 left-1/4 w-72 h-72 rounded-full blur-[100px] opacity-20 dark:opacity-40 
          ${isDark ? "bg-cyan-600" : "bg-cyan-300"}`}
      />

      {/* Subtle Noise / Grain (Optional aesthetic touch) */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default Background;
