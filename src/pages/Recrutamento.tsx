import { useState } from "react"
import { Users, UserCheck, Clock, Plus, Search, Calendar, GripVertical, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragStartEvent,
    type DragOverEvent,
} from '@dnd-kit/core'
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// --- Types ---
type Etapa = "Triagem" | "Entrevista" | "Aprovadas" | "Integração" | "Contratadas"

interface Candidata {
    id: string
    nome: string
    vaga: string
    etapa: Etapa
    data: string
    canal?: string
}

// --- Initial Data ---
const initialCandidatas: Candidata[] = [
    { id: "1", nome: "Josiane Ferreira", vaga: "Jardim América", etapa: "Triagem", data: "2025-02-18", canal: "WhatsApp" },
    { id: "2", nome: "Karina Nunes", vaga: "Moema", etapa: "Triagem", data: "2025-02-19", canal: "LinkedIn Org." },
    { id: "3", nome: "Letícia Prado", vaga: "Águas Claras", etapa: "Entrevista", data: "2025-02-20", canal: "Tráfego Pago" },
    { id: "4", nome: "Mariana Costa", vaga: "Jardim América", etapa: "Entrevista", data: "2025-02-21", canal: "WhatsApp" },
    { id: "5", nome: "Natália Silva", vaga: "Jardim América", etapa: "Aprovadas", data: "2025-02-22", canal: "Indicação Interna" },
    { id: "6", nome: "Olivia Dias", vaga: "Garavelo", etapa: "Integração", data: "2025-02-15", canal: "Indicação Interna" },
    { id: "7", nome: "Paula Barros", vaga: "Setor 44", etapa: "Contratadas", data: "2025-02-10", canal: "OLX" }
]

const CANAIS_ORIGEM = [
    "WhatsApp", "Instagram Ads", "LinkedIn Org.", "LinkedIn Pago",
    "OLX", "Indicação Interna", "Telegram", "Tráfego Pago", "Outro"
]

const KANBAN_STAGES: Etapa[] = ["Triagem", "Entrevista", "Aprovadas", "Integração", "Contratadas"]

// --- Helper Components ---
const SortableCard = ({ candidata }: { candidata: Candidata }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: candidata.id, data: { candidata } })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`bg-white border border-slate-200 rounded-lg p-3 lg:p-4 shadow-sm hover:shadow-md transition-shadow group relative cursor-grab active:cursor-grabbing ${isDragging ? "ring-2 ring-blue-500 z-50" : ""}`}
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-slate-300 sm:hidden group-hover:block" />
                    <h4 className="font-bold text-sm text-slate-900">{candidata.nome}</h4>
                </div>
                <Button variant="ghost" size="icon" className="w-6 h-6 -mt-1 -mr-1 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </div>
            <p className="text-xs font-medium text-blue-600 mb-3 ml-0 sm:ml-6">{candidata.vaga}</p>
            <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium ml-0 sm:ml-6">
                <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {candidata.data.split('-').reverse().join('/')}
                </span>
                {candidata.etapa === "Triagem" && <span className="text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">Novo</span>}
            </div>
        </div>
    )
}

