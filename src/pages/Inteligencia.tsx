import { useState } from "react"
import {
    Brain, DollarSign, Users, LineChart, Target,
    ChevronDown, Clock, Lightbulb, AlertCircle, ArrowUpRight, ArrowDownRight
} from "lucide-react"
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
    LineChart as RecLineChart, Line, FunnelChart as RecFunnelChart, Funnel, LabelList, Cell
} from "recharts"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const TABS = [
    { id: "tab1", label: "Visão Geral Financeira" },
    { id: "tab2", label: "Performance por Canal" },
    { id: "tab3", label: "Por Unidade" },
    { id: "tab4", label: "Tempo e Gargalos" },
    { id: "tab5", label: "Pós-Contratação" },
]

// --- Mock Data: Tab 1 ---
const dataInvestimento = [
    { canal: "WhatsApp", investimento: 200, contratacoes: 3 },
    { canal: "Instagram", investimento: 800, contratacoes: 2 },
    { canal: "LinkedIn Org.", investimento: 0, contratacoes: 1 },
    { canal: "LinkedIn Pago", investimento: 1200, contratacoes: 1 },
    { canal: "OLX", investimento: 150, contratacoes: 1 },
    { canal: "Indicação", investimento: 0, contratacoes: 2 },
    { canal: "Telegram", investimento: 100, contratacoes: 0 },
    { canal: "Tráfego", investimento: 750, contratacoes: 2 }
]

const dataCusto = [
    { canal: "Indicação", custo: 0 },
    { canal: "WhatsApp", custo: 67 },
    { canal: "OLX", custo: 150 },
    { canal: "Tráfego", custo: 375 },
    { canal: "Instagram", custo: 400 },
    { canal: "LinkedIn Pago", custo: 1200 },
    { canal: "Telegram", custo: 0 }
].sort((a, b) => {
    if (a.custo === 0 && a.canal === "Telegram") return 1;
    if (b.custo === 0 && b.canal === "Telegram") return -1;
    return a.custo - b.custo;
})

const getCostColor = (custo: number, canal: string) => {
    if (canal === "Telegram") return "#94A3B8"
    if (custo < 300) return "#10B981"
    if (custo <= 600) return "#F59E0B"
    return "#EF4444"
}

// --- Mock Data: Tab 2 ---
const dataCanais = [
    { canal: "WhatsApp", candidatos: 87, qualificados: 31, entrevistados: 12, contratados: 3, custo: 200 },
    { canal: "Instagram Ads", candidatos: 142, qualificados: 28, entrevistados: 8, contratados: 2, custo: 800 },
    { canal: "LinkedIn Org.", candidatos: 19, qualificados: 11, entrevistados: 4, contratados: 1, custo: 0 },
    { canal: "LinkedIn Pago", candidatos: 54, qualificados: 18, entrevistados: 6, contratados: 1, custo: 1200 },
    { canal: "OLX", candidatos: 63, qualificados: 14, entrevistados: 5, contratados: 1, custo: 150 },
    { canal: "Indicação", candidatos: 8, qualificados: 7, entrevistados: 4, contratados: 2, custo: 0 },
    { canal: "Telegram", candidatos: 34, qualificados: 4, entrevistados: 1, contratados: 0, custo: 100 },
    { canal: "Tráfego Pago", candidatos: 98, qualificados: 22, entrevistados: 9, contratados: 2, custo: 750 }
].map(c => {
    const txConversao = c.contratados / c.candidatos
    const txQualidade = c.qualificados / c.candidatos
    const custoPorContrato = c.contratados > 0 ? c.custo / c.contratados : 1500

    // Normalizações (0 a 1) para o Score
    // assumindo conversao max ~ 0.25 (25%)
    const convNorm = Math.min(txConversao / 0.25, 1)
    // assumindo custo max bom ~ 1000
    const custoNorm = Math.max(0, 1 - (custoPorContrato / 1000))

    // Pesos do prompt: conversao 40%, custo 35%, qualidade 25%
    const scoreRaw = (convNorm * 4) + (custoNorm * 3.5) + (txQualidade * 2.5)

    return {
        ...c,
        taxa_conversao: txConversao * 100,
        custo_contrato: c.contratados > 0 ? c.custo / c.contratados : null,
        score: Math.min(10, Math.max(0, scoreRaw)).toFixed(1)
    }
}).sort((a, b) => parseFloat(b.score) - parseFloat(a.score))

