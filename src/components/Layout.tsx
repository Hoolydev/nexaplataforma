import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useTheme } from "./theme-provider"
import {
    BarChart2,
    Users,
    UserPlus,
    GraduationCap,
    FileText,
    DollarSign,
    CalendarClock,
    PieChart,
    Settings,
    Moon,
    LogOut,
    Building2,
    Menu,
    Sun,
    X
} from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const navItems = [
    {
        group: "PRINCIPAL", items: [
            { name: "Dashboard", path: "/dashboard", icon: BarChart2 }
        ]
    },
    {
        group: "RH", items: [
            { name: "Pessoas", path: "/pessoas", icon: Users },
            { name: "Recrutamento", path: "/recrutamento", icon: UserPlus },
            { name: "Treinamentos", path: "/treinamentos", icon: GraduationCap },
        ]
    },
    {
        group: "DP", items: [
            { name: "Contratos", path: "/contratos", icon: FileText },
            { name: "Pagamentos", path: "/pagamentos", icon: DollarSign },
            { name: "Frequência", path: "/frequencia", icon: CalendarClock },
        ]
    },
    {
        group: "RELATÓRIOS", items: [
            { name: "Relatórios", path: "/relatorios", icon: PieChart },
        ]
    },
    {
        group: "SISTEMA", items: [
            { name: "Configurações", path: "/configuracoes", icon: Settings },
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
            <div className="lg:hidden fixed top-0 w-full bg-white border-b z-50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                        <Building2 className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900">Nexa Gestão</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
            </div>

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300",
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <Building2 className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">Nexa Gestão</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
                    {navItems.map((group) => (
                        <div key={group.group}>
                            <h3 className="px-3 text-xs font-semibold text-slate-500 tracking-wider mb-2">
                                {group.group}
                            </h3>
                            <div className="space-y-1">
                                {group.items.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={({ isActive }) => cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-blue-600 text-white shadow-sm"
                                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                        )}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800 space-y-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                        {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                    </Button>
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-white">AD</span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-white truncate">Admin Nexa</p>
                            <p className="text-xs text-slate-500 truncate">admin@nexagestao.com</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800"
                        onClick={() => navigate("/login")}
                    >
                        <LogOut className="w-4 h-4 mr-2" /> Sair
                    </Button>
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
                    className="lg:hidden fixed inset-0 bg-slate-900/50 z-30"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    )
}
