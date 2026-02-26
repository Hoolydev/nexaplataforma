# Prompt de Expansão — Nexa Gestão: Plataforma Completa de RH & DP

> **Contexto:** O sistema já possui Landing Page, Login e Dashboard de Ocupação funcionando (cards por unidade com % de estabilidade, tabela consolidada e badges de status). Este prompt expande o produto em duas direções: (1) enriquecer o dashboard com gráficos visuais estilo analytics e (2) adicionar os módulos completos de RH e DP.

---

## PARTE 1 — EXPANSÃO DO DASHBOARD DE OCUPAÇÃO

### 1.1 Dados históricos a adicionar (mock para o MVP)

Adicione os seguintes dados históricos de ocupação para alimentar os gráficos. Simule os últimos 6 meses:

```json
{
  "historico_ocupacao": [
    { "mes": "Set/24", "Jardim América": 12, "Águas Claras": 14, "Moema": 6, "Garavelo": 2, "Setor 44": 3 },
    { "mes": "Out/24", "Jardim América": 13, "Águas Claras": 14, "Moema": 6, "Garavelo": 3, "Setor 44": 3 },
    { "mes": "Nov/24", "Jardim América": 14, "Águas Claras": 15, "Moema": 7, "Garavelo": 3, "Setor 44": 4 },
    { "mes": "Dez/24", "Jardim América": 13, "Águas Claras": 16, "Moema": 7, "Garavelo": 4, "Setor 44": 4 },
    { "mes": "Jan/25", "Jardim América": 15, "Águas Claras": 16, "Moema": 8, "Garavelo": 4, "Setor 44": 4 },
    { "mes": "Fev/25", "Jardim América": 16, "Águas Claras": 17, "Moema": 8, "Garavelo": 4, "Setor 44": 4 }
  ]
}
```

```json
{
  "turnover_mock": [
    { "mes": "Set/24", "entradas": 3, "saidas": 1 },
    { "mes": "Out/24", "entradas": 2, "saidas": 2 },
    { "mes": "Nov/24", "entradas": 4, "saidas": 1 },
    { "mes": "Dez/24", "entradas": 1, "saidas": 3 },
    { "mes": "Jan/25", "entradas": 5, "saidas": 2 },
    { "mes": "Fev/25", "entradas": 3, "saidas": 1 }
  ],
  "motivos_saida": [
    { "motivo": "Desligamento voluntário", "valor": 42 },
    { "motivo": "Desempenho", "valor": 28 },
    { "motivo": "Fim de contrato", "valor": 18 },
    { "motivo": "Outros", "valor": 12 }
  ]
}
```

---

### 1.2 Novos componentes visuais do Dashboard

Mantenha os cards e a tabela existentes. Adicione abaixo deles as seguintes seções:

#### Seção A — Gráfico de Evolução de Ocupação
- **Tipo:** Gráfico de barras agrupadas (igual ao "Product Sales" da referência)
- **Dados:** histórico dos últimos 6 meses, uma barra por unidade por mês
- **Cores das barras:** cada unidade com cor própria (Jardim América = azul, Águas Claras = verde, Moema = amarelo, Garavelo = roxo, Setor 44 = laranja)
- **Eixo X:** meses (Set/24 a Fev/25)
- **Eixo Y:** número de prestadoras
- **Linha de referência horizontal tracejada:** no nível do mínimo agregado (média dos mínimos)
- **Legenda** com nome de cada unidade
- **Tooltip** ao passar o mouse mostrando: unidade, mês, total de prestadoras, % do mínimo naquele mês
- Título: **"Evolução de Ocupação por Unidade"**

#### Seção B — Gráfico de Linha: Tendência Geral
- **Tipo:** Gráfico de linha suave (line chart)
- **Dados:** soma total de prestadoras ativas por mês (todos os últimos 6 meses)
- **Cor:** azul primário `#2563EB` com área sombreada abaixo
- **Segundo dataset:** linha pontilhada vermelha mostrando o mínimo agregado de estabilidade
- **Tooltip:** total de prestadoras no mês vs mínimo necessário
- Título: **"Tendência Geral de Ocupação"**

