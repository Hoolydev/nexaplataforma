import { useState, useMemo, useEffect } from "react"
import {
    Building2, MapPin, Users, Edit, CheckCircle2, AlertTriangle, AlertCircle, ArrowUpRight, ArrowDownRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
    Line, Area, AreaChart,
    PieChart, Pie, Cell
} from "recharts"
import { supabase } from "@/lib/supabase"

interface Unit {
    id: string
    nome: string
    cidade: string
    prestadoras: number
    iniciantes: number
    minimo: number | null
    capacidade: number
}

// mock deleted
// Mock Data from Prompt
const historico_ocupacao = [
    { mes: "Set/24", "Jardim América": 12, "Águas Claras": 14, "Moema": 6, "Garavelo": 2, "Setor 44": 3 },
    { mes: "Out/24", "Jardim América": 13, "Águas Claras": 14, "Moema": 6, "Garavelo": 3, "Setor 44": 3 },
    { mes: "Nov/24", "Jardim América": 14, "Águas Claras": 15, "Moema": 7, "Garavelo": 3, "Setor 44": 4 },
    { mes: "Dez/24", "Jardim América": 13, "Águas Claras": 16, "Moema": 7, "Garavelo": 4, "Setor 44": 4 },
    { mes: "Jan/25", "Jardim América": 15, "Águas Claras": 16, "Moema": 8, "Garavelo": 4, "Setor 44": 4 },
    { mes: "Fev/25", "Jardim América": 16, "Águas Claras": 17, "Moema": 8, "Garavelo": 4, "Setor 44": 4 }
];

const tendencia_geral = [
    { mes: "Set/24", total: 37, minimo_agregado: 45 },
    { mes: "Out/24", total: 39, minimo_agregado: 45 },
    { mes: "Nov/24", total: 43, minimo_agregado: 45 },
    { mes: "Dez/24", total: 44, minimo_agregado: 45 },
    { mes: "Jan/25", total: 47, minimo_agregado: 45 },
    { mes: "Fev/25", total: 49, minimo_agregado: 45 }
];

const motivos_saida = [
    { motivo: "Desligamento voluntário", valor: 42, color: "#EF4444" },
    { motivo: "Desempenho", valor: 28, color: "#F97316" },
    { motivo: "Fim de contrato", valor: 18, color: "#F59E0B" },
    { motivo: "Outros", valor: 12, color: "#94A3B8" }
];

const COLORS = {
    "Jardim América": "#2563EB",
    "Águas Claras": "#10B981",
    "Moema": "#F59E0B",
    "Garavelo": "#8B5CF6",
    "Setor 44": "#F97316"
};

type StatusType = "saudavel" | "alerta" | "risco"

function calculateStatus(unit: Unit): { status: StatusType; percMinimo: number; percCapacidade: number } {
    const reference = unit.minimo ?? unit.capacidade
    const percMinimo = Math.round((unit.prestadoras / reference) * 100)
    const percCapacidade = Math.round((unit.prestadoras / unit.capacidade) * 100)

    let status: StatusType = "saudavel"
    if (percMinimo < 80) status = "risco"
    else if (percMinimo < 100) status = "alerta"

    return { status, percMinimo, percCapacidade }
}

const statusConfig = {
    saudavel: {
        dot: "bg-emerald-500",
        text: "text-emerald-600",
        leftBar: "bg-emerald-500",
        progress: "bg-emerald-500",
        tableDot: "bg-emerald-500",
        tableText: "text-emerald-700",
        label: "Saudável",
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
    },
    alerta: {
        dot: "bg-amber-500",
        text: "text-amber-600",
        leftBar: "bg-amber-500",
        progress: "bg-amber-500",
        tableDot: "bg-amber-500",
        tableText: "text-amber-700",
        label: "Alerta",
        icon: <AlertTriangle className="w-4 h-4 text-amber-500" />
    },
    risco: {
        dot: "bg-red-500",
        text: "text-red-600",
        leftBar: "bg-red-500",
        progress: "bg-red-500",
        tableDot: "bg-red-500",
        tableText: "text-red-700",
        label: "Risco",
        icon: <AlertCircle className="w-4 h-4 text-red-500" />
    },
}

