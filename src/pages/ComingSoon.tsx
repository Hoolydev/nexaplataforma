import { Construction } from "lucide-react"

interface ComingSoonProps {
    title: string
}

export default function ComingSoon({ title }: ComingSoonProps) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500 h-full min-h-[70vh]">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 ring-8 ring-blue-50/50">
                <Construction className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">{title}</h1>
            <p className="text-slate-500 max-w-md mb-8 text-lg">
                Este módulo está em desenvolvimento e será disponibilizado em breve na plataforma.
            </p>
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Em Breve
            </div>
        </div>
    )
}
