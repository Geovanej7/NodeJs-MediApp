"use client";
import React from "react";
import { motion, easeInOut } from "framer-motion";

type LoadingButtonProps = {
  loading: boolean;
  children: React.ReactNode; // texto do botão quando não está carregando
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const waveVariants = {
  animate: {
    y: [0, -4, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
};

export default function LoadingButton({
  loading,
  children,
  disabled = false,
  className = "",
  type = "button",
}: LoadingButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={loading || disabled}
      whileTap={{ scale: 0.95 }}
      className={`w-full py-2 rounded-md transition ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      } ${className}`}
    >
      {loading ? (
        <div className="flex gap-1 justify-center">
          {"Carregando...".split("").map((letter, i) => (
            <motion.span
              key={i}
              variants={waveVariants}
              animate="animate"
              transition={{ delay: i * 0.1 }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}
