import { useState, useEffect } from "react"
import { Users, Search, Filter, MoreHorizontal, User, MapPin, CalendarDays, Clock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription
} from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface Prestadora {
    id: string
    nome_completo: string
    unidade_id: string | null
    funcao: string
    status: string
    data_entrada: string
    created_at: string
    // Relacionamento manual
    unidade_nome?: string
    unidade_cidade?: string
}

const getStatusBadge = (status: string) => {
    switch (status) {
        case "Ativa":
            return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">Ativa</Badge>
        case "Iniciante":
            return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">Iniciante</Badge>
        case "Afastada":
            return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">Afastada</Badge>
        default:
            return <Badge variant="outline" className="text-slate-500">{status}</Badge>
    }
}

const formatDate = (dateString: string) => {
    if (!dateString) return "—"
    try {
        const [year, month, day] = dateString.split('-')
        return `${day}/${month}/${year}`
    } catch {
        return dateString
    }
}

const calculateTime = (dateString: string) => {
    if (!dateString) return "—"
    const start = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 30) return `${diffDays} dias`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses`
    const years = Math.floor(diffDays / 365)
    const remMonths = Math.floor((diffDays % 365) / 30)
    return `${years} ano${years > 1 ? 's' : ''}${remMonths > 0 ? ` e ${remMonths} mês` : ''}`
}

export default function Pessoas() {
    const [searchTerm, setSearchTerm] = useState("")
    const [prestadoras, setPrestadoras] = useState<Prestadora[]>([])
    const [unidades, setUnidades] = useState<{ id: string, nome: string, cidade: string }[]>([])
    const [selectedUser, setSelectedUser] = useState<Prestadora | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Modal State
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        nome_completo: "",
        unidade_id: "",
        funcao: "Atendente",
        status: "Iniciante", // default ao criar
        data_entrada: new Date().toISOString().split('T')[0] // today
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            // Fetch units for reference
            const { data: unitsData, error: unitsError } = await supabase
                .from('units')
                .select('id, nome, cidade')

            if (unitsError) throw unitsError
            setUnidades(unitsData || [])

            // Fetch Prestadoras
            const { data: prestadorasData, error: prestadorasError } = await supabase
                .from('prestadoras')
                .select('*')
                .order('created_at', { ascending: false })

            if (prestadorasError) throw prestadorasError

            // Map prestadoras with their unit names for easy display
            const mappedData = (prestadorasData || []).map(p => {
                const unit = unitsData?.find(u => u.id === p.unidade_id)
                return {
                    ...p,
                    unidade_nome: unit?.nome || "Sem Unidade",
                    unidade_cidade: unit?.cidade || "—"
                }
            })

            setPrestadoras(mappedData)
        } catch (error) {
            console.error("Erro ao buscar dados:", error)
            toast.error("Falha ao carregar prestadoras")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCreatePrestadora = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.nome_completo || !formData.unidade_id) {
            toast.error("Preencha o nome e selecione a unidade")
            return
        }

        setIsSubmitting(true)
        try {
            const { error } = await supabase
                .from('prestadoras')
                .insert([{
                    nome_completo: formData.nome_completo,
                    unidade_id: formData.unidade_id,
                    funcao: formData.funcao,
                    status: formData.status,
                    data_entrada: formData.data_entrada
                }])

            if (error) throw error

            toast.success("Prestadora cadastrada!")
            setIsCreateModalOpen(false)
            setFormData({
                nome_completo: "",
                unidade_id: "",
                funcao: "Atendente",
                status: "Iniciante",
                data_entrada: new Date().toISOString().split('T')[0]
            })
            fetchData() // refresh list
        } catch (error) {
            console.error("Erro ao criar:", error)
            toast.error("Falha ao cadastrar prestadora.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const filteredData = prestadoras.filter(p =>
        p.nome_completo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.unidade_nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.unidade_cidade?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const ativasCount = prestadoras.filter(p => p.status === "Ativa").length
    const iniciantesCount = prestadoras.filter(p => p.status === "Iniciante").length
    const afastadasCount = prestadoras.filter(p => p.status === "Afastada").length

    return (
        <div className="font-sans pb-16 pt-6 px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-page-title">Gestão de Pessoas</h1>
                    <p className="text-sm text-slate-500 mt-1">Cadastro centralizado e histórico de prestadoras</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                        Cadastrar Nova
                    </Button>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Cadastradas</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{prestadoras.length}</span>
                        <Users className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2">Ativas</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{ativasCount}</span>
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Iniciantes</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{iniciantesCount}</span>
                        <User className="w-5 h-5 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">Afastadas</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{afastadasCount}</span>
                        <span className="text-sm font-medium text-slate-400">Em pausa</span>
                    </div>
                </div>
            </div>

            {/* Main Table Card */}
            <div className="bg-white border rounded-xl shadow-sm flex flex-col overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Buscar por nome ou unidade..."
                            className="pl-9 bg-white border-slate-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto text-slate-600 border-slate-200 bg-white">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtros
                    </Button>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto min-h-[300px]">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent bg-slate-50 border-b border-slate-200">
                                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 pl-6">Nome Completo</TableHead>
                                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4">Unidade Base</TableHead>
                                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4">Status</TableHead>
                                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4">Data de Entrada</TableHead>
                                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4">Tempo</TableHead>
                                <TableHead className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 pr-6">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                                        Carregando pessoas...
                                    </TableCell>
                                </TableRow>
                            ) : filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                                        Nenhuma prestadora encontrada.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map(person => (
                                    <TableRow
                                        key={person.id}
                                        className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                                        onClick={() => setSelectedUser(person)}
                                    >
                                        <TableCell className="pl-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-medium shrink-0">
                                                    {person.nome_completo.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 text-sm line-clamp-1">{person.nome_completo}</p>
                                                    <p className="text-xs text-slate-500">{person.funcao}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <p className="font-medium text-slate-700 text-sm whitespace-nowrap">{person.unidade_nome}</p>
                                            <p className="text-xs text-slate-500 leading-tight mt-0.5 whitespace-nowrap">{person.unidade_cidade}</p>
                                        </TableCell>
                                        <TableCell className="py-4 truncate">
                                            {getStatusBadge(person.status)}
                                        </TableCell>
                                        <TableCell className="py-4 text-sm text-slate-600 whitespace-nowrap">
                                            {formatDate(person.data_entrada)}
                                        </TableCell>
                                        <TableCell className="py-4 text-sm font-medium text-slate-700 whitespace-nowrap">
                                            {calculateTime(person.data_entrada)}
                                        </TableCell>
                                        <TableCell className="py-4 text-center pr-6">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900" onClick={(e) => e.stopPropagation()}>
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Modal: Cadastrar Prestadora */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Nova Prestadora</DialogTitle>
                        <DialogDescription>
                            Adicione uma nova prestadora ao sistema atribuindo obrigatoriamente uma Unidade Base.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreatePrestadora} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome Completo</Label>
                            <Input
                                id="nome"
                                placeholder="Digite o nome completo"
                                value={formData.nome_completo}
                                onChange={e => setFormData({ ...formData, nome_completo: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="unidade">Unidade Base</Label>
                            <Select
                                value={formData.unidade_id}
                                onValueChange={val => setFormData({ ...formData, unidade_id: val })}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma unidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    {unidades.map(u => (
                                        <SelectItem key={u.id} value={u.id}>{u.nome} ({u.cidade})</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="funcao">Função</Label>
                                <Input
                                    id="funcao"
                                    value={formData.funcao}
                                    onChange={e => setFormData({ ...formData, funcao: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={val => setFormData({ ...formData, status: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Iniciante">Iniciante</SelectItem>
                                        <SelectItem value="Ativa">Ativa</SelectItem>
                                        <SelectItem value="Afastada">Afastada</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="data">Data de Entrada</Label>
                            <Input
                                id="data"
                                type="date"
                                value={formData.data_entrada}
                                onChange={e => setFormData({ ...formData, data_entrada: e.target.value })}
                                required
                            />
                        </div>

                        <DialogFooter className="pt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit" className="bg-blue-600" disabled={isSubmitting}>
                                {isSubmitting ? "Salvando..." : "Cadastrar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* User Profile Sheet (Right Sidebar) */}
            <Sheet open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
                <SheetContent className="w-full sm:max-w-md bg-white border-l p-0 overflow-y-auto">
                    {selectedUser && (
                        <div className="flex flex-col h-full bg-slate-50/30">
                            <SheetHeader className="p-6 border-b text-left bg-white">
                                <div className="flex items-start gap-4 mb-2">
                                    <div className="w-16 h-16 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-bold text-2xl shrink-0">
                                        {selectedUser.nome_completo.charAt(0)}
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <SheetTitle className="text-xl leading-none mb-1.5">{selectedUser.nome_completo}</SheetTitle>
                                        <SheetDescription className="text-slate-500">{selectedUser.funcao}</SheetDescription>
                                        <div className="mt-3">
                                            {getStatusBadge(selectedUser.status)}
                                        </div>
                                    </div>
                                </div>
                            </SheetHeader>

                            <div className="p-6 space-y-8 flex-1">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alojamento Atual</h4>
                                    <div className="bg-white border rounded-lg p-4 shadow-sm flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-slate-900">{selectedUser.unidade_nome}</p>
                                            <p className="text-sm text-slate-500 mt-1">{selectedUser.unidade_cidade}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Histórico na Empresa</h4>
                                    <div className="bg-white border rounded-lg p-0 shadow-sm divide-y">
                                        <div className="p-4 flex items-center gap-3">
                                            <CalendarDays className="w-5 h-5 text-slate-400 shrink-0" />
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium">Data de Integração</p>
                                                <p className="font-semibold text-slate-900 text-sm mt-0.5">{formatDate(selectedUser.data_entrada)}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-slate-400 shrink-0" />
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium">Tempo de Contrato</p>
                                                <p className="font-semibold text-slate-900 text-sm mt-0.5">{calculateTime(selectedUser.data_entrada)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t bg-white flex gap-3 mt-auto">
                                <Button variant="outline" className="w-full text-slate-600 border-slate-200" onClick={() => setSelectedUser(null)}>
                                    Fechar
                                </Button>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    Ver Perfil Completo
                                </Button>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>

        </div>
    )
}
