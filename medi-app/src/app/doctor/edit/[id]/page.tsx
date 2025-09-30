"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function DoctorEdit() {
  const router = useRouter();
  const params = useParams(); // pega os params
  const id = params?.id;      // id do médico

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [medicalSpecialty, setMedicalSpecialty] = useState("");
  const [medicalRegistration, setMedicalRegistration] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Carrega os dados do médico
  useEffect(() => {
    if (!id) return; // evita fetch com id undefined

    fetch(`http://localhost:3001/getDoctor/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || " ",
      },
    })
      .then((res) => res.json())
      .then((doctor) => {
        console.log("Resposta da API:", doctor);
        setNome(doctor.nome || "");
        setLogin(doctor.login || "");
        setMedicalSpecialty(doctor.medicalSpecialty || "");
        setMedicalRegistration(doctor.medicalRegistration || "");
        setEmail(doctor.email || "");
        setPhone(doctor.phone || "");
      })
      .catch(() => setError("Erro ao carregar dados do médico."));
  }, [id]);

  // Atualiza os dados do médico
  const updateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!id) return;

    try {
      const res = await fetch(`http://localhost:3001/Doctor/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || " ",
        },
        body: JSON.stringify({
          nome,
          login,
          password,
          medicalSpecialty,
          medicalRegistration,
          email,
          phone,
        }),
      });

      if (!res.ok) {
        setError("Erro ao atualizar médico.");
        toast.error("Erro ao atualizar médico");
        return;
      }

      toast.success("Doutor atualizado com sucesso");
      router.push("/doctor/list");
    } catch (err) {
      toast.error("Erro inesperado no servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Editar Médico
        </h1>

        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={updateDoctor} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full p-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Senha (preencha se quiser alterar)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Especialidade Médica"
            value={medicalSpecialty}
            onChange={(e) => setMedicalSpecialty(e.target.value)}
            className="w-full p-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Registro Médico"
            value={medicalRegistration}
            onChange={(e) => setMedicalRegistration(e.target.value)}
            className="w-full p-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="tel"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => router.push("/doctor/list")}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
