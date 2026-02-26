import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
    ArrowRight,
    BarChart2,
    Target,
    Building2,
    Users,
    FileText,
    Menu,
    X,
    CheckCircle2,
    PieChart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

// Smooth scroll utility for anchor links
const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

export default function Landing() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("dashboard")

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            {/* SEÇÃO 1: NAVBAR */}
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-md flex items-center justify-center overflow-hidden bg-white shadow-sm">
                            <img src="/nexa-icon.png" alt="Nexa" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">Nexa Gestão</span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <button onClick={() => scrollTo('problemas')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Funcionalidades</button>
                        <button onClick={() => scrollTo('modulos')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Módulos</button>
                        <button onClick={() => scrollTo('para-quem')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Para quem é</button>
                        <Link to="/login">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-semibold px-5">
                                Entrar na Plataforma
                            </Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[60] bg-white p-6 md:hidden flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-md flex items-center justify-center overflow-hidden bg-white shadow-sm">
                                    <img src="/nexa-icon.png" alt="Nexa" className="w-full h-full object-contain" />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-slate-900">Nexa Gestão</span>
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-500 bg-slate-100 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-6 text-lg font-semibold text-slate-800">
                            <button onClick={() => { scrollTo('problemas'); setMobileMenuOpen(false) }} className="text-left w-full py-2 border-b">Funcionalidades</button>
                            <button onClick={() => { scrollTo('modulos'); setMobileMenuOpen(false) }} className="text-left w-full py-2 border-b">Módulos</button>
                            <button onClick={() => { scrollTo('para-quem'); setMobileMenuOpen(false) }} className="text-left w-full py-2 border-b">Para quem é</button>
                            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="mt-4">
                                <Button className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white">
                                    Entrar na Plataforma
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main>
                {/* SEÇÃO 2: HERO */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-white to-[#F0F4FF]/50 border-b border-blue-50">
                    <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] rounded-full bg-blue-50/50 blur-3xl opacity-50 pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="max-w-2xl"
                            >
                                <Badge variant="outline" className="bg-blue-50/50 text-blue-700 border-blue-200 px-3 py-1 mb-6 font-medium tracking-wide">
                                    <span className="text-blue-500 mr-1.5">✦</span> Plataforma completa de RH & DP
                                </Badge>
                                <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
                                    Gerencie pessoas, contratos e ocupação <span className="text-blue-600">em um só lugar</span>
                                </h1>
                                <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed">
                                    O Nexa Gestão é a plataforma de RH e DP feita para empresas que gerenciam equipes em múltiplas unidades. Visibilidade total, decisões rápidas e operação sem urgências.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <Link to="/login" className="w-full sm:w-auto">
                                        <Button className="w-full h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all">
                                            Começar agora
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto h-12 px-8 text-base font-semibold border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
                                        onClick={() => scrollTo('demonstracao')}
                                    >
                                        Ver demonstração
                                    </Button>
                                </div>
                            </motion.div>

                            {/* Floating Mockup */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="relative lg:ml-10 hidden sm:block"
                            >
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                    className="relative rounded-2xl bg-white border border-slate-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden"
                                >
                                    {/* Mockup Header */}
                                    <div className="h-12 bg-slate-50 border-b flex items-center px-4 gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-400" />
                                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                        </div>
                                    </div>
                                    {/* Mockup Body Content */}
                                    <div className="p-6 bg-slate-50/50 flex gap-4">
                                        <div className="w-48 shrink-0 bg-white border rounded-xl p-4 shadow-sm h-64 flex flex-col gap-3 hidden md:flex">
                                            <div className="w-full h-6 bg-slate-100 rounded" />
                                            <div className="w-3/4 h-4 bg-slate-100 rounded" />
                                            <div className="w-full h-full bg-slate-50 rounded mt-4" />
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div className="flex gap-4">
                                                <div className="flex-1 h-24 bg-white border rounded-xl p-4 shadow-sm" />
                                                <div className="flex-1 h-24 bg-white border rounded-xl p-4 shadow-sm" />
                                                <div className="flex-1 h-24 bg-white border rounded-xl p-4 shadow-sm" />
                                            </div>
                                            <div className="h-48 bg-white border rounded-xl p-4 shadow-sm w-full relative overflow-hidden">
                                                {/* Fake chart bars */}
                                                <div className="absolute bottom-4 left-6 w-8 h-20 bg-blue-500 rounded-md" />
                                                <div className="absolute bottom-4 left-20 w-8 h-32 bg-emerald-500 rounded-md" />
                                                <div className="absolute bottom-4 left-36 w-8 h-16 bg-amber-500 rounded-md" />
                                                <div className="absolute bottom-4 left-52 w-8 h-24 bg-blue-500 rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 3: PROVA SOCIAL */}
                <section className="bg-slate-50 border-b border-slate-100 py-10 px-6">
                    <div className="max-w-7xl mx-auto flex flex-col items-center">
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest text-center mb-6">
                            Confiado por gestoras de RH que administram equipes em Goiás, Brasília e São Paulo
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                            {/* Logos Placeholders */}
                            <div className="flex items-center gap-2 font-bold text-xl text-slate-800"><Building2 className="w-6 h-6" /> TechRH</div>
                            <div className="flex items-center gap-2 font-bold text-xl text-slate-800"><Users className="w-6 h-6" /> PeopleCorp</div>
                            <div className="flex items-center gap-2 font-bold text-xl text-slate-800"><Target className="w-6 h-6" /> MetaGestão</div>
                            <div className="flex items-center gap-2 font-bold text-xl text-slate-800"><BarChart2 className="w-6 h-6" /> AnalyticsRH</div>
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 4: O PROBLEMA QUE RESOLVEMOS */}
                <section id="problemas" className="py-24 px-6 bg-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Chega de gestão no improviso</h2>
                            <p className="text-lg text-slate-600">A operação trava por problemas que poderiam ter sido previstos. Mas agora nós temos a solução.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: "🚨",
                                    title: "Contratações na urgência",
                                    desc: "Você só descobre o déficit quando a operação já está comprometida. Sem visibilidade, não há como planejar.",
                                    color: "border-red-500"
                                },
                                {
                                    icon: "📂",
                                    title: "Documentos espalhados",
                                    desc: "Contratos vencendo, documentos pendentes e histórico de cada prestadora soltos em planilhas e e-mails.",
                                    color: "border-amber-500"
                                },
                                {
                                    icon: "🔁",
                                    title: "Turnover sem controle",
                                    desc: "Sem dados de entrada e saída, é impossível entender por que as pessoas saem — e o que fazer para reter talentos.",
                                    color: "border-orange-500"
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className={`bg-white border text-center p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
                                >
                                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${item.color}`} />
                                    <div className="text-4xl mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">{item.icon}</div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* SEÇÃO 5: MÓDULOS (SOLUÇÃO) */}
                <section id="modulos" className="py-24 px-6 bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Tudo que sua operação precisa, em um painel só</h2>
                            <p className="text-lg text-slate-600">Cada módulo foi pensado para resolver um ponto crítico da gestão de pessoas em campo.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: BarChart2, color: "text-blue-600 bg-blue-100",
                                    title: "Dashboard de Ocupação",
                                    desc: "Veja em tempo real o percentual de ocupação de cada unidade. Identifique riscos antes que virem urgências.",
                                    soon: false
                                },
                                {
                                    icon: Users, color: "text-indigo-600 bg-indigo-100",
                                    title: "Gestão de Pessoas",
                                    desc: "Cadastro completo das prestadoras, histórico de unidades, status e tempo de empresa centralizado.",
                                    soon: false
                                },
                                {
                                    icon: Target, color: "text-emerald-600 bg-emerald-100",
                                    title: "Recrutamento Integrado",
                                    desc: "Pipeline visual de candidatas por etapa. Do primeiro contato até a contratação, num só lugar.",
                                    soon: false
                                },
                                {
                                    icon: FileText, color: "text-amber-600 bg-amber-100",
                                    title: "Contratos & Vencimentos",
                                    desc: "Controle de vencimentos, alertas visuais automáticos e histórico de contratos por colaborador.",
                                    soon: false
                                },
                                {
                                    icon: PieChart, color: "text-purple-600 bg-purple-100",
                                    title: "Relatórios & BI",
                                    desc: "Exporte relatórios gerenciais em um clique. Evolução mensal, turnover e gráficos de capacidade.",
                                    soon: false
                                },
                                {
                                    icon: CheckCircle2, color: "text-slate-500 bg-slate-200",
                                    title: "Pagamentos & Frequência",
                                    desc: "Controle financeiro avançado de toda a força de trabalho.",
                                    soon: true
                                }
                            ].map((mod, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all group relative"
                                >
                                    {mod.soon && (
                                        <Badge className="absolute top-6 right-6 bg-slate-100 text-slate-600 hover:bg-slate-200 border-none font-semibold">Em breve</Badge>
                                    )}
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${mod.color}`}>
                                        <mod.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{mod.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{mod.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 6: COMO FUNCIONA */}
                <section className="py-24 px-6 bg-white border-b border-slate-100">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Fluxo simplificado</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Simples de usar. Poderoso de verdade.</h2>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 relative items-start">
                            {/* Connecting Line (desktop) */}
                            <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-slate-100 -z-10" />

                            {[
                                { step: "1", title: "Cadastre unidades", desc: "Configure a capacidade, o mínimo de estabilidade e as prestadoras base. Rápido e fácil." },
                                { step: "2", title: "Acompanhe indicadores", desc: "O dashboard atualiza automaticamente o status: verde (saudável), amarelo (alerta) ou vermelho (risco)." },
                                { step: "3", title: "Aja com antecedência", desc: "Planeje e mova candidatas no pipeline de recrutamento antes que a operação sofra o impacto." }
                            ].map((item, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center text-center relative bg-white md:bg-transparent px-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-6 shadow-md ring-4 ring-white">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 7: MOCKUP EXPANDIDO (TABS) */}
                <section id="demonstracao" className="py-24 px-6 bg-slate-900 text-white overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Veja como fica na prática</h2>
                            <p className="text-lg text-slate-400">Uma interface limpa e focada no que importa.</p>
                        </div>

                        {/* Custom Tabs */}
                        <div className="flex flex-wrap justify-center gap-2 mb-10">
                            {[
                                { id: "dashboard", label: "📊 Dashboard" },
                                { id: "pessoas", label: "👥 Gestão de Pessoas" },
                                { id: "recrutamento", label: "🎯 Recrutamento" }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === tab.id
                                        ? "bg-blue-600 text-white shadow-md scale-105"
                                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Visual Mockups Container */}
                        <div className="bg-slate-800/50 p-4 md:p-8 rounded-2xl border border-slate-700 shadow-2xl mx-auto backdrop-blur-sm h-[500px] overflow-hidden relative group">
                            {/* Mac-like header */}
                            <div className="flex gap-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-slate-600" />
                                <div className="w-3 h-3 rounded-full bg-slate-600" />
                                <div className="w-3 h-3 rounded-full bg-slate-600" />
                            </div>

                            {/* Tab 1: Dashboard Mockup */}
                            {activeTab === "dashboard" && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                                    <div className="flex gap-4 mb-2">
                                        <div className="h-20 flex-1 bg-slate-700 rounded-xl" />
                                        <div className="h-20 flex-1 bg-slate-700 rounded-xl" />
                                        <div className="h-20 flex-1 bg-emerald-600/20 rounded-xl border border-emerald-500/30" />
                                        <div className="h-20 flex-1 bg-red-600/20 rounded-xl border border-red-500/30" />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-64 flex-[2] bg-slate-700 rounded-xl p-4 flex items-end justify-between px-8">
                                            {/* Bars */}
                                            {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                                <div key={i} className="w-12 bg-blue-500/50 rounded-t-lg" style={{ height: `${h}%` }} />
                                            ))}
                                        </div>
                                        <div className="h-64 flex-1 bg-slate-700 rounded-xl flex items-center justify-center">
                                            <div className="w-32 h-32 rounded-full border-[16px] border-slate-600 border-t-amber-500 border-r-blue-500" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Tab 2: Pessoas Mockup */}
                            {activeTab === "pessoas" && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4 h-full">
                                    <div className="h-10 w-full bg-slate-700 rounded-lg mb-4" /> {/* Toolbar */}
                                    <div className="space-y-3">
                                        {[1, 2, 3, 4, 5].map((row) => (
                                            <div key={row} className="h-12 w-full bg-slate-700/50 rounded-lg flex items-center px-4 gap-4">
                                                <div className="w-8 h-8 rounded-full bg-slate-600" />
                                                <div className="h-3 w-48 bg-slate-600 rounded" />
                                                <div className="h-3 w-24 bg-slate-600 rounded ml-auto" />
                                                <div className="h-6 w-16 bg-emerald-500/20 rounded-full" />
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Tab 3: Recrutamento Mockup */}
                            {activeTab === "recrutamento" && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex gap-4 h-full">
                                    {/* Kanban Columns */}
                                    {[1, 2, 3].map((col) => (
                                        <div key={col} className="flex-1 bg-slate-700/30 rounded-xl p-4 flex flex-col gap-3">
                                            <div className="h-6 w-24 bg-slate-600 rounded mb-2" />
                                            <div className="h-24 w-full bg-slate-700 rounded-lg shadow-md" />
                                            {col !== 3 && <div className="h-24 w-full bg-slate-700 rounded-lg shadow-md" />}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 8: PARA QUEM É */}
                <section id="para-quem" className="py-24 px-6 bg-slate-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Feito para quem gerencia equipes em campo</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Perfil 1 */}
                            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0" />
                                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10">RH</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">Diretora de RH</h3>
                                <ul className="space-y-3 relative z-10">
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-slate-600">Visão consolidada de todas as filiais</span></li>
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-slate-600">Indicadores de risco em tempo real</span></li>
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-slate-600">Relatórios de turnover prontos</span></li>
                                </ul>
                            </div>
                            {/* Perfil 2 */}
                            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-0" />
                                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10">GU</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">Gestora de Unidade</h3>
                                <ul className="space-y-3 relative z-10">
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-slate-600">Acompanha sua própria equipe</span></li>
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-slate-600">Vizualiza status de candidatas</span></li>
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-slate-600">Atualiza prestadoras ativas fácil</span></li>
                                </ul>
                            </div>
                            {/* Perfil 3 */}
                            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-0" />
                                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold text-xl mb-6 relative z-10">DP</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">Setor de DP</h3>
                                <ul className="space-y-3 relative z-10">
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-slate-600">Controla vencimentos de contrato</span></li>
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-slate-600">Alerta de renovações a fazer</span></li>
                                    <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-slate-600">Visão financeira e de faltas</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 9: DESTAQUES / NÚMEROS */}
                <section className="bg-[#1E293B] py-16 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-slate-700/50">
                            <div className="flex flex-col gap-2">
                                <span className="text-4xl md:text-5xl font-extrabold text-white">5+</span>
                                <span className="text-sm font-medium text-slate-400">Unidades monitoradas</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-4xl md:text-5xl font-extrabold text-blue-400">100%</span>
                                <span className="text-sm font-medium text-slate-400">Visibilidade unificada</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-4xl md:text-5xl font-extrabold text-emerald-400">-40%</span>
                                <span className="text-sm font-medium text-slate-400">Contratações reativas</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-4xl md:text-5xl font-extrabold text-amber-400">3<span className="text-2xl ml-1">min</span></span>
                                <span className="text-sm font-medium text-slate-400">Para identificar riscos</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 10: CTA FINAL */}
                <section className="relative overflow-hidden bg-blue-600 py-32 px-6">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full blur-3xl opacity-50" />

                    <div className="relative max-w-4xl mx-auto text-center z-10">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Sua operação merece mais do que uma planilha</h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Comece hoje mesmo a usar o Nexa Gestão. É rápido, visual e totalmente focado na realidade da gestão de RH em campo.
                        </p>
                        <Link to="/login">
                            <Button className="h-14 px-10 text-lg bg-white text-blue-600 hover:bg-blue-50 font-bold shadow-lg transition-transform hover:scale-105 active:scale-95">
                                Entrar na Plataforma <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            {/* SEÇÃO 11: FOOTER */}
            <footer className="bg-slate-50 pt-20 pb-10 px-6 border-t border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2.5 mb-6">
                                <div className="w-8 h-8 rounded-md flex items-center justify-center overflow-hidden bg-white shadow-sm">
                                    <img src="/nexa-icon.png" alt="Nexa" className="w-full h-full object-contain" />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-slate-900">Nexa Gestão</span>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                                Plataforma inteligente de RH & DP exclusiva para gestão de equipes operacionais e múltiplas filiais.
                            </p>
                        </div>

                        {/* Produto */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Produto</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Dashboard Ocupação</a></li>
                                <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Gestão Pessoas</a></li>
                                <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Recrutamento Kanban</a></li>
                                <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Controle de Contratos</a></li>
                                <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Relatórios Gerenciais</a></li>
                            </ul>
                        </div>

                        {/* Empresa */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Empresa</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Sobre Nós</a></li>
                                <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Contato Comercial</a></li>
                                <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Suporte</a></li>
                                <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Termos de Uso</a></li>
                            </ul>
                        </div>

                        {/* Contato */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4">Contato Direto</h4>
                            <ul className="space-y-3">
                                <li className="text-sm text-slate-500 font-medium">contato@nexagestao.com.br</li>
                                <li className="text-sm text-slate-500">Av. T-9, Esq. T-2 - Goiânia, GO</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-400 font-medium">
                            &copy; {new Date().getFullYear()} Nexa Gestão. Todos os direitos reservados.
                        </p>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full border">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Sistemas Operacionais Normais
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