#### Seção C — Cards de KPI expandidos (linha de resumo superior)
Substitua os 4 cards atuais por 6 cards:
1. **Total de Unidades** — 5
2. **Total de Prestadoras Ativas** — 49
3. **Unidades Saudáveis** — 2 (verde)
4. **Unidades em Alerta** — 1 (amarelo)
5. **Unidades em Risco** — 2 (vermelho)
6. **Turnover do Mês** — +3 entradas / -1 saída (verde se positivo, vermelho se negativo)

#### Seção D — Dois painéis lado a lado

**Painel Esquerdo — Gráfico de Rosca: Motivos de Saída**
- Tipo: Donut chart (igual ao "Sales by product category" da referência)
- Dados: motivos de saída mockados acima
- Cores: vermelho, laranja, amarelo, cinza
- Legenda ao lado com percentuais
- Título: **"Motivos de Desligamento"**

**Painel Direito — Ranking de Ocupação por Unidade**
- Lista rankeada das 5 unidades por % de estabilidade
- Cada item: nome da unidade, barra de progresso horizontal colorida, percentual
- Ordenado do menor para o maior (unidades em risco no topo)
- Título: **"Ranking de Ocupação (% Estabilidade)"**

---

### 1.3 Filtro de período
Adicione no canto superior direito do dashboard um seletor de período:
- Opções: Últimos 3 meses / Últimos 6 meses / Este ano
- Ao trocar o período, os gráficos atualizam (com os dados mock disponíveis)

---

## PARTE 2 — SIDEBAR E NAVEGAÇÃO EXPANDIDA

Adicione uma sidebar lateral fixa (igual à da imagem de referência) com os seguintes módulos. Os módulos de Fase 1 são funcionais; os demais exibem tela "Em breve" com layout placeholder bonito.

```
NEXA GESTÃO

── PRINCIPAL
   📊 Dashboard              → /dashboard (já existe)

── RH
   👥 Pessoas                → /pessoas
   📋 Recrutamento           → /recrutamento
   🎓 Treinamentos           → /treinamentos

── DP
   📄 Contratos              → /contratos
   💰 Pagamentos             → /pagamentos
   📅 Frequência             → /frequencia

── RELATÓRIOS
   📈 Relatórios             → /relatorios

── SISTEMA
   ⚙️  Configurações         → /configuracoes
   🌙 Modo escuro (toggle)

── [Avatar + Nome] Admin
   [→ Sair]
```

---

## PARTE 3 — MÓDULO PESSOAS (/pessoas)

### Funcionalidades
- Lista de todas as prestadoras cadastradas no sistema
- Filtros: por unidade, por status (ativa / iniciante / inativa), por cidade
- Busca por nome

### Tabela principal
Colunas: **Nome | Unidade | Cidade | Status | Data de Entrada | Tempo na empresa | Ações**

### Cards de resumo no topo
- Total de prestadoras ativas
- Iniciantes (em treinamento)
- Inativas (desligadas)
- Tempo médio na empresa

### Dados mock para popular a tela