// --- Mock Data: Tab 3 ---
const dataUnidades = [
    { unidade: "Jardim América", contratacoes: 3, custo_medio: 245, melhor_canal: "WhatsApp" },
    { unidade: "Águas Claras", contratacoes: 2, custo_medio: 400, melhor_canal: "Tráfego Pago" },
    { unidade: "Moema", contratacoes: 1, custo_medio: 150, melhor_canal: "OLX" },
    { unidade: "Garavelo", contratacoes: 1, custo_medio: 0, melhor_canal: "Indicação" },
    { unidade: "Setor 44", contratacoes: 1, custo_medio: 0, melhor_canal: "Indicação" }
]

const heatmapCanais = ["WhatsApp", "OLX", "Instagram", "LinkedIn Pago", "Indicação", "Tráfego", "Telegram", "LinkedIn Org."]

const dataHeatmap = [
    { tipo: "Operacional", WhatsApp: 8.2, OLX: 6.1, Instagram: 3.4, "LinkedIn Pago": 1.2, Indicação: 9.1, Tráfego: 4.5, Telegram: 1.8, "LinkedIn Org.": 0.9 },
    { tipo: "Técnica", WhatsApp: 3.1, OLX: 2.2, Instagram: 4.8, "LinkedIn Pago": 5.9, Indicação: 7.2, Tráfego: 6.1, Telegram: 1.2, "LinkedIn Org.": 6.8 },
    { tipo: "Administrativa", WhatsApp: 5.5, OLX: 3.8, Instagram: 5.2, "LinkedIn Pago": 4.1, Indicação: 8.0, Tráfego: 5.8, Telegram: 2.1, "LinkedIn Org.": 4.4 },
    { tipo: "Estratégica", WhatsApp: 1.2, OLX: 0.8, Instagram: 2.9, "LinkedIn Pago": 7.8, Indicação: 6.5, Tráfego: 3.2, Telegram: 0.5, "LinkedIn Org.": 8.1 }
]

const getHeatmapColor = (value: number) => {
    if (value >= 8) return "bg-emerald-600 text-white"
    if (value >= 5) return "bg-emerald-400 text-emerald-950"
    if (value >= 3) return "bg-emerald-200 text-emerald-950"
    if (value >= 1) return "bg-amber-100 text-amber-900"
    return "bg-slate-100 text-slate-500"
}

// --- Mock Data: Tab 4 ---
const dataTempoEtapas = [
    { etapa: "Receb. → Triagem", dias: 1.2 },
    { etapa: "Triagem → Entrevista", dias: 6.8 },
    { etapa: "Entrevi. → Aprov.", dias: 3.1 },
    { etapa: "Aprov. → Integração", dias: 2.4 },
    { etapa: "Integra. → Contratação", dias: 4.5 }
]

const getEtapaColor = (dias: number) => {
    if (dias < 3) return "#10B981"
    if (dias <= 7) return "#F59E0B"
    return "#EF4444"
}

const dataTempoCanal = [
    { canal: "Indicação", dias: 5 },
    { canal: "WhatsApp", dias: 8 },
    { canal: "OLX", dias: 11 },
    { canal: "Tráfego", dias: 13 },
    { canal: "Instagram", dias: 16 },
    { canal: "LinkedIn Org.", dias: 19 },
    { canal: "LinkedIn Pago", dias: 24 },
    { canal: "Telegram", dias: 28 }
]

const dataEvolucaoTempo = [
    { mes: "Set/24", dias: 19 },
    { mes: "Out/24", dias: 17 },
    { mes: "Nov/24", dias: 16 },
    { mes: "Dez/24", dias: 15 },
    { mes: "Jan/25", dias: 14 },
    { mes: "Fev/25", dias: 14 }
]

