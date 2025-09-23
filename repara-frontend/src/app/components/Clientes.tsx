"use client";

import { IconMail, IconMapPin, IconPhone, IconUser } from "@/app/layout/icons";
import { useEffect, useState } from "react";

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:3001/cliente");
        const data = await response.json();
        setClientes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
        setClientes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Carregando clientes...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Clientes</h1>
        <p className="text-slate-600">Lista de todos os clientes cadastrados</p>
      </div>

      {clientes.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center">
          <IconUser className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500">Nenhum cliente encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((cliente) => (
            <div key={cliente.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <IconUser className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{cliente.nome}</h3>
                    <p className="text-sm text-slate-500">ID: {cliente.id}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {cliente.telefone && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <IconPhone className="w-4 h-4" />
                    <span>{cliente.telefone}</span>
                  </div>
                )}

                {cliente.email && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <IconMail className="w-4 h-4" />
                    <span>{cliente.email}</span>
                  </div>
                )}

                {cliente.endereco && (
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <IconMapPin className="w-4 h-4 mt-0.5" />
                    <span>{cliente.endereco}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
