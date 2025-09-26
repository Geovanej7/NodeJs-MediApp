"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PacientCreate() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  const addPacient = async (e: any) => {
    e.preventDefault();
    setError(null);

    if (name !== "" && birthDate !== "" && email !== "" && phone !== "") {
      const formData = {
        name,
        birthDate,
        email,
        phone,
      };

      if (sessionStorage.getItem("token") == null) {
        setToken("");
      }

      const add = await fetch("http://localhost:3001/postPacient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      if (!add.ok) {
        setError("Erro ao salvar paciente!");
        return;
      }

      router.push("/pacient/list");
    } else {
      setError("Preencha todos os campos!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Criar Paciente
        </h1>

        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={addPacient} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-600"
          />

          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-600"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-600"
          />

          <input
            type="tel"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-600"
          />

          <div className="flex justify-between mt-4">
            <Link
              href="/home"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Voltar
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
