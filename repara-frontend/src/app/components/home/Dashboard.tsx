"use client";

import { IconCalendar, IconCar, IconService, IconUser } from "@/app/layout/icons";
import { useEffect, useState } from "react";
import { IconPlus } from "@/app/layout/icons";
import NovaOrdemServicoModal from "../ordem-servico/NovaOrdemServicoModal";

interface DashboardStats {
  totalOrdens: number;
  ordensAbertas: number;
  ordensEmAndamento: number;
  ordensConcluidas: number;
  totalClientes: number;
  totalVeiculos: number;
  totalServicos: number;
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalOrdens: 0,
    ordensAbertas: 0,
    ordensEmAndamento: 0,
    ordensConcluidas: 0,
    totalClientes: 0,
    totalVeiculos: 0,
    totalServicos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Buscar dados de ordens de serviço
        const ordensResponse = await fetch("http://localhost:3001/ordemServico");
        const ordens = await ordensResponse.json();
        
        // Buscar dados de clientes
        const clientesResponse = await fetch("http://localhost:3001/cliente");
        const clientes = await clientesResponse.json();
        
        // Buscar dados de veículos
        const veiculosResponse = await fetch("http://localhost:3001/veiculos");
        const veiculos = await veiculosResponse.json();
        
        // Buscar dados de serviços
        const servicosResponse = await fetch("http://localhost:3001/servicos");
        const servicos = await servicosResponse.json();

        // Calcular estatísticas das ordens
        const ordensAbertas = ordens.filter((o: any) => o.status === 'aberta').length;
        const ordensEmAndamento = ordens.filter((o: any) => o.status === 'em_andamento').length;
        const ordensConcluidas = ordens.filter((o: any) => o.status === 'concluida').length;

        setStats({
          totalOrdens: ordens.length,
          ordensAbertas,
          ordensEmAndamento,
          ordensConcluidas,
          totalClientes: Array.isArray(clientes) ? clientes.length : 0,
          totalVeiculos: Array.isArray(veiculos) ? veiculos.length : 0,
          totalServicos: Array.isArray(servicos) ? servicos.length : 0,
        });
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Carregando dashboard...</div>
      </div>
    );
  }

  return (
      <div className="space-y-6">
        
        {/* Este é o bloco que mudou */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Visão geral do sistema</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-full cursor-pointer bg-[#0e0064] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-800"
          >
            <IconPlus /> Criar OS
          </button>
        </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Ordens de Serviço */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total de Ordens</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalOrdens}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <IconCalendar className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

<NovaOrdemServicoModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSave={() => {
    // reatualizar os stats
  }}
/>

        {/* Ordens Abertas */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Ordens Abertas</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.ordensAbertas}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <IconCalendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Ordens em Andamento */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Em Andamento</p>
              <p className="text-2xl font-bold text-blue-600">{stats.ordensEmAndamento}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <IconCalendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Ordens Concluídas */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Concluídas</p>
              <p className="text-2xl font-bold text-green-600">{stats.ordensConcluidas}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <IconCalendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Entidades */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Clientes */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total de Clientes</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalClientes}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <IconUser className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Veículos */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total de Veículos</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalVeiculos}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <IconCar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Serviços */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total de Serviços</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalServicos}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <IconService className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

