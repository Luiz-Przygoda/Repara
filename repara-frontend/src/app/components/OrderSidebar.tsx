"use client";

import { IconX, IconService, IconFileText, IconUser, IconCar } from "../layout/icons";

interface Cliente {
  nome: string;
  telefone: string;
  email: string;
}

interface Veiculo {
  modelo: string;
  placa: string;
}

interface Funcionario {
  nome: string;
  cargo: string;
}

interface Servico {
  nome: string;
  quantidade: number;
  valor: number;
}

interface Order {
  id: number;
  status: string;
  observacoes?: string;
  cliente?: Cliente;
  veiculo?: Veiculo;
  funcionario?: Funcionario;
  servicos?: Servico[];
}

interface OrderSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function OrderSidebar({ isOpen, onClose, order }: OrderSidebarProps) {
  if (!order) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-white/30 backdrop-blur-sm z-[9998]"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-[9999] transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              OR-{String(order.id).padStart(3, '0')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <IconX />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Status */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                order.status === 'aberta' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'em_andamento' ? 'bg-blue-100 text-blue-800' :
                order.status === 'concluida' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.status?.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {/* Cliente */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <IconUser />
                Cliente
              </div>
              <div className="pl-6 space-y-1">
                <p className="font-semibold text-slate-900">{order.cliente?.nome || "-"}</p>
                <p className="text-sm text-slate-600">Tel: {order.cliente?.telefone || "-"}</p>
                <p className="text-sm text-slate-600">Email: {order.cliente?.email || "-"}</p>
              </div>
            </div>

            {/* Veículo */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <IconCar />
                Veículo
              </div>
              <div className="pl-6 space-y-1">
                <p className="font-semibold text-slate-900">
                  {order.veiculo?.modelo || "-"}
                </p>
                <p className="text-sm text-slate-600">Placa: {order.veiculo?.placa || "-"}</p>
              </div>
            </div>

            {/* Funcionário */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <IconUser />
                Funcionário Responsável
              </div>
              <div className="pl-6 space-y-1">
                <p className="font-semibold text-slate-900">{order.funcionario?.nome || "-"}</p>
                <p className="text-sm text-slate-600">{order.funcionario?.cargo || "-"}</p>
              </div>
            </div>

            {/* Serviços */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <IconService />
                Serviços
              </div>
              <div className="pl-6 space-y-2">
                {order.servicos && order.servicos.length > 0 ? (
                  order.servicos.map((servico, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-lg">
                      <p className="font-medium text-slate-900">
                        {servico.nome}
                      </p>
                      <p className="text-sm text-slate-600">Quantidade: {servico.quantidade}</p>
                      <p className="text-sm text-slate-600">
                        Valor: R$ {servico.valor.toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-600">Nenhum serviço registrado</p>
                )}
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <IconFileText />
                Observações
              </div>
              <div className="pl-6">
                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">
                  {order.observacoes || "Nenhuma observação registrada"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