```json
[
  { "nome": "Ana Lima",        "unidade": "Jardim América", "cidade": "Goiânia – GO",           "status": "Ativa",     "entrada": "2023-08-10" },
  { "nome": "Beatriz Souza",   "unidade": "Jardim América", "cidade": "Goiânia – GO",           "status": "Ativa",     "entrada": "2024-01-15" },
  { "nome": "Carla Mendes",    "unidade": "Jardim América", "cidade": "Goiânia – GO",           "status": "Iniciante", "entrada": "2025-02-01" },
  { "nome": "Daniela Rocha",   "unidade": "Águas Claras",   "cidade": "Brasília – DF",          "status": "Ativa",     "entrada": "2023-11-20" },
  { "nome": "Elaine Castro",   "unidade": "Águas Claras",   "cidade": "Brasília – DF",          "status": "Iniciante", "entrada": "2025-01-28" },
  { "nome": "Fernanda Alves",  "unidade": "Moema",          "cidade": "São Paulo – SP",         "status": "Ativa",     "entrada": "2024-03-05" },
  { "nome": "Gisele Torres",   "unidade": "Garavelo",       "cidade": "Ap. de Goiânia – GO",    "status": "Ativa",     "entrada": "2024-06-12" },
  { "nome": "Helena Martins",  "unidade": "Setor 44",       "cidade": "Goiânia – GO",           "status": "Ativa",     "entrada": "2024-09-03" }
]
```

### Modal de perfil
Ao clicar em uma prestadora, abrir modal lateral (drawer) com:
- Nome completo, foto placeholder
- Unidade atual, cidade, status
- Data de entrada e tempo na empresa
- Histórico de unidades (mock: uma linha)
- Botões: Editar | Desligar

---

## PARTE 4 — MÓDULO RECRUTAMENTO (/recrutamento)

### Funcionalidades
- Kanban de vagas por etapa
- Cada coluna representa uma etapa do pipeline

### Colunas do Kanban
1. **Triagem** — candidatas recebidas
2. **Entrevista** — agendadas/realizadas
3. **Aprovadas** — aguardando integração
4. **Integração** — em onboarding
5. **Contratadas** — ingressaram como prestadoras

### Dados mock

```json
[
  { "nome": "Josiane Ferreira", "vaga": "Jardim América",  "etapa": "Triagem",    "data": "2025-02-18" },
  { "nome": "Karina Nunes",     "vaga": "Moema",           "etapa": "Triagem",    "data": "2025-02-19" },
  { "nome": "Letícia Prado",    "vaga": "Águas Claras",    "etapa": "Entrevista", "data": "2025-02-20" },
  { "nome": "Mariana Costa",    "vaga": "Jardim América",  "etapa": "Entrevista", "data": "2025-02-21" },
  { "nome": "Natália Silva",    "vaga": "Jardim América",  "etapa": "Aprovadas",  "data": "2025-02-22" },
  { "nome": "Olivia Dias",      "vaga": "Garavelo",        "etapa": "Integração", "data": "2025-02-15" },
  { "nome": "Paula Barros",     "vaga": "Setor 44",        "etapa": "Contratadas","data": "2025-02-10" }
]
```

### Cards de KPI no topo
- Vagas abertas (total de candidatas em Triagem + Entrevista)
- Em integração
- Contratadas no mês
- Tempo médio de contratação: 12 dias (mock)

---

## PARTE 5 — MÓDULO CONTRATOS (/contratos)

### Funcionalidades
- Lista de contratos ativos com data de vencimento
- Badge de alerta para contratos vencendo em até 30 dias
- Badge de risco para contratos vencidos

### Tabela
Colunas: **Prestadora | Unidade | Tipo de Contrato | Início | Vencimento | Status | Ações**

### Dados mock

```json
[
  { "prestadora": "Ana Lima",       "unidade": "Jardim América", "tipo": "Prestação de Serviço", "inicio": "2023-08-10", "vencimento": "2025-08-10", "status": "Ativo" },
  { "prestadora": "Beatriz Souza",  "unidade": "Jardim América", "tipo": "Prestação de Serviço", "inicio": "2024-01-15", "vencimento": "2025-03-15", "status": "Vence em breve" },
  { "prestadora": "Daniela Rocha",  "unidade": "Águas Claras",   "tipo": "CLT",                  "inicio": "2023-11-20", "vencimento": "2025-11-20", "status": "Ativo" },
  { "prestadora": "Fernanda Alves", "unidade": "Moema",          "tipo": "Prestação de Serviço", "inicio": "2024-03-05", "vencimento": "2025-03-05", "status": "Vence em breve" },
  { "prestadora": "Gisele Torres",  "unidade": "Garavelo",       "tipo": "Prestação de Serviço", "inicio": "2024-06-12", "vencimento": "2026-06-12", "status": "Ativo" }
]
```

