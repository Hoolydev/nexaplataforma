import { Clock, CalendarClock, Fingerprint, CalendarDays } from "lucide-react"

export default function Frequencia() {
    return (
        <div className="font-sans px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-page-title">Ponto e Frequência</h1>
                    <p className="text-body-sm mt-1">Acompanhamento de horas, faltas e espelhos de ponto das filiais.</p>
                </div>
                <button className="bg-white border hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Mês Atual
                </button>
            </div>

            {/* Content Mock */}
            <div className="bg-white border text-center p-12 rounded-2xl shadow-sm flex flex-col items-center justify-center min-h-[50vh]">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 relative">
                    <Clock className="w-8 h-8" />
                    <Fingerprint className="w-4 h-4 absolute bottom-2 right-2 text-indigo-500 bg-blue-50 rounded-full" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Controle de Jornada em Construção</h2>
                <p className="text-slate-600 max-w-md mx-auto mb-8">
                    Em breve será possível aprovar espelhos de ponto, gerenciar escalas por unidade e visualizar gráficos de absenteísmo em tempo real.
                </p>

                <div className="flex gap-4 opacity-50 grayscale pointer-events-none mb-6">
                    <button className="w-12 h-12 bg-white border border-slate-200 shadow-sm rounded-full flex flex-col items-center justify-center">
                        <span className="text-xs font-bold font-mono">SEG</span>
                    </button>
                    <button className="w-12 h-12 bg-white border border-slate-200 shadow-sm rounded-full flex flex-col items-center justify-center ring-2 ring-blue-500 ring-offset-2">
                        <span className="text-xs font-bold font-mono">TER</span>
                    </button>
                    <button className="w-12 h-12 bg-white border border-slate-200 shadow-sm rounded-full flex flex-col items-center justify-center">
                        <span className="text-xs font-bold font-mono">QUA</span>
                    </button>
                </div>

                <div className="w-full max-w-2xl bg-slate-50 border rounded-xl p-4 flex flex-col gap-3 opacity-50 grayscale pointer-events-none text-left">
                    <div className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                            <div>
                                <div className="h-4 w-32 bg-slate-200 rounded mb-1"></div>
                                <div className="h-3 w-20 bg-slate-100 rounded"></div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="h-4 w-16 bg-slate-200 rounded mb-1 ml-auto"></div>
                            <div className="h-3 w-12 bg-emerald-100 rounded ml-auto"></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><CalendarClock className="w-3 h-3" /> 08:00 - 18:00</span>
                        <span className="text-emerald-600">No Horário</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
