"use client";

import { useEffect, useState } from "react";
import { IconPlus, IconService } from "./layout/icons";
import Navigation from "./layout/Navigation";
import Veiculos from "./components/veiculos/page";
import Servicos from "./components/serviços/page";
import OrderSidebar from "./components/OrderSidebar";
import Clientes from "./components/Clientes";
import Dashboard from "./components/home/Dashboard";

interface OrdemServico {
  id: number;
  status: string;
  observacoes?: string;
  cliente?: {
    id: number;
    nome: string;
    telefone?: string;
    email?: string;
    endereco?: string;
  };
  veiculo?: {
    id: number;
    marca: string;
    modelo: string;
    ano: number;
    placa: string;
  };
  funcionario?: {
    id: number;
    nome: string;
    cargo?: string;
  };
  itens?: Array<{
    id: number;
    descricao?: string;
    quantidade?: number;
    valorUnitario?: number;
    servico?: {
      id: number;
      nome: string;
      descricao?: string;
      preco?: number;
    };
  }>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrdemServico | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetch("http://localhost:3001/ordemServico") 
        .then((res) => res.json())
        .then((data) => {
          console.log("📦 Dados recebidos do backend:", data);
          setOrdens(Array.isArray(data) ? data : []);
        })
        .catch((err) => console.error("Erro ao carregar OS:", err));
    }
  }, [activeTab]);

  const handleOrderClick = (order: OrdemServico) => {
    setSelectedOrder(order);
    setSidebarOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <Dashboard />
            
            {/* Lista de Ordens de Serviço */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Ordens de Serviço Recentes</h2>
              {ordens.length === 0 ? (
                <p className="text-slate-500">Nenhuma OS encontrada.</p>
              ) : (
                <div className="space-y-4">
                  {ordens.map((os) => (
                    <div 
                      key={os.id} 
                      className="rounded-2xl border bg-white p-7 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleOrderClick(os)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-indigo-800 hover:underline">
                            OR-{String(os.id).padStart(3, '0')}
                          </span>
                          <span className={`rounded-full px-3 py-1.5 text-sm font-semibold text-white ${
                            os.status === 'aberta' ? 'bg-yellow-500' :
                            os.status === 'em_andamento' ? 'bg-blue-500' :
                            os.status === 'concluida' ? 'bg-green-500' :
                            'bg-red-500'
                          }`}>
                            {os.status?.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="text-right text-slate-500">
                          <div className="text-sm">ID</div>
                          <div className="font-semibold text-slate-800">{os.id}</div>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="text-slate-700">
                          <div className="flex items-center gap-2 mb-2">
                            <IconService /> 
                            <span className="font-medium">Observações:</span>
                          </div>
                          <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                            {os.observacoes || "Nenhuma observação registrada"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'clientes':
        return <Clientes />;
      case 'veiculos':
        return <Veiculos />;
      case 'servicos':
        return <Servicos />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navegação */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Conteúdo */}
      <div className="mx-auto max-w-6xl px-8 pt-6 pb-12">
        {renderContent()}
      </div>

      {/* Menu Lateral para Ordens de Serviço */}
      <OrderSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        order={selectedOrder}
      />
    </main>
  );
}