// --- Mock Data: Tab 5 ---
const dataRetencao = [
    { canal: "Indicação Interna", contratadas: 2, aprovadas: 2, em_retencao: 2, desligadas: 0, score_final: 9.4 },
    { canal: "WhatsApp", contratadas: 3, aprovadas: 3, em_retencao: 2, desligadas: 1, score_final: 8.1 },
    { canal: "OLX", contratadas: 1, aprovadas: 1, em_retencao: 1, desligadas: 0, score_final: 7.2 },
    { canal: "Tráfego Pago", contratadas: 2, aprovadas: 2, em_retencao: 1, desligadas: 1, score_final: 5.9 },
    { canal: "Instagram", contratadas: 2, aprovadas: 1, em_retencao: 1, desligadas: 1, score_final: 4.7 },
    { canal: "LinkedIn Org.", contratadas: 1, aprovadas: 1, em_retencao: 1, desligadas: 0, score_final: 6.8 },
    { canal: "LinkedIn Pago", contratadas: 1, aprovadas: 1, em_retencao: 0, desligadas: 1, score_final: 3.2 },
    { canal: "Telegram", contratadas: 0, aprovadas: 0, em_retencao: 0, desligadas: 0, score_final: 1.1 }
].map(c => ({
    ...c,
    tx_retencao: c.contratadas > 0 ? (c.em_retencao / c.contratadas) * 100 : 0
})).sort((a, b) => b.score_final - a.score_final)

const getScoreFinalColor = (score: number) => {
    if (score >= 7) return "#10B981" // emerald
    if (score >= 4) return "#F59E0B" // amber
    return "#EF4444" // red
}

