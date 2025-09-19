"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState<string>(''); //hook = gancho
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>('');

  const authentication = async (e: any) => {
    e.preventDefault();
    setError(null);

    if (login != "" && password != "") {

      const formData = {
        login: login,
        password: password
      }

      const add = await fetch('http:localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const content = await add.json();
      if (content.token) {
        sessionStorage.setItem("token", content.token);
        router.push('/home');
      } else {
        setError(content.error);
      }
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>

        <form className="space-y-4" onSubmit={authentication}>
          <div>
            <label htmlFor="login" className="block text-sm font-medium text-gray-700">
              Usuário
            </label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 text-gray-700"
              placeholder="Digite seu usuário"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 text-gray-700"
              placeholder="Digite sua senha"
            />
          </div>

          {error && (
            <div className="p-2 text-sm text-white bg-red-500 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
