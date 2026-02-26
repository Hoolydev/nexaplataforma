import { useState } from "react"
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

// Mock Data
const prestadorasMock = [
    { id: "1", nome: "Ana Lima", unidade: "Jardim América", cidade: "Goiânia – GO", status: "Ativa", entrada: "2023-08-10", role: "Atendente" },
    { id: "2", nome: "Beatriz Souza", unidade: "Jardim América", cidade: "Goiânia – GO", status: "Ativa", entrada: "2024-01-15", role: "Atendente" },
    { id: "3", nome: "Carla Mendes", unidade: "Jardim América", cidade: "Goiânia – GO", status: "Iniciante", entrada: "2025-02-01", role: "Atendente" },
    { id: "4", nome: "Daniela Rocha", unidade: "Águas Claras", cidade: "Brasília – DF", status: "Ativa", entrada: "2023-11-20", role: "Atendente" },
    { id: "5", nome: "Elaine Castro", unidade: "Águas Claras", cidade: "Brasília – DF", status: "Iniciante", entrada: "2025-01-28", role: "Atendente" },
    { id: "6", nome: "Fernanda Alves", unidade: "Moema", cidade: "São Paulo – SP", status: "Ativa", entrada: "2024-03-05", role: "Supervisora" },
    { id: "7", nome: "Gisele Torres", unidade: "Garavelo", cidade: "Ap. de Goiânia – GO", status: "Ativa", entrada: "2024-06-12", role: "Atendente" },
    { id: "8", nome: "Helena Martins", unidade: "Setor 44", cidade: "Goiânia – GO", status: "Ativa", entrada: "2024-09-03", role: "Atendente" }
]

const getStatusBadge = (status: string) => {
    switch (status) {
        case "Ativa":
            return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">Ativa</Badge>
        case "Iniciante":
            return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">Iniciante</Badge>
        default:
            return <Badge variant="outline" className="text-slate-500">{status}</Badge>
    }
}

const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
}

const calculateTime = (dateString: string) => {
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
    const [selectedUser, setSelectedUser] = useState<typeof prestadorasMock[0] | null>(null)

    const filteredData = prestadorasMock.filter(p =>
        p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.unidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.cidade.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const ativasCount = prestadorasMock.filter(p => p.status === "Ativa").length
    const iniciantesCount = prestadorasMock.filter(p => p.status === "Iniciante").length

    return (
        <div className="font-sans pb-16 pt-6 px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestão de Pessoas</h1>
                    <p className="text-sm text-slate-500 mt-1">Cadastro centralizado e histórico de prestadoras</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                        Cadastrar Nova
                    </Button>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Cadastradas</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">{prestadorasMock.length}</span>
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
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Inativas</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">0</span>
                        <span className="text-sm font-medium text-slate-400">Nenhuma</span>
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
                <div className="overflow-x-auto">
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
                            {filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                                        Nenhuma prestadora encontrada com os filtros atuais.
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
                                                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-medium">
                                                    {person.nome.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900 text-sm">{person.nome}</p>
                                                    <p className="text-xs text-slate-500">{person.role}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <p className="font-medium text-slate-700 text-sm">{person.unidade}</p>
                                            <p className="text-xs text-slate-500 leading-tight mt-0.5">{person.cidade}</p>
                                        </TableCell>
                                        <TableCell className="py-4 truncate">
                                            {getStatusBadge(person.status)}
                                        </TableCell>
                                        <TableCell className="py-4 text-sm text-slate-600">
                                            {formatDate(person.entrada)}
                                        </TableCell>
                                        <TableCell className="py-4 text-sm font-medium text-slate-700">
                                            {calculateTime(person.entrada)}
                                        </TableCell>
                                        <TableCell className="py-4 text-center pr-6">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
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

            {/* User Profile Sheet (Right Sidebar) */}
            <Sheet open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
                <SheetContent className="w-full sm:max-w-md bg-white border-l p-0 overflow-y-auto">
                    {selectedUser && (
                        <div className="flex flex-col h-full bg-slate-50/30">
                            <SheetHeader className="p-6 border-b text-left bg-white">
                                <div className="flex items-start gap-4 mb-2">
                                    <div className="w-16 h-16 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-bold text-2xl shrink-0">
                                        {selectedUser.nome.charAt(0)}
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <SheetTitle className="text-xl leading-none mb-1.5">{selectedUser.nome}</SheetTitle>
                                        <SheetDescription className="text-slate-500">{selectedUser.role}</SheetDescription>
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
                                            <p className="font-semibold text-slate-900">{selectedUser.unidade}</p>
                                            <p className="text-sm text-slate-500 mt-1">{selectedUser.cidade}</p>
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
                                                <p className="font-semibold text-slate-900 text-sm mt-0.5">{formatDate(selectedUser.entrada)}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-slate-400 shrink-0" />
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium">Tempo de Contrato</p>
                                                <p className="font-semibold text-slate-900 text-sm mt-0.5">{calculateTime(selectedUser.entrada)}</p>
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