export default function Inteligencia() {
    const [activeTab, setActiveTab] = useState("tab1")
    const [periodo, setPeriodo] = useState("Este mês")
    const [funnelCanal, setFunnelCanal] = useState(dataCanais[0].canal)

    const funnelDataSelected = dataCanais.find(c => c.canal === funnelCanal) || dataCanais[0]
    const dataFunnel = [
        { name: "Candidatos", value: funnelDataSelected.candidatos, fill: "#3B82F6" },
        { name: "Qualificados", value: funnelDataSelected.qualificados, fill: "#0EA5E9" },
        { name: "Entrevistados", value: funnelDataSelected.entrevistados, fill: "#10B981" },
        { name: "Contratados", value: funnelDataSelected.contratados, fill: "#F59E0B" }
    ]

    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false)
    const [custos, setCustos] = useState<{ [key: string]: number }>(
        dataCanais.reduce((acc, c) => ({ ...acc, [c.canal]: c.custo }), {})
    )

    const handleSaveCustos = (e: React.FormEvent) => {
        e.preventDefault()
        // Here we would normally save to Supabase.
        setIsConfigModalOpen(false)
        console.log("Custos Salvos:", custos)
    }

    return (
        <div className="font-sans pb-16 pt-6 px-4 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 min-h-screen">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            <Brain className="w-5 h-5" />
                        </div>
                        <h1 className="text-page-title">Inteligência de Contratação</h1>
                    </div>
                    <p className="text-body-sm mt-1 ml-10">Análise estratégica de canais, custos e qualidade de contratação</p>
                </div>

                <div className="flex items-center gap-3 self-start md:self-auto w-full md:w-auto">
                    <Button variant="outline" size="sm" onClick={() => setIsConfigModalOpen(true)} className="flex items-center gap-2 h-9 text-slate-600 bg-white shadow-sm border-slate-200">
                        <DollarSign className="w-4 h-4" />
                        Custos Mês
                    </Button>

                    <div className="relative group cursor-pointer border shadow-sm rounded-lg p-1.5 px-3 bg-white hover:bg-slate-50 flex items-center gap-2 text-sm text-slate-700 font-medium w-full md:w-auto h-9">
                        <span>{periodo}</span>
                        <ChevronDown className="w-4 h-4 ml-auto md:ml-2 text-slate-400" />
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 flex flex-col py-1">
                            {["Este mês", "Últimos 3 meses", "Últimos 6 meses", "Este ano"].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPeriodo(p)}
                                    className={`text-left px-3 py-2 text-sm hover:bg-slate-50 ${periodo === p ? "font-semibold text-blue-600 bg-blue-50/50" : "text-slate-600"}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto custom-scrollbar border-b border-slate-200">
                <div className="flex gap-6 min-w-max px-1">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === tab.id
                                ? "text-blue-600"
                                : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content Areas */}
            <div className="mt-6">
                {activeTab === "tab1" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">

                        {/* KPI Cards Tab 1 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Investimento Total</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold text-slate-900 leading-none">R$ 3.200</span>
                                    <DollarSign className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                            </div>
                            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Custo Médio (CAC)</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold text-slate-900 leading-none">R$ 400</span>
                                    <Target className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                            </div>
                            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Contratações</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold text-slate-900 leading-none">8</span>
                                    <Users className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                            </div>
                            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">ROI Médio (Canais)</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold text-slate-900 leading-none">3,2x</span>
                                    <LineChart className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                            </div>
                        </div>

                        {/* Charts Tab 1 */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Gráfico 1 - Investimento vs ContrataçÕes */}
                            <div className="bg-white border rounded-xl p-5 shadow-sm">
                                <h3 className="text-base font-bold text-slate-900 mb-1">Investimento vs. Contratações</h3>
                                <p className="text-xs text-slate-500 mb-6">Comparativo de gastos e volume de entradas por canal selecionado</p>

                                <div className="h-[340px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={dataInvestimento} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis dataKey="canal" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} tickMargin={8} angle={-40} textAnchor="end" height={80} interval={0} />
                                            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v}`} />
                                            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                                            <RechartsTooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value, name) => name === "Investimento" ? [`R$ ${value}`, name] : [value, name]}
                                                labelStyle={{ fontWeight: 'bold', color: '#0F172A', marginBottom: '4px' }}
                                            />
                                            <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: "20px", fontSize: "12px", paddingBottom: "10px" }} />
                                            <Bar yAxisId="left" dataKey="investimento" name="Investimento" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} />
                                            <Bar yAxisId="right" dataKey="contratacoes" name="Contratações" fill="#10B981" radius={[4, 4, 0, 0]} barSize={20} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Gráfico 2 - Custo por Contratação */}
                            <div className="bg-white border rounded-xl p-5 shadow-sm">
                                <h3 className="text-base font-bold text-slate-900 mb-1">Custo por Contratação (CAC)</h3>
                                <p className="text-xs text-slate-500 mb-6">Média de custo de aquisição (menor é melhor)</p>

                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={dataCusto} layout="vertical" margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                                            <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v}`} />
                                            <YAxis type="category" dataKey="canal" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} width={80} />
                                            <RechartsTooltip
                                                cursor={{ fill: '#F8FAFC' }}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value: any, _name: any, props: any) => {
                                                    if (props.payload.canal === "Telegram") return ["Sem contratações", "Custo"]
                                                    return [`R$ ${value}`, "Custo Estimado"]
                                                }}
                                            />
                                            <Bar dataKey="custo" radius={[0, 4, 4, 0]} barSize={24}>
                                                {dataCusto.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={getCostColor(entry.custo, entry.canal)} />
                                                ))}
                                                <LabelList dataKey="custo" position="right" formatter={(v: any) => {
                                                    // hack for type check
                                                    if (v === 0) return "Orgânico"
                                                    return `R$ ${v}`
                                                }} style={{ fontSize: '11px', fontWeight: 'bold', fill: '#475569' }} />
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex items-center gap-4 justify-center mt-2 text-[10px] text-slate-500 font-medium">
                                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> &lt; R$ 300 (Bom)</span>
                                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div> R$ 300 - 600 (Atenção)</span>
                                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div> &gt; R$ 600 (Alto)</span>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
                {activeTab === "tab2" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
                        {/* Ranking Top 3 e Alerta */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {dataCanais.slice(0, 3).map((canal, index) => (
                                <div key={canal.canal} className="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${index === 0 ? 'bg-amber-100' : index === 1 ? 'bg-slate-100' : 'bg-orange-100'}`}>
                                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500">{index + 1}º Lugar em Score</p>
                                            <p className="font-bold text-slate-900">{canal.canal}</p>
                                        </div>
                                    </div>
                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full text-xs border border-emerald-100">
                                        {canal.score}
                                    </span>
                                </div>
                            ))}
                            {/* Caro alerta */}
                            {(() => {
                                const maisCaro = [...dataCanais].sort((a, b) => (b.custo_contrato || 0) - (a.custo_contrato || 0))[0]
                                return (
                                    <div className="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between border-l-4 border-l-red-500">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                                                <AlertCircle className="w-4 h-4 text-red-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-red-500 uppercase">Custo MAIS Alto</p>
                                                <p className="font-bold text-slate-900">{maisCaro.canal}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })()}
                        </div>

                        {/* Tabela e Funil */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Tabela de Canais */}
                            <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col">
                                <div className="px-5 py-4 border-b flex justify-between items-center bg-slate-50/50">
                                    <h3 className="font-bold text-slate-900">Performance Analítica</h3>
                                    <p className="text-xs text-slate-500">Detalhe completo de pipeline e custos</p>
                                </div>
                                <div className="overflow-x-auto flex-1 custom-scrollbar">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-slate-500 bg-slate-50 border-b">
                                            <tr>
                                                <th className="px-4 py-3 font-semibold">Canal</th>
                                                <th className="px-4 py-3 font-semibold text-right">Candidatos</th>
                                                <th className="px-4 py-3 font-semibold text-right">Qualificados</th>
                                                <th className="px-4 py-3 font-semibold text-right">Contratados</th>
                                                <th className="px-4 py-3 font-semibold text-right">Conversão</th>
                                                <th className="px-4 py-3 font-semibold text-right">Custo / Vaga</th>
                                                <th className="px-4 py-3 font-semibold text-center">Score</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {dataCanais.map(row => (
                                                <tr key={row.canal} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.canal}</td>
                                                    <td className="px-4 py-3 text-right">{row.candidatos}</td>
                                                    <td className="px-4 py-3 text-right">{row.qualificados}</td>
                                                    <td className="px-4 py-3 text-right text-blue-600 font-medium">{row.contratados}</td>
                                                    <td className="px-4 py-3 text-right">{row.taxa_conversao.toFixed(1)}%</td>
                                                    <td className="px-4 py-3 text-right text-slate-500">
                                                        {row.custo_contrato !== null ? `R$ ${row.custo_contrato.toFixed(0)}` : "—"}
                                                    </td>
                                                    <td className="px-4 py-3 text-center w-24">
                                                        <div className={`px-2 py-1 rounded text-xs font-bold ${parseFloat(row.score) >= 8 ? "bg-emerald-100 text-emerald-700" :
                                                            parseFloat(row.score) >= 5 ? "bg-amber-100 text-amber-700" :
                                                                "bg-red-100 text-red-700"
                                                            }`}>
                                                            {row.score}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Funil do Canal */}
                            <div className="bg-white border rounded-xl p-5 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-slate-900">Funil de Conversão</h3>
                                </div>
                                <div className="mb-6">
                                    <select
                                        className="w-full text-sm border-slate-200 rounded-lg p-2 bg-slate-50 text-slate-700 font-medium outline-none focus:ring-2 focus:ring-blue-500"
                                        value={funnelCanal}
                                        onChange={(e) => setFunnelCanal(e.target.value)}
                                    >
                                        {dataCanais.map(c => <option key={c.canal} value={c.canal}>{c.canal}</option>)}
                                    </select>
                                </div>

                                <div className="h-[280px] w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RecFunnelChart>
                                            <RechartsTooltip
                                                formatter={(value: any, name: any) => [value, name]}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Funnel
                                                dataKey="value"
                                                data={dataFunnel}
                                                isAnimationActive
                                            >
                                                <LabelList position="right" fill="#475569" stroke="none" dataKey="name" fontSize={12} fontWeight="bold" />
                                            </Funnel>
                                        </RecFunnelChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
                {activeTab === "tab3" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
                        {/* Cards Unidade */}
                        <div className="flex overflow-x-auto gap-4 custom-scrollbar pb-2">
                            {dataUnidades.map(unidade => (
                                <div key={unidade.unidade} className="bg-white border rounded-xl p-4 shadow-sm min-w-[240px] flex-shrink-0">
                                    <p className="font-bold text-slate-900 mb-3">{unidade.unidade}</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500">Contratações:</span>
                                            <span className="font-semibold text-slate-900">{unidade.contratacoes}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500">Custo Médio:</span>
                                            <span className="font-semibold text-slate-900 line-clamp-1">
                                                {unidade.custo_medio > 0 ? `R$ ${unidade.custo_medio}` : 'R$ 0 (Orgânico)'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1 mt-2 pt-2 border-t">
                                            <span className="text-[10px] uppercase font-bold text-slate-400">Melhor Canal</span>
                                            <span className="font-medium text-blue-600 text-sm truncate">{unidade.melhor_canal}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Heatmap */}
                        <div className="bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col">
                            <div className="px-5 py-4 border-b flex justify-between items-center bg-slate-50/50">
                                <div>
                                    <h3 className="font-bold text-slate-900">Mapa de Eficiência (Tx. Conversão %)</h3>
                                    <p className="text-xs text-slate-500">Performance de canal cruzada com tipo de vaga requerida</p>
                                </div>
                            </div>
                            <div className="overflow-x-auto p-5 custom-scrollbar">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-2 text-left font-medium text-slate-500 min-w-[120px]">Tipo / Canal</th>
                                            {heatmapCanais.map(c => (
                                                <th key={c} className="px-2 py-2 text-center font-medium text-slate-500 text-xs w-[100px]">
                                                    <div className="-rotate-45 md:rotate-0 whitespace-nowrap h-16 md:h-auto flex items-end md:items-center justify-center">
                                                        {c}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {dataHeatmap.map(row => (
                                            <tr key={row.tipo}>
                                                <td className="px-3 py-3 font-semibold text-slate-700 whitespace-nowrap">{row.tipo}</td>
                                                {heatmapCanais.map(canal => {
                                                    const val = (row as any)[canal] as number;
                                                    return (
                                                        <td key={canal} className="p-1">
                                                            <div className={`w-full aspect-video md:aspect-auto md:h-10 rounded flex items-center justify-center font-medium text-xs transition-transform hover:scale-105 cursor-default ${getHeatmapColor(val)}`}>
                                                                {val.toFixed(1)}
                                                            </div>
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Insight dinâmico */}
                        <div className="bg-slate-900 rounded-xl p-5 border-l-4 border-blue-500 shadow-md flex gap-4">
                            <div className="bg-blue-500/20 w-10 h-10 rounded-full flex shrink-0 items-center justify-center">
                                <Lightbulb className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Recomendação Estratégica Baseada em Dados</h4>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Para vagas <strong>Operacionais</strong>, <em>Indicação Interna</em> e <em>WhatsApp</em> têm as maiores taxas de conversão. Para vagas <strong>Estratégicas</strong>, priorize as plataformas <em>LinkedIn Orgânico</em> e <em>LinkedIn Pago</em>.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab4" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
                        {/* KPI Cards Tab 4 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tempo Fechamento</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold text-slate-900 leading-none">14d</span>
                                    <Clock className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                            </div>
                            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Maior Gargalo</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-lg font-bold text-red-600 leading-tight">Triagem → <br />Entrevista</span>
                                </div>
                                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                            </div>
                            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Resposta (Nexa)</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold text-slate-900 leading-none">4,2h</span>
                                </div>
                                <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
                            </div>
                            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Resposta (Candidata)</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold text-slate-900 leading-none">11,8h</span>
                                </div>
                                <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Gráfico 1 - Tempo por Etapa */}
                            <div className="bg-white border rounded-xl p-5 shadow-sm lg:col-span-1">
                                <h3 className="text-base font-bold text-slate-900 mb-1">Tempo Médio (Etapas)</h3>
                                <p className="text-xs text-slate-500 mb-6">Dias em cada transição do pipeline</p>

                                <div className="h-[280px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={dataTempoEtapas} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                                            <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                                            <YAxis type="category" dataKey="etapa" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} width={110} />
                                            <RechartsTooltip
                                                cursor={{ fill: '#F8FAFC' }}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value) => [`${value} dias`, "Tempo Médio"]}
                                            />
                                            <Bar dataKey="dias" radius={[0, 4, 4, 0]} barSize={20}>
                                                {dataTempoEtapas.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={getEtapaColor(entry.dias)} />
                                                ))}
                                                <LabelList dataKey="dias" position="right" formatter={(v: any) => `${v}d`} style={{ fontSize: '11px', fontWeight: 'bold', fill: '#475569' }} />
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Gráfico 2 e 3 - Tempo por Canal e Evolução */}
                            <div className="lg:col-span-2 space-y-6 flex flex-col">
                                <div className="bg-white border rounded-xl p-5 shadow-sm">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-base font-bold text-slate-900 mb-1">Evolução do Tempo de Fechamento</h3>
                                            <p className="text-xs text-slate-500">Média geral por mês vs. Meta de 10 dias</p>
                                        </div>
                                        <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 flex items-center gap-2 text-sm font-bold">
                                            <ArrowDownRight className="w-4 h-4" />
                                            26% vs. 6m atrás
                                        </div>
                                    </div>
                                    <div className="h-[160px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RecLineChart data={dataEvolucaoTempo} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} tickMargin={10} />
                                                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} domain={[0, 25]} />
                                                <RechartsTooltip
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                    formatter={(value) => [`${value} dias`, "Tempo Médio Geral"]}
                                                />
                                                <Line type="monotone" dataKey="dias" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 6 }} />
                                                {/* Simulated reference line */}
                                                <Line type="step" dataKey={() => 10} stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" dot={false} activeDot={false} name="Meta (10d)" />
                                                <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: "20px", fontSize: "11px", paddingBottom: "10px" }} />
                                            </RecLineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-white border rounded-xl p-5 shadow-sm flex-1 flex flex-col">
                                    <h3 className="text-base font-bold text-slate-900 mb-1">Tempo de Fechamento por Canal</h3>
                                    <div className="h-[220px] w-full mt-auto">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={dataTempoCanal} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                                <XAxis dataKey="canal" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} tickMargin={8} angle={-35} textAnchor="end" height={75} interval={0} />
                                                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                                                <RechartsTooltip
                                                    cursor={{ fill: '#F8FAFC' }}
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                    formatter={(value) => [`${value} dias`, "Tempo de Fechamento"]}
                                                />
                                                <Bar dataKey="dias" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={24} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab5" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">

                        {/* KPI Cards Tab 5 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Aprovação (Exp.)</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold text-slate-900 leading-none">87,5%</span>
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center"><ArrowUpRight className="w-3 h-3 text-emerald-600" /></div>
                                </div>
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                            </div>
                            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Retenção (+90d)</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold text-slate-900 leading-none">75%</span>
                                    <Users className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                            </div>
                            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Maior Retenção</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-lg font-bold text-emerald-600 leading-tight">Indicação<br />Interna</span>
                                </div>
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                            </div>
                            <div className="bg-white border rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Maior Evasão</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-lg font-bold text-red-600 leading-tight">Telegram</span>
                                </div>
                                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Tabela de Retenção */}
                            <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col">
                                <div className="px-5 py-4 border-b flex justify-between items-center bg-slate-50/50">
                                    <h3 className="font-bold text-slate-900">Sobrevivência por Canal (90 dias)</h3>
                                </div>
                                <div className="overflow-x-auto flex-1 custom-scrollbar">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-slate-500 bg-slate-50 border-b">
                                            <tr>
                                                <th className="px-4 py-3 font-semibold">Canal</th>
                                                <th className="px-4 py-3 font-semibold text-right">Contratadas</th>
                                                <th className="px-4 py-3 font-semibold text-right">Aprov. Exp</th>
                                                <th className="px-4 py-3 font-semibold text-right text-emerald-600">Retidas</th>
                                                <th className="px-4 py-3 font-semibold text-right text-red-600">Saídas</th>
                                                <th className="px-4 py-3 font-semibold text-right">Retenção %</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {dataRetencao.map(row => (
                                                <tr key={row.canal} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.canal}</td>
                                                    <td className="px-4 py-3 text-right">{row.contratadas}</td>
                                                    <td className="px-4 py-3 text-right">{row.aprovadas}</td>
                                                    <td className="px-4 py-3 text-right font-medium text-emerald-600">{row.em_retencao}</td>
                                                    <td className="px-4 py-3 text-right font-medium text-red-600">{row.desligadas}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.tx_retencao >= 80 ? 'bg-emerald-100 text-emerald-700' :
                                                            row.tx_retencao >= 50 ? 'bg-amber-100 text-amber-700' :
                                                                row.tx_retencao > 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
                                                            }`}>
                                                            {row.tx_retencao > 0 ? `${row.tx_retencao.toFixed(0)}%` : '—'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Gráfico de Ranking Real */}
                            <div className="bg-white border rounded-xl p-5 shadow-sm lg:col-span-1">
                                <h3 className="text-base font-bold text-slate-900 mb-1">Ranking Geral (Score Final)</h3>
                                <p className="text-xs text-slate-500 mb-6">Ponderação: Conversão 30% · Custo 35% · Retenção 35%</p>

                                <div className="h-[280px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={[...dataRetencao].reverse()} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                                            <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} domain={[0, 10]} />
                                            <YAxis type="category" dataKey="canal" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} width={80} />
                                            <RechartsTooltip
                                                cursor={{ fill: '#F8FAFC' }}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value: any) => [value, "Score Final"]}
                                            />
                                            <Bar dataKey="score_final" radius={[0, 4, 4, 0]} barSize={16}>
                                                {[...dataRetencao].reverse().map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={getScoreFinalColor(entry.score_final)} />
                                                ))}
                                                <LabelList dataKey="score_final" position="right" style={{ fontSize: '11px', fontWeight: 'bold', fill: '#475569' }} />
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                        </div>

                        {/* Recomendação Executiva Final */}
                        <div className="bg-[#1E293B] rounded-xl p-6 shadow-lg border-l-4 border-blue-500 mt-8 relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                            <div className="flex gap-4 relative z-10">
                                <div className="bg-blue-500/20 w-12 h-12 rounded-full flex shrink-0 items-center justify-center">
                                    <Lightbulb className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-white font-bold text-lg">Recomendação estratégica gerada pelos dados</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed max-w-4xl">
                                        <strong>Indicação Interna</strong> e <strong>WhatsApp</strong> concentram o melhor custo-benefício da operação — alto volume qualificado, baixo custo e boa retenção.
                                        <strong> LinkedIn Pago</strong> apresenta o maior custo por contratação (R$ 1.200) com retenção abaixo da média.
                                        <br /><br />
                                        <span className="text-blue-300 font-medium">✨ Sugestão de ação:</span> Considere redirecionar 30–40% do orçamento do LinkedIn Pago para fortalecer programas de bonificação de Indicação Interna e campanhas patrocinadas no WhatsApp direcionadas à base de talentos engajados.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
                {/* Modal Configuração de Orçamento */}
                <Dialog open={isConfigModalOpen} onOpenChange={setIsConfigModalOpen}>
                    <DialogContent className="sm:max-w-[450px]">
                        <DialogHeader>
                            <DialogTitle>Orçamento e Investimentos</DialogTitle>
                            <DialogDescription>
                                Configure os valores gastos em cada canal no período selecionado. O sistema usará os valores preenchidos com os dados de candidatas para calcular o CAC e o Score Final.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSaveCustos} className="py-2">
                            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                {dataCanais.map(c => (
                                    <div key={c.canal} className="flex items-center justify-between gap-4">
                                        <Label htmlFor={`custo-${c.canal}`} className="text-sm font-medium text-slate-700 w-32 shrink-0">
                                            {c.canal}
                                        </Label>
                                        <div className="relative flex-1">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-slate-500 sm:text-sm">R$</span>
                                            </div>
                                            <Input
                                                id={`custo-${c.canal}`}
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={custos[c.canal] || 0}
                                                onChange={(e) => setCustos({ ...custos, [c.canal]: parseFloat(e.target.value) || 0 })}
                                                className="pl-9 h-9"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <DialogFooter className="mt-6">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancelar</Button>
                                </DialogClose>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Salvar Custos</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}
