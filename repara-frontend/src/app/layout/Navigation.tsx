"use client";

// import { useState } from "react";
import { IconDashboard, IconUsers, IconCar, IconService } from "./icons";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: IconDashboard },
    { id: 'clientes', label: 'Clientes', icon: IconUsers },
    { id: 'veiculos', label: 'Veículos', icon: IconCar },
    { id: 'servicos', label: 'Serviços', icon: IconService },
  ];

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex space-x-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === item.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}