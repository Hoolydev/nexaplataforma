import { FileText, Download, BarChart2, PieChart, Users, FileStack } from "lucide-react"
import { Button } from "@/components/ui/button"

const relatoriosMock = [
    { id: 1, title: "Ocupação Atual por Unidade", desc: "Snapshot completo com status de todas as 5 unidades.", icon: BarChart2, color: "text-blue-500", bg: "bg-blue-50" },
    { id: 2, title: "Evolução Mensal", desc: "Gráfico e tabela do histórico de ocupação dos últimos 6 meses.", icon: FileStack, color: "text-indigo-500", bg: "bg-indigo-50" },
    { id: 3, title: "Turnover do Período", desc: "Listagem de entradas, saídas e principais motivos de desligamento.", icon: PieChart, color: "text-amber-500", bg: "bg-amber-50" },
    { id: 4, title: "Pipeline de Recrutamento", desc: "Candidatas ativas por etapa e tempo médio de contratação atual.", icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: 5, title: "Contratos a Vencer", desc: "Lista de todos os contratos que vencem nos próximos 60 dias.", icon: FileText, color: "text-red-500", bg: "bg-red-50" },
    { id: 6, title: "Relatório Completo de Pessoas", desc: "Cadastro expandido de todas as prestadoras atualmente ativas em campo.", icon: Users, color: "text-slate-500", bg: "bg-slate-100" },
]

export default function Relatorios() {
    return (
        <div className="font-sans pb-16 pt-6 px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Relatórios Gerenciais</h1>
                    <p className="text-sm text-slate-500 mt-1">Gere arquivos em PDF ou Excel a partir dos dados da operação</p>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {relatoriosMock.map((rel) => (
                    <div key={rel.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                        <div className={`w-12 h-12 rounded-lg ${rel.bg} ${rel.color} flex items-center justify-center mb-5 shrink-0`}>
                            <rel.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{rel.title}</h3>
                        <p className="text-sm text-slate-500 flex-1 mb-6">{rel.desc}</p>
                        <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100">
                            <Button variant="outline" className="w-full text-xs font-semibold text-slate-600">
                                <Download className="w-3.5 h-3.5 mr-2" /> PDF
                            </Button>
                            <Button variant="outline" className="w-full text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100/50 border-emerald-200">
                                <Download className="w-3.5 h-3.5 mr-2" /> Excel
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
