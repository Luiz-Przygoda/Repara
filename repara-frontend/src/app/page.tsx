import { IconCalendar, IconCar, IconPlus, IconService, IconUser } from "./components/icons";

// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Topo */}
      <div className="pt-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between border-b px-6 pb-5">
          <h1 className="text-2xl font-bold text-slate-900">
            Ordens de Serviço
          </h1>
          <button className="flex items-center gap-2 rounded-full cursor-pointer bg-[#0e0064] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-800">
            <IconPlus /> Nova OS
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="mx-auto max-w-6xl px-8 pt-6 pb-12">
        {/* Busca + filtros */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Buscar por cliente, veículo, serviço, placa..."
            className="w-full rounded-full border border-slate-300 bg-white px-6 py-3 text-base shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 md:max-w-3xl"
          />
          <div className="flex gap-3">
            <span className="cursor-pointer inline-flex items-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium text-slate-700">
              3 Abertas
            </span>
            <span className="cursor-pointer inline-flex items-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium text-slate-700">
              1 Em Andamento
            </span>
            <span className="cursor-pointer inline-flex items-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium text-slate-700">
              1 Concluída
            </span>
          </div>
        </div>

        {/* Cards de exemplo */}
        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-7 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <a href="#" className="font-semibold text-indigo-800 hover:underline">
                  OS-001
                </a>
                <span className="rounded-full bg-yellow-500 px-3 py-1.5 text-sm font-semibold text-white">
                  Em Andamento
                </span>
              </div>
              <div className="text-right text-slate-500">
                <div className="text-sm">Placa</div>
                <div className="font-semibold text-slate-800">ABC-1234</div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-base">
              {/* Coluna esquerda */}
              <div className="flex flex-col gap-3 text-slate-700">
                <div className="flex items-center gap-2">
                  <IconUser /> João Silva
                </div>
                <div className="flex items-center gap-2">
                  <IconCar /> Honda Civic 2020
                </div>
              </div>

              {/* Coluna direita */}
              <div className="flex flex-col gap-3 text-slate-700">
                <div className="flex items-center gap-2">
                  <IconService /> Troca de Óleo
                </div>
                <div className="flex items-center gap-2">
                  <IconCalendar /> 15/01/2024
                </div>
              </div>
            </div>
          </div>
          {/* ...repete para OS-002, OS-003 */}
        </div>
      </div>
    </main>
  );
}
