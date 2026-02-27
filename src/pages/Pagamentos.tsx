import { DollarSign, FileSpreadsheet, Send, Search } from "lucide-react"

export default function Pagamentos() {
    return (
        <div className="font-sans px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-page-title">Pagamentos e Benefícios</h1>
                    <p className="text-body-sm mt-1">Gestão de folhas, vales e reajustes da equipe.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-slate-100 border hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4" />
                        Importar Lote
                    </button>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Fechar Folha
                    </button>
                </div>
            </div>

            {/* Content Mock */}
            <div className="bg-white border text-center p-12 rounded-2xl shadow-sm flex flex-col items-center justify-center min-h-[50vh]">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                    <DollarSign className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Módulo Financeiro Integrado (Em Breve)</h2>
                <p className="text-slate-600 max-w-md mx-auto mb-8">
                    Aqui você terá visibilidade de remuneração variável, gestão de férias, adiantamentos e pagamentos de todas as prestadoras de todas as filiais.
                </p>

                {/* Fake Table */}
                <div className="w-full max-w-4xl border rounded-xl overflow-hidden opacity-50 grayscale pointer-events-none">
                    <div className="bg-slate-50 px-4 py-3 border-b flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Search className="w-4 h-4" />
                            <span className="text-sm">Buscando folhas...</span>
                        </div>
                    </div>
                    <div className="divide-y bg-white">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex px-4 py-3 justify-between items-center text-sm">
                                <div className="flex flex-col items-start gap-1">
                                    <div className="h-4 w-32 bg-slate-200 rounded"></div>
                                    <div className="h-3 w-20 bg-slate-100 rounded"></div>
                                </div>
                                <div className="h-6 w-24 bg-emerald-100 rounded-full"></div>
                                <div className="h-4 w-20 bg-slate-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
