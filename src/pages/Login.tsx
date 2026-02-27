import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"

export default function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const form = e.currentTarget as HTMLFormElement
        const email = (form.elements.namedItem("email") as HTMLInputElement).value
        const password = (form.elements.namedItem("password") as HTMLInputElement).value

        setLoading(true)

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                setError(error.message === "Invalid login credentials"
                    ? "E-mail ou senha incorretos."
                    : "Erro ao fazer login. Tente novamente.")
                setLoading(false)
                return
            }

            if (data.session) {
                navigate("/dashboard")
            }
        } catch (err) {
            setError("Erro inesperado de servidor.")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Top bar */}
            <div className="px-6 py-4 border-b border-zinc-100">
                <Link to="/" className="flex items-center gap-2 w-fit group">
                    <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                        <img src="/nexa-icon.png" alt="Nexa" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                        Nexa Gestão
                    </span>
                </Link>
            </div>

            {/* Center content */}
            <div className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-[360px]">
                    {/* Title block */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Bem-vindo(a) de volta</h1>
                        <p className="text-sm text-zinc-500 mt-1.5">Acesse o painel de ocupação da sua equipe.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="flex items-center gap-2.5 p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-xs font-medium text-zinc-600">
                                E-mail corporativo
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="danielle@nexagestao.com"
                                    className="pl-9 border-zinc-200 bg-white text-sm h-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-xs font-medium text-zinc-600">
                                    Senha
                                </Label>
                                <a href="#" className="text-xs text-blue-600 hover:text-blue-700 transition-colors">
                                    Esqueci minha senha
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                                <Input
                                    id="password"
                                    type="password"
                                    className="pl-9 border-zinc-200 bg-white text-sm h-10"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 h-10 text-sm font-medium shadow-none mt-1"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Entrando...
                                </>
                            ) : (
                                <>
                                    Entrar <ArrowRight className="ml-2 w-3.5 h-3.5" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Footer note */}
                    <p className="mt-8 text-center text-xs text-zinc-400 flex items-center justify-center gap-1.5">
                        <Lock className="w-3 h-3" />
                        Acesso exclusivo para colaboradores Nexa
                    </p>
                </div>
            </div>
        </div>
    )
}