### Cards de alerta no topo
- Contratos ativos: 5
- Vencendo em 30 dias: 2 (amarelo)
- Vencidos: 0 (verde)

---

## PARTE 6 — MÓDULO RELATÓRIOS (/relatorios)

### Funcionalidades
- Página com cards de relatórios disponíveis para exportação
- Cada card tem nome, descrição, ícone e botão "Exportar PDF" / "Exportar Excel" (pode ser placeholder por ora)

### Relatórios disponíveis (cards)
1. **Ocupação Atual por Unidade** — snapshot completo do dia com status de todas as unidades
2. **Evolução Mensal de Ocupação** — gráfico e tabela dos últimos 6 meses
3. **Turnover do Período** — entradas, saídas e motivos de desligamento
4. **Pipeline de Recrutamento** — candidatas por etapa e tempo médio de contratação
5. **Contratos a Vencer** — lista de contratos com vencimento nos próximos 60 dias
6. **Relatório Completo de Pessoas** — cadastro completo de todas as prestadoras ativas

---

## PARTE 7 — TELAS "EM BREVE"

Para os módulos **Treinamentos**, **Pagamentos** e **Frequência**, criar uma tela placeholder elegante com:
- Ícone grande centralizado
- Título do módulo
- Texto: "Este módulo está em desenvolvimento e será disponibilizado em breve."
- Badge: "Coming Soon"
- Botão: "Me avisar quando estiver pronto" (sem funcionalidade por ora)
- Background suave com o mesmo padrão visual da plataforma

---

## PARTE 8 — MODO ESCURO

Implementar toggle de modo escuro na sidebar (já previsto). Ao ativar:
- Background: `#0F172A`
- Cards: `#1E293B`
- Textos: `#F1F5F9`
- Bordas: `#334155`
- Manter as cores de status (verde, amarelo, vermelho) inalteradas pois são semânticas

---

## DIRETRIZES GERAIS DE DESIGN

- **Referência visual:** Dashboard da imagem 1 (Flup) — sidebar compacta com ícones, header interno limpo, cards com sombra suave, gráficos com recharts ou chart.js
- **Biblioteca de gráficos:** Recharts (preferencial) ou Chart.js
- **Componentes UI:** shadcn/ui ou Tailwind puro
- **Sidebar:** fixa à esquerda, colapsável (ícone apenas ou com labels), largura ~240px expandida
- **Responsividade:** sidebar some em mobile e vira menu hamburguer
- **Animações:** transições suaves de 200ms, barras de progresso animadas no load
- **Fonte:** Inter
- **Sombras nos cards:** `shadow-sm` com hover `shadow-md`

---

## FLUXO COMPLETO DE NAVEGAÇÃO

```
/ (Landing Page)
  └── /login
        └── /dashboard         ← Dashboard de Ocupação (expandido com gráficos)
        └── /pessoas           ← Lista de prestadoras + modal de perfil
        └── /recrutamento      ← Kanban de pipeline
        └── /treinamentos      ← Em breve
        └── /contratos         ← Gestão de contratos
        └── /pagamentos        ← Em breve
        └── /frequencia        ← Em breve
        └── /relatorios        ← Cards de exportação
        └── /configuracoes     ← Placeholder
```

---

## PRIORIDADE DE ENTREGA

Implemente nesta ordem:
1. Sidebar de navegação + roteamento completo
2. Dashboard expandido com gráficos (Seções A, B, C, D)
3. Módulo Pessoas
4. Módulo Recrutamento (Kanban)
5. Módulo Contratos
6. Módulo Relatórios
7. Telas "Em breve" para os demais
8. Modo escuro
