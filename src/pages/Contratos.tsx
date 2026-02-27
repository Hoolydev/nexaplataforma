import { useState } from "react"
import { FileText, Search, Filter, MoreHorizontal, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockContratos = [
    { id: "1", prestadora: "Ana Lima", unidade: "Jardim América", tipo: "Prestação de Serviço", inicio: "2023-08-10", vencimento: "2025-08-10", status: "Ativo" },
    { id: "2", prestadora: "Beatriz Souza", unidade: "Jardim América", tipo: "Prestação de Serviço", inicio: "2024-01-15", vencimento: "2025-03-15", status: "Vence em breve" },
    { id: "3", prestadora: "Daniela Rocha", unidade: "Águas Claras", tipo: "CLT", inicio: "2023-11-20", vencimento: "2025-11-20", status: "Ativo" },
    { id: "4", prestadora: "Fernanda Alves", unidade: "Moema", tipo: "Prestação de Serviço", inicio: "2024-03-05", vencimento: "2025-03-05", status: "Vence em breve" },
    { id: "5", prestadora: "Gisele Torres", unidade: "Garavelo", tipo: "Prestação de Serviço", inicio: "2024-06-12", vencimento: "2026-06-12", status: "Ativo" }
]

const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
}

export default function Contratos() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredContratos = mockContratos.filter(c =>
        c.prestadora.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.unidade.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const ativos = mockContratos.filter(c => c.status === "Ativo").length
    const venceBreve = mockContratos.filter(c => c.status === "Vence em breve").length
    const vencidos = mockContratos.filter(c => c.status === "Vencido").length

    return (
        <div className="font-sans pb-16 pt-6 px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-page-title">Gestão de Contratos</h1>
                    <p className="text-body-sm mt-1">Acompanhamento de prazos e renovações</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Ativos</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{ativos}</span>
                        <FileText className="w-5 h-5 text-emerald-500" />
                    </div>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm ring-1 ring-inset ring-amber-500/20">
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Vencendo em 30 dias</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{venceBreve}</span>
                        <FileText className="w-5 h-5 text-amber-500" />
                    </div>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm ring-1 ring-inset ring-red-500/20">
                    <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Vencidos</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{vencidos}</span>
                        <span className="text-sm font-medium text-slate-400">Nenhum</span>
                    </div>
                </div>
            </div>

            {/* Main Table Card */}
            <div className="bg-white border rounded-xl shadow-sm flex flex-col overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Buscar contrato..."
                            className="pl-9 bg-white border-slate-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto text-slate-600 border-slate-200 bg-white">
                        <Filter className="w-4 h-4 mr-2" /> Filtros
                    </Button>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent bg-slate-50 border-b border-slate-200">
                                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 pl-6">Prestadora</TableHead>
                                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4">Unidade / Tipo</TableHead>
                                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4">Início</TableHead>
                                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4">Vencimento</TableHead>
                                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4">Status</TableHead>
                                <TableHead className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 pr-6">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredContratos.map(contrato => (
                                <TableRow key={contrato.id} className="hover:bg-slate-50/80 transition-colors">
                                    <TableCell className="pl-6 py-4 font-semibold text-slate-900 text-sm">{contrato.prestadora}</TableCell>
                                    <TableCell className="py-4">
                                        <p className="font-medium text-slate-700 text-sm">{contrato.unidade}</p>
                                        <p className="text-xs text-slate-500 leading-tight mt-0.5">{contrato.tipo}</p>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-slate-600">{formatDate(contrato.inicio)}</TableCell>
                                    <TableCell className="py-4 text-sm font-medium text-slate-800">{formatDate(contrato.vencimento)}</TableCell>
                                    <TableCell className="py-4">
                                        {contrato.status === "Ativo" && (
                                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                                                {contrato.status}
                                            </span>
                                        )}
                                        {contrato.status === "Vence em breve" && (
                                            <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                                                {contrato.status}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="py-4 text-center pr-6">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
