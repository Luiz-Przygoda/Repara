"use client";

import { useEffect, useState } from "react";
import { IconCalendar, IconCar, IconPlus, IconService, IconUser } from "./components/icons";

interface OrdemServico {
  id: number;
  status: string;
  cliente: { nome: string };
  veiculo: { marca: string; modelo: string; ano: number; placa: string };
  funcionario?: { nome: string };
  dataAbertura: string;
  observacoes?: string;
  itens: { descricao?: string; servico?: { nome: string } }[];
}

export default function Home() {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/ordemServico") 
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Dados recebidos do backend:", data);
        setOrdens(data);
      })
      .catch((err) => console.error("Erro ao carregar OS:", err));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Topo */}
      <div className="pt-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between border-b px-6 pb-5">
          <h1 className="text-2xl font-bold text-slate-900">Ordens de Serviço</h1>
          <button className="flex items-center gap-2 rounded-full cursor-pointer bg-[#0e0064] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-800">
            <IconPlus /> Nova OS
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="mx-auto max-w-6xl px-8 pt-6 pb-12">
        {ordens.length === 0 ? (
          <p className="text-slate-500">Nenhuma OS encontrada.</p>
        ) : (
          <div className="space-y-6">
            {ordens.map((os) => (
              <div key={os.id} className="rounded-2xl border bg-white p-7 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <a href="#" className="font-semibold text-indigo-800 hover:underline">
                      OS-{os.id}
                    </a>
                    <span className="rounded-full bg-yellow-500 px-3 py-1.5 text-sm font-semibold text-white">
                      {os.status}
                    </span>
                  </div>
                  <div className="text-right text-slate-500">
                    <div className="text-sm">Placa</div>
                    <div className="font-semibold text-slate-800">{os.veiculo?.placa}</div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-base">
                  {/* Coluna esquerda */}
                  <div className="flex flex-col gap-3 text-slate-700">
                    <div className="flex items-center gap-2">
                      <IconUser /> {os.cliente?.nome}
                    </div>
                    <div className="flex items-center gap-2">
                      <IconCar /> {os.veiculo?.marca} {os.veiculo?.modelo} {os.veiculo?.ano}
                    </div>
                  </div>

                  {/* Coluna direita */}
                  <div className="flex flex-col gap-3 text-slate-700">
                    <div className="flex items-center gap-2">
                      <IconService /> {os.itens[0]?.servico?.nome || os.itens[0]?.descricao || "—"}
                    </div>
                    <div className="flex items-center gap-2">
                      <IconCalendar /> {new Date(os.dataAbertura).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
