"use client"
import React, {useEffect, useState} from "react"
import Link from "next/link"

export default function DoctorList(){
    const [doctors, setDoctors] = useState<any[]>([])
    const [error, setError] = useState(null);

    useEffect(() => {
  fetch("http://localhost:3001/Doctors", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem("token") || " "
    },
  })
    .then(response => response.json())
    .then(data => setDoctors(data))
}, [doctors]); 

const deleteDoctor = async (id:any) => {
    const add = await fetch (`http://localhost:3001/Doctor/${id}`,{
        method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem("token") || " "
    },  
    });
    const content = await add.json();
    console.log(content);
    if (content.login) {
        window.location.reload();
    } else {
        setError(content.error)
    }
}
 return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Lista de Médicos</h1>
          <Link href="/home" className="text-blue-600 hover:underline">
            Voltar
          </Link>
        </div>

        <table className="w-full border border-slate-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <td className="border border-slate-300 p-2 font-semibold text-gray-800">Nome</td>
              <td className="border border-slate-300 p-2 font-semibold text-center text-gray-800">Login</td>
              <td className="border border-slate-300 p-2 font-semibold text-center text-gray-800">Especialidade Médica</td>
              <td className="border border-slate-300 p-2 font-semibold text-center text-gray-800">Registro Médico</td>
              <td className="border border-slate-300 p-2 font-semibold text-center text-gray-800">Email</td>
              <td className="border border-slate-300 p-2 font-semibold text-center text-gray-800">Telefone</td>
              <td className="border border-slate-300 p-2 font-semibold text-center text-gray-800">Ações</td>
            </tr>
          </thead>
          <tbody className="doctors" id="doctors">
            {!!doctors && doctors.map((doctor: any) => (
              <tr key={doctor.id}>
                <td className="border border-slate-300 p-2 text-gray-800">{doctor.nome}</td>
                <td className="border border-slate-300 p-2 text-center text-gray-800">{doctor.login}</td>
                <td className="border border-slate-300 p-2 text-center text-gray-800">{doctor.medicalSpecialty}</td>
                <td className="border border-slate-300 p-2 text-center text-gray-800">{doctor.medicalRegistration}</td>
                <td className="border border-slate-300 p-2 text-center text-gray-800">{doctor.email}</td>
                <td className="border border-slate-300 p-2 text-center text-gray-800">{doctor.phone}</td>
                <td className="border border-slate-300 p-2 text-center space-x-2">
                  <button
                    onClick={() => deleteDoctor(doctor.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition cursor-pointer"
                  >
                    Deletar
                  </button>
                  <Link
                    href={`/doctor/edit/${doctor.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition cursor-pointer"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {error && (
          <div className="mt-4 p-2 text-sm text-white bg-red-500 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
