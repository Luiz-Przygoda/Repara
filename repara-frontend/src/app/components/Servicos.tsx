"use client";

import { useEffect, useState } from "react";
import { IconService } from "./icons";

interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
}

export default function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await fetch("http://localhost:3001/servicos");
        const data = await response.json();
        setServicos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
        setServicos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServicos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Carregando serviços...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Serviços</h1>
        <p className="text-slate-600">Lista de todos os serviços disponíveis</p>
      </div>

      {servicos.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 text-center">
          <IconService className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500">Nenhum serviço encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map((servico) => (
            <div key={servico.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <IconService className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{servico.nome}</h3>
                    <p className="text-sm text-slate-500">ID: {servico.id}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {servico.descricao && (
                  <div>
                    <span className="text-sm font-medium text-slate-600">Descrição:</span>
                    <p className="text-sm text-slate-700 mt-1">{servico.descricao}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Preço:</span>
                  <span className="text-lg font-bold text-green-600">
                    R$ {servico.preco?.toFixed(2) || '0,00'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