export default function Dashboard() {
    const [units, setUnits] = useState<Unit[]>([])
    const [loadingUnits, setLoadingUnits] = useState(true)
    const [editingUnit, setEditingUnit] = useState<Unit | null>(null)
    const [editPrestadoras, setEditPrestadoras] = useState<number>(0)
    const [editIniciantes, setEditIniciantes] = useState<number>(0)
    const [periodo, setPeriodo] = useState("6m")

    useEffect(() => {
        const fetchUnits = async () => {
            const { data, error } = await supabase
                .from('units')
                .select('*')
                .order('nome')

            if (data && !error) {
                setUnits(data as Unit[])
            }
            setLoadingUnits(false)
        }
        fetchUnits()
    }, [])

    const processedUnits = useMemo(() => {
        return units.map(u => ({ ...u, ...calculateStatus(u) }))
    }, [units])

    const stats = useMemo(() => ({
        total: processedUnits.length,
        ativas: processedUnits.reduce((acc, u) => acc + u.prestadoras, 0),
        saudavel: processedUnits.filter(u => u.status === "saudavel").length,
        alerta: processedUnits.filter(u => u.status === "alerta").length,
        risco: processedUnits.filter(u => u.status === "risco").length,
    }), [processedUnits])

    const ranking = [...processedUnits].sort((a, b) => a.percMinimo - b.percMinimo)

    const openEdit = (unit: Unit) => {
        setEditingUnit(unit)
        setEditPrestadoras(unit.prestadoras)
        setEditIniciantes(unit.iniciantes)
    }

    const handleSaveEdit = () => {
        if (editingUnit) {
            setUnits(units.map(u =>
                u.id === editingUnit.id
                    ? { ...u, prestadoras: Math.min(editPrestadoras, u.capacidade), iniciantes: editIniciantes }
                    : u
            ))
            setEditingUnit(null)
        }
    }

    return (
        <div className="font-sans pb-16 pt-6 px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header / Seletores */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-page-title">Dashboard de Ocupação</h1>
                    <p className="text-sm text-slate-500 mt-1">Visão estratégica da capacidade operacional</p>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={periodo} onValueChange={setPeriodo}>
                        <SelectTrigger className="w-[180px] bg-white">
                            <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="3m">Últimos 3 meses</SelectItem>
                            <SelectItem value="6m">Últimos 6 meses</SelectItem>
                            <SelectItem value="1y">Este ano</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Unidades</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{stats.total}</span>
                        <Building2 className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Prestadoras</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{stats.ativas}</span>
                        <Users className="w-5 h-5 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm ring-1 ring-inset ring-emerald-500/20">
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Saudáveis
                    </p>
                    <span className="text-3xl font-bold text-slate-900 leading-none">{stats.saudavel}</span>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm ring-1 ring-inset ring-amber-500/20">
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Alertas
                    </p>
                    <span className="text-3xl font-bold text-slate-900 leading-none">{stats.alerta}</span>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm ring-1 ring-inset ring-red-500/20">
                    <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Riscos
                    </p>
                    <span className="text-3xl font-bold text-slate-900 leading-none">{stats.risco}</span>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Turnover Mês</p>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                            <ArrowUpRight className="w-4 h-4" /> 3 Entradas
                        </div>
                        <div className="flex items-center gap-1.5 text-red-600 text-sm font-medium">
                            <ArrowDownRight className="w-4 h-4" /> 1 Saída
                        </div>
                    </div>
                </div>
            </div>

            {/* Graphics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Evolução de Ocupação por Unidade</h3>
                        <p className="text-sm text-slate-500">Histórico de prestadoras ativas nos últimos 6 meses</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={historico_ocupacao} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                <RechartsTooltip
                                    cursor={{ fill: '#F1F5F9' }}
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                                <Bar dataKey="Jardim América" fill={COLORS["Jardim América"]} radius={[2, 2, 0, 0]} />
                                <Bar dataKey="Águas Claras" fill={COLORS["Águas Claras"]} radius={[2, 2, 0, 0]} />
                                <Bar dataKey="Moema" fill={COLORS["Moema"]} radius={[2, 2, 0, 0]} />
                                <Bar dataKey="Garavelo" fill={COLORS["Garavelo"]} radius={[2, 2, 0, 0]} />
                                <Bar dataKey="Setor 44" fill={COLORS["Setor 44"]} radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Line Chart */}
                <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Tendência Geral de Ocupação</h3>
                        <p className="text-sm text-slate-500">Total agregado vs Mínimo necessário de estabilidade</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={tendencia_geral} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend iconType="plainline" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                                <Area type="monotone" dataKey="total" name="Total Ativas" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                                <Line type="step" dataKey="minimo_agregado" name="Mínimo Agregado" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Donut & Ranking */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Donut Chart */}
                <div className="bg-white border rounded-xl shadow-sm p-6 flex flex-col lg:col-span-1">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900">Motivos de Desligamento</h3>
                        <p className="text-sm text-slate-500">Distribuição nos últimos 6 meses</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center -mt-4">
                        <div className="h-[220px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={motivos_saida}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="valor"
                                    >
                                        {motivos_saida.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-full space-y-2 mt-2 px-2">
                            {motivos_saida.map(m => (
                                <div key={m.motivo} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }}></div>
                                        <span className="text-slate-600 font-medium">{m.motivo}</span>
                                    </div>
                                    <span className="font-bold text-slate-900">{m.valor}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Ranking */}
                <div className="bg-white border rounded-xl shadow-sm p-6 lg:col-span-2 flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Ranking de Ocupação (% Estabilidade)</h3>
                        <p className="text-sm text-slate-500">Unidades ordenadas por criticidade operacional</p>
                    </div>
                    <div className="flex-1 space-y-5">
                        {ranking.map((unit, index) => {
                            const s = statusConfig[unit.status]
                            return (
                                <div key={unit.id} className="relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-bold text-slate-400 w-4">{index + 1}º</span>
                                            <span className="font-semibold text-slate-800">{unit.nome}</span>
                                            <span className="text-xs text-slate-500 hidden sm:inline-block">({unit.prestadoras} de {unit.minimo ?? unit.capacidade})</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {s.icon}
                                            <span className="font-bold text-slate-900 w-12 text-right">{unit.percMinimo}%</span>
                                        </div>
                                    </div>
                                    <Progress
                                        value={unit.percMinimo}
                                        className="h-2.5 bg-slate-100"
                                        indicatorClassName={s.progress}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Unit Cards Grid */}
            <div className="pt-4 border-t border-slate-200">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-slate-400" />
                        Detalhes das Unidades
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    {processedUnits.map(unit => {
                        const s = statusConfig[unit.status]
                        return (
                            <div
                                key={unit.id}
                                className="relative bg-white border rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col"
                            >
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${s.leftBar}`} />

                                <div className="pl-5 pr-5 pt-4 pb-3 border-b">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-base leading-tight">
                                                {unit.nome}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" /> {unit.cidade}
                                            </p>
                                        </div>
                                        {s.icon}
                                    </div>
                                </div>

                                <div className="pl-5 pr-5 py-4 flex-grow flex flex-col gap-6">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                                                Ativas
                                            </p>
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="text-3xl font-extrabold text-slate-900 tabular-nums leading-none">
                                                    {unit.prestadoras}
                                                </span>
                                                <span className="text-sm font-medium text-slate-400">
                                                    / {unit.capacidade}
                                                </span>
                                            </div>
                                        </div>
                                        {unit.iniciantes > 0 && (
                                            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full ring-1 ring-inset ring-blue-600/20">
                                                {unit.iniciantes} {unit.iniciantes > 1 ? 'inic.' : 'inic.'}
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1.5 font-medium">
                                                <span className="text-slate-500">Estabilidade</span>
                                                <span className="text-slate-900">{unit.percMinimo}%</span>
                                            </div>
                                            <Progress value={unit.percMinimo} className="h-2 bg-slate-100" indicatorClassName={s.progress} />
                                            <p className="text-[10px] text-slate-400 mt-1.5 text-right font-medium">
                                                Mínimo seguro: <span className="text-slate-600">{unit.minimo ?? '—'}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t bg-slate-50/50 p-2.5">
                                    <Button
                                        variant="ghost"
                                        className="w-full text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                        onClick={() => openEdit(unit)}
                                    >
                                        <Edit className="w-4 h-4 mr-2" /> Editar
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Edit Modal */}
            <Dialog open={!!editingUnit} onOpenChange={(open) => !open && setEditingUnit(null)}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Editar Ocupação</DialogTitle>
                        <DialogDescription className="text-slate-500">
                            Atualize os números de <span className="font-semibold text-slate-900">{editingUnit?.nome}</span>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="prestadoras" className="text-sm font-semibold text-slate-700">
                                Prestadoras ativas
                            </Label>
                            <Input
                                id="prestadoras"
                                type="number"
                                min={0}
                                max={editingUnit?.capacidade}
                                value={editPrestadoras}
                                onChange={(e) => setEditPrestadoras(parseInt(e.target.value) || 0)}
                                className="h-11 text-base font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="iniciantes" className="text-sm font-semibold text-slate-700">
                                Iniciantes (inclusas no total)
                            </Label>
                            <Input
                                id="iniciantes"
                                type="number"
                                min={0}
                                max={editPrestadoras}
                                value={editIniciantes}
                                onChange={(e) => setEditIniciantes(parseInt(e.target.value) || 0)}
                                className="h-11 text-base font-medium"
                            />
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Capacidade estrutural</span>
                                <span className="font-bold tabular-nums text-slate-900">{editingUnit?.capacidade}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Mínimo p/ estabilidade</span>
                                <span className="font-bold tabular-nums text-slate-900">{editingUnit?.minimo ?? '—'}</span>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setEditingUnit(null)} className="font-medium">
                            Cancelar
                        </Button>
                        <Button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700 font-semibold focus:ring-4 focus:ring-blue-100">
                            Salvar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}
