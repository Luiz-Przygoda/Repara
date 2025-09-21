"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconUser, IconCar, IconService, IconCalendar } from "./icons";

const navigation = [
  { name: 'Dashboard', href: '/', icon: IconCalendar },
  { name: 'Clientes', href: '/clientes', icon: IconUser },
  { name: 'Veículos', href: '/veiculos', icon: IconCar },
  { name: 'Serviços', href: '/servicos', icon: IconService },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex space-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? 'border-[#0e0064] text-[#0e0064]'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}