"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion, easeInOut } from "framer-motion";

// 🔥 animação em onda para o texto "Carregando..."
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

export default function DoctorCreate() {
  const router = useRouter();

  const [nome, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [medicalSpecialty, setMedicalSpecialty] = useState<string>("");
  const [medicalRegistration, setMedicalRegistration] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // formata telefone (81 98887-7878)
  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 11) {
      return `${digits.slice(0, 2)} ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    return value;
  }

  const addDoctor = async (e: any) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // ativa "Carregando..."

    try {
      if (
        nome !== "" &&
        login !== "" &&
        password !== "" &&
        medicalSpecialty !== "" &&
        medicalRegistration !== "" &&
        email !== "" &&
        phone !== ""
      ) {
        const formData = {
          nome: nome,
          login: login,
          password: password,
          medicalSpecialty: medicalSpecialty,
          medicalRegistration: medicalRegistration,
          email: email,
          phone: formatPhone(phone),
        };

        const token = sessionStorage.getItem("token") || "";

        const add = await fetch("http://localhost:3001/postDoctor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(formData),
        });

        const content = await add.json();
        
        if (content.login) {
          toast.success("Doutor criado com sucesso");
          router.push("/home");
        } else {
          toast.error("Erro ao cadastrar médico");
          setError(content.error || "Erro ao cadastrar médico");
        }
      } else {
        toast.error("Preencha todos os campos.");
        setError("Preencha todos os campos.");
      }
    } catch (err) {
      toast.error("Erro na comunicação com o servidor.");
      setError("Erro na comunicação com o servidor.");
    } finally {
      setLoading(false); // 👈 desliga "Carregando..."
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">
          Cadastro de Médico
        </h1>
        <form onSubmit={addDoctor} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md placeholder-gray-600 text-gray-800
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full p-2 border rounded-md placeholder-gray-600 text-gray-800
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md placeholder-gray-600 text-gray-800
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Especialidade Médica"
            value={medicalSpecialty}
            onChange={(e) => setMedicalSpecialty(e.target.value)}
            className="w-full p-2 border rounded-md placeholder-gray-600 text-gray-800
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Registro Médico"
            value={medicalRegistration}
            onChange={(e) => setMedicalRegistration(e.target.value)}
            className="w-full p-2 border rounded-md placeholder-gray-600 text-gray-800
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md placeholder-gray-600 text-gray-800
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Telefone (99 91234-5678)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md placeholder-gray-600 text-gray-800
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {error && (
            <div className="p-2 text-sm text-white bg-red-500 rounded-md">
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-2 rounded-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
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
              "Cadastrar"
            )}
          </motion.button>
        </form>

        <div className="mt-4 text-sm text-gray-600 text-center">
          Já tem conta?{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Fazer login
          </Link>
        </div>
      </div>
    </div>
  );
}
