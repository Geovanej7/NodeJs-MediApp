"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, easeInOut } from "framer-motion";
import { useRouter } from "next/navigation";

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

export default function Home() {
  const router = useRouter();
  const [loadingBtn, setLoadingBtn] = useState<string | null>(null);

  const handleClick = (path: string) => {
    setLoadingBtn(path);
    setTimeout(() => {
      router.push(path);
    }, 1000); // simula delay de carregamento
  };

  const renderButton = (label: string, path: string) => (
    <motion.button
      whileTap={{ scale: 0.95 }}
      disabled={loadingBtn === path}
      onClick={() => handleClick(path)}
      className={`w-full py-2 rounded-md transition ${
        loadingBtn === path
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {loadingBtn === path ? (
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
        label
      )}
    </motion.button>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Menu Principal
        </h1>

        <nav className="space-y-3">
          {renderButton("Cadastrar Doutor", "/doctor/create")}
          {renderButton("Listar Doutores", "/doctor/list")}
          {renderButton("Cadastrar Paciente", "/pacient/create")}
          {renderButton("Criar Consulta", "/appointment/create")}
          {renderButton("Criar Prescrição", "/prescription/create")}
          {renderButton("Upload de Prescrição", "/prescription/upload")}
        </nav>
      </div>
    </div>
  );
}
