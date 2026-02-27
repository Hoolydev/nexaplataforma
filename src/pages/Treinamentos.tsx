import { GraduationCap, BookOpen, Clock, Award, PlayCircle } from "lucide-react"

export default function Treinamentos() {
    return (
        <div className="font-sans px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-page-title">Treinamentos e Integração</h1>
                    <p className="text-body-sm mt-1">Gestão de cursos, reciclagens e capacitação de equipes.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                    Novo Treinamento
                </button>
            </div>

            {/* Content Mock */}
            <div className="bg-white border text-center p-12 rounded-2xl shadow-sm flex flex-col items-center justify-center min-h-[50vh]">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <GraduationCap className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Plataforma de Treinamentos Módulo em Desenvolvimento</h2>
                <p className="text-slate-600 max-w-md mx-auto mb-6">
                    Em breve você poderá gerenciar as trilhas de aprendizado, registrar presenças em integrações e emitir certificados para prestadoras.
                </p>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl opacity-60">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-center gap-3 bg-slate-50 grayscale">
                        <BookOpen className="w-5 h-5 text-slate-500" />
                        <div className="text-left">
                            <p className="text-xs font-medium text-slate-600">Trilhas ativas</p>
                            <p className="text-lg font-bold text-slate-900">0</p>
                        </div>
                    </div>
                    <div className="border border-slate-200 p-4 rounded-xl flex items-center gap-3 bg-slate-50 grayscale">
                        <PlayCircle className="w-5 h-5 text-slate-500" />
                        <div className="text-left">
                            <p className="text-xs font-medium text-slate-600">Em curso</p>
                            <p className="text-lg font-bold text-slate-900">0</p>
                        </div>
                    </div>
                    <div className="border border-slate-200 p-4 rounded-xl flex items-center gap-3 bg-slate-50 grayscale">
                        <Award className="w-5 h-5 text-slate-500" />
                        <div className="text-left">
                            <p className="text-xs font-medium text-slate-600">Certificadas</p>
                            <p className="text-lg font-bold text-slate-900">0</p>
                        </div>
                    </div>
                    <div className="border border-slate-200 p-4 rounded-xl flex items-center gap-3 bg-slate-50 grayscale">
                        <Clock className="w-5 h-5 text-slate-500" />
                        <div className="text-left">
                            <p className="text-xs font-medium text-slate-600">Evadidas</p>
                            <p className="text-lg font-bold text-slate-900">0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
