import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Layout from "./components/Layout"
import ComingSoon from "./pages/ComingSoon"
import Pessoas from "./pages/Pessoas"
import Recrutamento from "./pages/Recrutamento"
import Contratos from "./pages/Contratos"
import Relatorios from "./pages/Relatorios"

// Placeholder pages
const Configuracoes = () => <ComingSoon title="Configurações" />

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected layout with sidebar */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pessoas" element={<Pessoas />} />
          <Route path="/recrutamento" element={<Recrutamento />} />
          <Route path="/treinamentos" element={<ComingSoon title="Treinamentos" />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="/pagamentos" element={<ComingSoon title="Pagamentos" />} />
          <Route path="/frequencia" element={<ComingSoon title="Frequência" />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
