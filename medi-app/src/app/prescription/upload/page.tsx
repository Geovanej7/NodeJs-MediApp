"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function PrescriptionUpload() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>(""); // Agora é string, sem unknown

  // Buscar prescrições ao carregar a tela
  useEffect(() => {
    fetch("http://localhost:3001/prescription", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || " ",
      },
    })
      .then((res) => res.json())
      .then((data) => setPrescriptions(data))
      .catch(() => setError("Erro ao carregar prescrições"));
  }, []);

  // Upload do arquivo para uma prescrição específica
  const uploadPrescription = async (id: any) => {
    if (!file) {
      setError("Selecione um arquivo antes de enviar");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`http://localhost:3001/uploadPrescription/${id}`, {
        method: "POST",
        headers: {
          Authorization: sessionStorage.getItem("token") || " ",
        },
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      // Atualizar lista após upload
      const updated = await fetch("http://localhost:3001/prescription", {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || " ",
        },
      }).then((res) => res.json());
      setPrescriptions(updated);
      setFile(null); // Limpar arquivo selecionado
      setError("");  // Limpar erro
    } catch (err: any) {
      setError(err.message || "Erro ao enviar arquivo");
    }
  };

  // Exibir/baixar arquivo
  const showFile = async (id: any) => {
    try {
      const res = await fetch(`http://localhost:3001/readPrescription/${id}`, {
        method: "GET",
        headers: {
          Authorization: sessionStorage.getItem("token") || "",
        },
      });

      if (!res.ok) throw new Error(await res.text());

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${id}.pdf`; // Nome do arquivo
      link.click();
    } catch (err: any) {
      setError(err.message || "Erro ao abrir arquivo");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">
            Upload de Prescrições
          </h1>
          <Link href="/home" className="text-blue-600 hover:underline">
            Voltar
          </Link>
        </div>

        <table className="w-full border border-slate-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <td className="border border-slate-300 p-2 font-semibold text-gray-800 text-center">
                Data
              </td>
              <td className="border border-slate-300 p-2 font-semibold text-gray-800 text-center">
                Medicamento
              </td>
              <td className="border border-slate-300 p-2 font-semibold text-gray-800 text-center">
                Dosagem
              </td>
              <td className="border border-slate-300 p-2 font-semibold text-gray-800 text-center">
                Instruções
              </td>
              <td className="border border-slate-300 p-2 font-semibold text-gray-800 text-center">
                Arquivo
              </td>
              <td className="border border-slate-300 p-2 font-semibold text-gray-800 text-center">
                Ações
              </td>
            </tr>
          </thead>
          <tbody>
            {prescriptions.length > 0 ? (
              prescriptions.map((p: any) => (
                <tr key={p.id}>
                  <td className="border border-slate-300 p-2 text-center text-gray-800">
                    {p.date}
                  </td>
                  <td className="border border-slate-300 p-2 text-center text-gray-800">
                    {p.medicine}
                  </td>
                  <td className="border border-slate-300 p-2 text-center text-gray-800">
                    {p.dosage}
                  </td>
                  <td className="border border-slate-300 p-2 text-center text-gray-800">
                    {p.instructions}
                  </td>
                  <td className="border border-slate-300 p-2 text-center text-gray-800">
                    {p.fileName ? (
                      <button
                        onClick={() => showFile(p.id)}
                        className="text-blue-600 underline cursor-pointer"
                      >
                        {p.fileName}
                      </button>
                    ) : (
                      <span className="text-gray-500">Sem arquivo</span>
                    )}
                  </td>
                  <td className="border border-slate-300 p-2 text-center">
                    <input
                      type="file"
                      className="text-sm text-gray-700 mb-2"
                      onChange={(e) =>
                        setFile(e.target.files ? e.target.files[0] : null)
                      }
                    />
                    <button
                      onClick={() => uploadPrescription(p.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition cursor-pointer"
                    >
                      Upload
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-600">
                  Nenhuma prescrição encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {error && (
          <div className="mt-4 p-2 text-sm text-white bg-red-500 rounded-md">
            {error} {/* Agora sempre string, sem erro TS */}
          </div>
        )}
      </div>
    </div>
  );
}
