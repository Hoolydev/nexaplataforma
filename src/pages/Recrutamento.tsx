import { useState } from "react"
import { Users, UserCheck, Clock, Plus, MoreHorizontal, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const candidatasMock = [
    { id: "1", nome: "Josiane Ferreira", vaga: "Jardim América", etapa: "Triagem", data: "2025-02-18" },
    { id: "2", nome: "Karina Nunes", vaga: "Moema", etapa: "Triagem", data: "2025-02-19" },
    { id: "3", nome: "Letícia Prado", vaga: "Águas Claras", etapa: "Entrevista", data: "2025-02-20" },
    { id: "4", nome: "Mariana Costa", vaga: "Jardim América", etapa: "Entrevista", data: "2025-02-21" },
    { id: "5", nome: "Natália Silva", vaga: "Jardim América", etapa: "Aprovadas", data: "2025-02-22" },
    { id: "6", nome: "Olivia Dias", vaga: "Garavelo", etapa: "Integração", data: "2025-02-15" },
    { id: "7", nome: "Paula Barros", vaga: "Setor 44", etapa: "Contratadas", data: "2025-02-10" }
]

const KANBAN_STAGES = ["Triagem", "Entrevista", "Aprovadas", "Integração", "Contratadas"]

const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
}

export default function Recrutamento() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredCandidatas = candidatasMock.filter(c =>
        c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.vaga.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const vagasAbertas = candidatasMock.filter(c => ["Triagem", "Entrevista"].includes(c.etapa)).length
    const emIntegracao = candidatasMock.filter(c => c.etapa === "Integração").length
    const contratadasMes = candidatasMock.filter(c => c.etapa === "Contratadas").length

    return (
        <div className="font-sans pb-16 pt-6 px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 h-[calc(100vh-4rem)] flex flex-col">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Recrutamento e Seleção</h1>
                    <p className="text-sm text-slate-500 mt-1">Pipeline de candidatas e gestão de vagas</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Buscar candidata ou vaga..."
                            className="pl-9 bg-white border-slate-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm shrink-0">
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Vaga
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Vagas Abertas</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{vagasAbertas}</span>
                        <Users className="w-5 h-5 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Em Integração</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{emIntegracao}</span>
                        <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Contratadas (Mês)</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{contratadasMes}</span>
                        <UserCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tempo Médio</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">12<span className="text-lg text-slate-500 font-medium ml-1">dias</span></span>
                        <Calendar className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 flex gap-5 overflow-x-auto pb-4 min-h-[400px]">
                {KANBAN_STAGES.map(stage => {
                    const stageCandidates = filteredCandidatas.filter(c => c.etapa === stage)

                    return (
                        <div key={stage} className="flex-shrink-0 w-80 bg-slate-100/50 border border-slate-200 rounded-xl flex flex-col h-full max-h-full">
                            <div className="p-4 border-b border-slate-200/60 flex items-center justify-between bg-slate-50/80 rounded-t-xl shrink-0">
                                <h3 className="font-semibold text-slate-700 text-sm">{stage}</h3>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white border shadow-sm text-xs font-bold text-slate-600">
                                    {stageCandidates.length}
                                </span>
                            </div>

                            <div className="p-3 flex-1 overflow-y-auto space-y-3">
                                {stageCandidates.map(candidata => (
                                    <div key={candidata.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-sm text-slate-900">{candidata.nome}</h4>
                                            <Button variant="ghost" size="icon" className="w-6 h-6 -mt-1 -mr-1 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <p className="text-xs font-medium text-blue-600 mb-3">{candidata.vaga}</p>
                                        <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-slate-400" />
                                                {formatDate(candidata.data)}
                                            </span>
                                            {stage === "Triagem" && <span className="text-orange-600 bg-orange-50 px-1.5 rounded">Novo</span>}
                                        </div>
                                    </div>
                                ))}

                                {stageCandidates.length === 0 && (
                                    <div className="h-24 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center">
                                        <p className="text-xs text-slate-400 font-medium">Nenhuma candidata</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 pt-0 shrink-0">
                                <Button variant="ghost" className="w-full text-sm text-slate-500 hover:text-slate-900 border border-transparent hover:border-slate-200 hover:bg-white border-dashed bg-transparent transition-all">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Adicionar
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
