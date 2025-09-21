"use client";

import { useEffect, useState } from 'react';
import { api } from "../services/api";
import { IconUser, IconPlus } from "../components/icons";

interface Cliente {
  id: number;
  nome: string;
  telefone?: string;
  email?: string;
  endereco?: string;
}

interface Cliente {
  id: number;
  nome: string;
  telefone?: string;
  email?: string;
  endereco?: string;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: ''
  });

  // Carregar clientes
  const carregarClientes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/cliente");
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: ''
  });

  // Carregar clientes
  const carregarClientes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/cliente");
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  // Salvar cliente (criar ou editar)
  const salvarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCliente) {
        await api.put(`/cliente/${editingCliente.id}`, formData);
      } else {
        await api.post('/cliente', formData);
      }
      
      // Recarregar lista e fechar formulário
      await carregarClientes();
      setShowForm(false);
      setEditingCliente(null);
      setFormData({ nome: '', telefone: '', email: '', endereco: '' });
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  // Excluir cliente
  const excluirCliente = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await api.delete(`/cliente/${id}`);
        await carregarClientes();
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      }
    }
  };

  // Editar cliente
  const editarCliente = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setFormData({
      nome: cliente.nome,
      telefone: cliente.telefone || '',
      email: cliente.email || '',
      endereco: cliente.endereco || ''
    });
    setShowForm(true);
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setShowForm(false);
    setEditingCliente(null);
    setFormData({ nome: '', telefone: '', email: '', endereco: '' });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-lg text-slate-600">Carregando clientes...</div>
          </div>
        </div>
      </main>
    );
  }

  // Salvar cliente (criar ou editar)
  const salvarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCliente) {
        await api.put(`/cliente/${editingCliente.id}`, formData);
      } else {
        await api.post('/cliente', formData);
      }
      
      // Recarregar lista e fechar formulário
      await carregarClientes();
      setShowForm(false);
      setEditingCliente(null);
      setFormData({ nome: '', telefone: '', email: '', endereco: '' });
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  // Excluir cliente
  const excluirCliente = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await api.delete(`/cliente/${id}`);
        await carregarClientes();
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      }
    }
  };

  // Editar cliente
  const editarCliente = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setFormData({
      nome: cliente.nome,
      telefone: cliente.telefone || '',
      email: cliente.email || '',
      endereco: cliente.endereco || ''
    });
    setShowForm(true);
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setShowForm(false);
    setEditingCliente(null);
    setFormData({ nome: '', telefone: '', email: '', endereco: '' });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-lg text-slate-600">Carregando clientes...</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="pt-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between border-b px-6 pb-5">
          <h1 className="text-2xl font-bold text-slate-900">
            Clientes ({clientes.length})
          </h1>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-full cursor-pointer bg-[#0e0064] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-800"
          >
            <IconPlus /> Novo Cliente
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Formulário */}
        {showForm && (
          <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              {editingCliente ? 'Editar Cliente' : 'Novo Cliente'}
            </h2>
            <form onSubmit={salvarCliente} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Endereço
                  </label>
                  <input
                    type="text"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="rounded-lg bg-[#0e0064] px-4 py-2 text-white font-medium hover:bg-indigo-800"
                >
                  {editingCliente ? 'Atualizar' : 'Salvar'}
                </button>
                <button
                  type="button"
                  onClick={cancelarEdicao}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 font-medium hover:bg-slate-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de clientes */}
        {clientes.length === 0 ? (
          <div className="rounded-2xl border bg-white p-12 shadow-sm text-center">
            <IconUser className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Nenhum cliente cadastrado
            </h3>
            <p className="text-slate-500 mb-4">
              Comece cadastrando seu primeiro cliente
            </p>
            <button 
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0e0064] px-4 py-2 text-white font-medium hover:bg-indigo-800"
            >
              <IconPlus className="h-4 w-4" /> Cadastrar Cliente
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {clientes.map((cliente) => (
              <div key={cliente.id} className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <IconUser className="h-5 w-5 text-slate-500" />
                    <div>
                      <h3 className="font-semibold text-slate-900">{cliente.nome}</h3>
                      <div className="mt-1 space-y-1 text-sm text-slate-600">
                        {cliente.telefone && (
                          <div>📞 {cliente.telefone}</div>
                        )}
                        {cliente.email && (
                          <div>✉️ {cliente.email}</div>
                        )}
                        {cliente.endereco && (
                          <div>📍 {cliente.endereco}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editarCliente(cliente)}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluirCliente(cliente.id)}
                      className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                      Excluir
                    </button>
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