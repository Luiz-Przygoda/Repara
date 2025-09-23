"use client";

import { useEffect, useState } from "react";
import { IconCar, IconUser } from "./icons";

interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cliente?: {
    id: number;
    nome: string;
  };
}

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const response = await fetch("http://localhost:3001/veiculos");
        const data = await response.json();
        console.log(data);
        setVeiculos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao carregar veículos:", error);
        setVeiculos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVeiculos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Carregando veículos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Veículos</h1>
        <p className="text-slate-600">Lista de todos os veículos cadastrados</p>
      </div>

      {veiculos.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center">
          <IconCar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500">Nenhum veículo encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {veiculos.map((veiculo) => (
            <div key={veiculo.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconCar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {veiculo.marca} {veiculo.modelo}
                    </h3>
                    <p className="text-sm text-slate-500">ID: {veiculo.id}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Ano:</span>
                  <span className="text-sm text-slate-900">{veiculo.ano}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Placa:</span>
                  <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                    {veiculo.placa}
                  </span>
                </div>

                {veiculo.cliente && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <IconUser className="w-4 h-4" />
                    <span>Cliente: {veiculo.cliente.nome}</span>
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
