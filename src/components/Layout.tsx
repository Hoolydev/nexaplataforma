import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useTheme } from "./theme-provider"
import {
    LayoutDashboard,
    ContactRound,
    Briefcase,
    TrendingUp,
    BookOpen,
    ScrollText,
    Banknote,
    CalendarCheck,
    BarChart3,
    SlidersHorizontal,
    Moon,
    LogOut,
    Menu,
    Sun,
    X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const navItems = [
    {
        group: "Principal", items: [
            { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard }
        ]
    },
    {
        group: "Recursos Humanos", items: [
            { name: "Pessoas", path: "/pessoas", icon: ContactRound },
            { name: "Recrutamento", path: "/recrutamento", icon: Briefcase },
            { name: "Inteligência", path: "/inteligencia", icon: TrendingUp },
            { name: "Treinamentos", path: "/treinamentos", icon: BookOpen },
        ]
    },
    {
        group: "Departamento Pessoal", items: [
            { name: "Contratos", path: "/contratos", icon: ScrollText },
            { name: "Pagamentos", path: "/pagamentos", icon: Banknote },
            { name: "Frequência", path: "/frequencia", icon: CalendarCheck },
        ]
    },
    {
        group: "Análise", items: [
            { name: "Relatórios", path: "/relatorios", icon: BarChart3 },
        ]
    },
    {
        group: "Sistema", items: [
            { name: "Configurações", path: "/configuracoes", icon: SlidersHorizontal },
        ]
    }
]

export default function Layout() {
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { theme, setTheme } = useTheme()

    return (
        <div className={cn("min-h-screen bg-slate-50 flex", theme === 'dark' && "dark")}>
            {/* Mobile Toggle */}
            <div className="lg:hidden fixed top-0 w-full bg-white border-b z-50 px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                        <img src="/nexa-icon.png" alt="Nexa" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <span className="font-semibold text-slate-900 tracking-tight">Nexa Gestão</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </div>

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:static inset-y-0 left-0 z-40 w-[220px] bg-[#0C1220] text-slate-100 flex flex-col transition-transform duration-300 border-r border-white/[0.04]",
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                {/* Logo */}
                <div className="px-5 py-6 flex items-center gap-3 border-b border-white/[0.06]">
                    <div className="w-8 h-8 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                            src="/nexa-icon.png"
                            alt="Nexa"
                            className="w-full h-full object-contain"
                            style={{ filter: 'brightness(10)' }}
                        />
                    </div>
                    <div>
                        <p className="text-[14px] font-semibold text-white tracking-tight leading-none">Nexa</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-none">Gestão</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto custom-scrollbar">
                    {navItems.map((group) => (
                        <div key={group.group}>
                            <p className="px-2.5 text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-1.5">
                                {group.group}
                            </p>
                            <div className="space-y-0.5">
                                {group.items.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={({ isActive }) => cn(
                                            "group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-150",
                                            isActive
                                                ? "bg-white/10 text-white"
                                                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                        )}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <item.icon
                                                    strokeWidth={isActive ? 2 : 1.75}
                                                    className={cn(
                                                        "w-[17px] h-[17px] shrink-0 transition-colors",
                                                        isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                                                    )}
                                                />
                                                <span className="truncate">{item.name}</span>
                                                {isActive && (
                                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-white/[0.06] space-y-1">
                    <button
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-all"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        {theme === 'dark'
                            ? <Sun strokeWidth={1.75} className="w-[17px] h-[17px] shrink-0" />
                            : <Moon strokeWidth={1.75} className="w-[17px] h-[17px] shrink-0" />
                        }
                        {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                    </button>

                    <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg">
                        <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/30 flex items-center justify-center shrink-0">
                            <span className="text-[11px] font-bold text-blue-300">AD</span>
                        </div>
                        <div className="overflow-hidden flex-1">
                            <p className="text-[12px] font-medium text-slate-300 truncate leading-none">Admin Nexa</p>
                            <p className="text-[10px] text-slate-600 truncate mt-0.5 leading-none">admin@nexagestao.com</p>
                        </div>
                        <button
                            onClick={() => navigate("/login")}
                            className="shrink-0 text-slate-600 hover:text-slate-300 transition-colors"
                            title="Sair"
                        >
                            <LogOut strokeWidth={1.75} className="w-[15px] h-[15px]" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 transition-colors pt-16 lg:pt-0">
                    <Outlet />
                </main>
            </div>

            {/* Mobile overlay */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-slate-900/60 z-30 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    )
}
