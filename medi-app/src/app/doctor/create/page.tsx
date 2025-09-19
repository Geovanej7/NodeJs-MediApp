"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DoctorCreate() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [medicalSpecialty, setMedicalSpecialty] = useState<string>("");
  const [medicalRegistration, setMedicalRegistration] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  const addDoctor = async (e: any) => {
    e.preventDefault();
    setError(null);

    if (
      name !== "" &&
      login !== "" &&
      password !== "" &&
      medicalSpecialty !== "" &&
      medicalRegistration !== "" &&
      email !== "" &&
      phone !== ""
    ) {
      const formData = {
        name: name,
        login: login,
        password: password,
        medicalSpecialty: medicalSpecialty,
        medicalRegistration: medicalRegistration,
        email: email,
        phone: phone
      };

      console.log(sessionStorage.getItem("token"));
      if (sessionStorage.getItem("token") == null) {
        setToken("");
      }

      const add = await fetch("http:localhost:3001/postDoctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const content = await add.json();

      if (content.login) {
        router.push("/home");
      } else {
        setError(content.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Cadastro de Médico</h1>
        <form onSubmit={addDoctor} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
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
            placeholder="Telefone"
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Cadastrar
          </button>
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
