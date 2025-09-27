// src/app/components/ordemServico/NovaOrdemServicoModal.tsx
"use client";

import { useEffect, useState } from "react";
import { IconX } from "@/app/layout/icons";
import { api } from "@/app/services/api";

// Interfaces para os dados que vamos buscar
interface Cliente {
  id: number;
  nome: string;
}
interface Veiculo {
  id: number;
  modelo: string;
  placa: string;
}
interface Funcionario {
  id: number;
  nome: string;
}
interface Servico {
  id: number;
  descricao: string;
}

interface NovaOrdemServicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void; // Função para recarregar a lista de ordens após salvar
}

export default function NovaOrdemServicoModal({ isOpen, onClose, onSave }: NovaOrdemServicoModalProps) {
  // Estado para os dados dos selects
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);

  // Estado para o formulário
  const [formData, setFormData] = useState({
    clienteId: '',
    veiculoId: '',
    funcionarioId: '',
    servicoIds: [] as string[],
    observacoes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Efeito para buscar os dados necessários quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [clienteRes, veiculoRes, funcionarioRes, servicoRes] = await Promise.all([
            api.get('/cliente'),
            api.get('/veiculos'),
            api.get('/funcionario'),
            api.get('/servicos')
          ]);
          setClientes(clienteRes.data);
          setVeiculos(veiculoRes.data);
          setFuncionarios(funcionarioRes.data);
          setServicos(servicoRes.data);
        } catch (err) {
          setError("Falha ao carregar dados. Verifique a API.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post('/ordemServico', {
        ...formData,
        status: 'aberta',
        dataEntrada: new Date().toISOString()
      });
      onSave();
      onClose();
    } catch (err) {
      setError("Erro ao criar Ordem de Serviço.");
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        onClick={onClose}
      />

      {/* Conteúdo centralizado */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999]">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
              <h2 className="text-xl font-semibold text-slate-900">
                Criar Nova Ordem de Serviço
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <IconX />
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
              {loading ? (
                <div>Carregando...</div>
              ) : (
                <>
                  {/* Cliente */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Cliente *</label>
                    <select
                      required
                      value={formData.clienteId}
                      onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="">Selecione um cliente</option>
                      {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                  </div>

                  {/* Veículo */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Veículo *</label>
                    <select
                      required
                      value={formData.veiculoId}
                      onChange={(e) => setFormData({ ...formData, veiculoId: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="">Selecione um veículo</option>
                      {veiculos.map(v => <option key={v.id} value={v.id}>{v.modelo} - {v.placa}</option>)}
                    </select>
                  </div>

                  {/* Funcionário Responsável */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Funcionário Responsável *</label>
                    <select
                      required
                      value={formData.funcionarioId}
                      onChange={(e) => setFormData({ ...formData, funcionarioId: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="">Selecione um funcionário</option>
                      {funcionarios.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                    </select>
                  </div>
                  
                  {/* Serviços */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Serviços *</label>
                    <select
                      required
                      multiple
                      value={formData.servicoIds}
                      onChange={(e) => {
                        const selectedIds = Array.from(e.target.selectedOptions, option => option.value);
                        setFormData({ ...formData, servicoIds: selectedIds });
                      }}
                      className="w-full h-32 rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                    >
                      {servicos.map(s => <option key={s.id} value={s.id}>{s.descricao}</option>)}
                    </select>
                  </div>

                  {/* Observações */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Observações</label>
                    <textarea
                      value={formData.observacoes}
                      onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                      rows={4}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                      placeholder="Detalhes sobre o serviço, peças necessárias, etc."
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}
                </>
              )}

              {/* Ações */}
              <div className="pt-4 border-t border-slate-200 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-[#0e0064] px-4 py-2 text-white font-medium hover:bg-indigo-800 disabled:bg-slate-400"
                >
                  Salvar Ordem de Serviço
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 font-medium hover:bg-slate-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