// --- Main Component ---
export default function Recrutamento() {
    const [candidatas, setCandidatas] = useState<Candidata[]>(initialCandidatas)
    const [searchTerm, setSearchTerm] = useState("")
    const [activeId, setActiveId] = useState<string | null>(null)

    // Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [newCandNome, setNewCandNome] = useState("")
    const [newCandVaga, setNewCandVaga] = useState("")
    const [newCandCanal, setNewCandCanal] = useState("")

    const handleAddCandidata = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newCandNome || !newCandVaga || !newCandCanal) return

        const newCand: Candidata = {
            id: Math.random().toString(36).substr(2, 9),
            nome: newCandNome,
            vaga: newCandVaga,
            etapa: "Triagem",
            data: new Date().toISOString().split('T')[0],
            canal: newCandCanal
        }

        setCandidatas([newCand, ...candidatas])
        setIsAddModalOpen(false)
        setNewCandNome("")
        setNewCandVaga("")
        setNewCandCanal("")
    }

    // Dnd-kit sensors configuration
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    // Filter logic
    const filteredCandidatas = candidatas.filter(c =>
        c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.vaga.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Stats calculations
    const vagasAbertas = candidatas.filter(c => ["Triagem", "Entrevista"].includes(c.etapa)).length
    const emIntegracao = candidatas.filter(c => c.etapa === "Integração").length
    const contratadasMes = candidatas.filter(c => c.etapa === "Contratadas").length

    // --- Drag and Drop Handlers ---
    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string)
    }

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveCard = active.data.current?.sortable
        const isOverCard = over.data.current?.sortable

        if (!isActiveCard) return

        // Mover card sobre outro card
        if (isActiveCard && isOverCard) {
            setCandidatas((items: Candidata[]) => {
                const oldIndex = items.findIndex((i: Candidata) => i.id === activeId)
                const newIndex = items.findIndex((i: Candidata) => i.id === overId)

                const overItem = items[newIndex]

                if (items[oldIndex].etapa !== overItem.etapa) {
                    const newItems = [...items]
                    newItems[oldIndex] = { ...newItems[oldIndex], etapa: overItem.etapa as Etapa }
                    return arrayMove(newItems, oldIndex, newIndex)
                }

                return arrayMove(items, oldIndex, newIndex)
            })
        }

        // Mover card para uma coluna vazia
        const isOverColumn = KANBAN_STAGES.includes(overId as Etapa)
        if (isActiveCard && isOverColumn) {
            setCandidatas((items: Candidata[]) => {
                const oldIndex = items.findIndex((i: Candidata) => i.id === activeId)
                const newItems = [...items]
                newItems[oldIndex] = { ...newItems[oldIndex], etapa: overId as Etapa }
                // Remove to push to end of array
                const movedItem = newItems.splice(oldIndex, 1)[0]
                newItems.push(movedItem)
                return newItems
            })
        }
    }

    const handleDragEnd = () => {
        setActiveId(null)
    }

    const activeCandidata = activeId ? candidatas.find(c => c.id === activeId) : null

    return (
        <div className="font-sans px-4 sm:px-6 lg:px-8 py-6 w-full max-w-[100vw] overflow-x-hidden space-y-6 animate-in fade-in duration-500 h-full flex flex-col">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-page-title">Recrutamento e Seleção</h1>
                    <p className="text-sm text-slate-500 mt-1">Pipeline de candidatas e gestão de vagas</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Buscar candidata..."
                            className="pl-9 bg-white border-slate-200 h-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 shadow-sm shrink-0 h-10">
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Nova Vaga</span>
                        <span className="sm:hidden">Vaga</span>
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 shrink-0">
                <div className="bg-white border rounded-xl p-4 lg:p-5 shadow-sm">
                    <p className="text-[10px] lg:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Vagas Abertas</p>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl lg:text-3xl font-bold text-slate-900 leading-none">{vagasAbertas}</span>
                        <Users className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white border rounded-xl p-4 lg:p-5 shadow-sm">
                    <p className="text-[10px] lg:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Em Integração</p>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl lg:text-3xl font-bold text-slate-900 leading-none">{emIntegracao}</span>
                        <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-amber-500" />
                    </div>
                </div>
                <div className="bg-white border rounded-xl p-4 lg:p-5 shadow-sm">
                    <p className="text-[10px] lg:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Contratadas</p>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl lg:text-3xl font-bold text-slate-900 leading-none">{contratadasMes}</span>
                        <UserCheck className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-500" />
                    </div>
                </div>
                <div className="bg-white border rounded-xl p-4 lg:p-5 shadow-sm">
                    <p className="text-[10px] lg:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tempo Médio</p>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl lg:text-3xl font-bold text-slate-900 leading-none">12<span className="text-sm lg:text-lg text-slate-500 font-medium ml-1">dias</span></span>
                        <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-slate-400" />
                    </div>
                </div>
            </div>

            {/* Kanban Board Container */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                {/* 
                  O Kanban agora usa min-h-0 e max-w-full para não forçar scroll de página 
                  e usa flex-none/flex-1 nas colunas dinâmicas. Em telas pequenas -> scroll-X, em telas grandes -> grid completo sem scroll-X
                */}
                <div className="flex-1 min-h-0 w-full overflow-x-auto pb-4 custom-scrollbar">
                    <div className="flex gap-4 lg:gap-5 h-full min-w-max xl:min-w-0 xl:grid xl:grid-cols-5 xl:w-full">
                        {KANBAN_STAGES.map(stage => {
                            const stageCandidates = filteredCandidatas.filter(c => c.etapa === stage)

                            return (
                                <SortableContext
                                    key={stage}
                                    id={stage}
                                    items={stageCandidates.map(c => c.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="w-[280px] lg:w-[320px] xl:w-auto flex flex-col bg-slate-100/60 border border-slate-200/80 rounded-xl h-full max-h-full">
                                        <div className="p-3 lg:p-4 border-b border-slate-200/60 flex items-center justify-between bg-slate-50/90 rounded-t-xl shrink-0">
                                            <h3 className="font-semibold text-slate-800 text-sm">{stage}</h3>
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white border shadow-sm text-xs font-bold text-slate-600">
                                                {stageCandidates.length}
                                            </span>
                                        </div>

                                        <div className="p-2 lg:p-3 flex-1 overflow-y-auto space-y-2 lg:space-y-3 custom-scrollbar">
                                            {stageCandidates.map(candidata => (
                                                <SortableCard key={candidata.id} candidata={candidata} />
                                            ))}

                                            {stageCandidates.length === 0 && (
                                                <div className="h-20 lg:h-24 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50/50">
                                                    <p className="text-xs text-slate-400 font-medium">Solte aqui</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </SortableContext>
                            )
                        })}
                    </div>
                </div>

                {/* Overlay shown while dragging */}
                <DragOverlay>
                    {activeCandidata ? (
                        <div className="bg-white border-2 border-blue-500 rounded-lg p-3 lg:p-4 shadow-xl rotate-3 opacity-90 cursor-grabbing w-[280px] lg:w-[320px] xl:w-auto h-auto min-h-[100px]">
                            <h4 className="font-bold text-sm text-slate-900 mb-1">{activeCandidata.nome}</h4>
                            <p className="text-xs font-medium text-blue-600">{activeCandidata.vaga}</p>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>

            {/* Dialog Nova Candidata */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adicionar Candidata</DialogTitle>
                        <DialogDescription>
                            Preencha as informações para adicionar uma nova candidata ao pipeline. O canal de origem é obrigatório para as métricas da empresa.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddCandidata} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="nome" className="text-xs font-semibold uppercase text-slate-500">
                                Nome da Candidata
                            </Label>
                            <Input
                                id="nome"
                                placeholder="Ex: Maria Joaquina"
                                value={newCandNome}
                                onChange={(e) => setNewCandNome(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="vaga" className="text-xs font-semibold uppercase text-slate-500">
                                Vaga/Unidade
                            </Label>
                            <Input
                                id="vaga"
                                placeholder="Ex: Jardim América - Atendente"
                                value={newCandVaga}
                                onChange={(e) => setNewCandVaga(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="canal" className="text-xs font-semibold uppercase text-slate-500">
                                Canal de Origem <span className="text-red-500">*</span>
                            </Label>
                            <Select required value={newCandCanal} onValueChange={setNewCandCanal}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o canal..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {CANAIS_ORIGEM.map(canal => (
                                        <SelectItem key={canal} value={canal}>{canal}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={!newCandNome || !newCandVaga || !newCandCanal}>
                                Salvar Candidata
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
