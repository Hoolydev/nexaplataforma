# Prompt de Atualização — Landing Page Nexa Gestão
## Plataforma Completa de RH & DP

> **Contexto:** A Landing Page atual apresenta o Nexa Gestão apenas como um dashboard de ocupação. Agora o produto é uma plataforma completa de RH e Departamento Pessoal. Substituir completamente a LP atual por esta versão expandida, mantendo a identidade visual (azul `#2563EB`, verde `#10B981`, tipografia Inter).

---

## ESTRUTURA COMPLETA DA NOVA LANDING PAGE

### SEÇÃO 1 — NAVBAR (fixo no topo)

- **Logo:** ícone de gráfico + "Nexa Gestão" em negrito
- **Links de navegação:** Funcionalidades · Módulos · Para quem é · Planos
- **Botão direita:** "Entrar na Plataforma" → `/login` (estilo filled, azul)
- Navbar com fundo branco, sombra suave ao fazer scroll
- Em mobile: menu hamburguer

---

### SEÇÃO 2 — HERO

**Layout:** Duas colunas — texto à esquerda, mockup do dashboard à direita

**Headline (grande, negrito):**
> "Gerencie pessoas, contratos e ocupação em um só lugar"

**Subtítulo:**
> "O Nexa Gestão é a plataforma de RH e DP feita para empresas que gerenciam equipes em múltiplas unidades. Visibilidade total, decisões mais rápidas, operação sem urgências."

**Botões:**
- CTA principal: "Começar agora" → `/login` (azul, grande)
- CTA secundário: "Ver demonstração" → âncora para a seção de mockup (outline, azul)

**Badge sobre o headline:**
- Pequena pílula com: ✦ "Plataforma completa de RH & DP"

**Lado direito — Mockup animado:**
- Print ou ilustração do dashboard de ocupação (os cards com Jardim América, Águas Claras, etc.)
- Leve animação de float (subir e descer suavemente)
- Sombra pronunciada para dar profundidade

**Background:**
- Gradiente muito suave de branco para `#F0F4FF` (azul quase branco)
- Elementos decorativos geométricos abstratos nos cantos (círculos, pontos em grid)

---

### SEÇÃO 3 — BARRA DE PROVA SOCIAL

Faixa cinza clara com texto centralizado:
> "Confiado por gestoras de RH que administram equipes em Goiás, Brasília e São Paulo"

Seguido de 3 a 4 ícones de cidades ou logos placeholder de empresas parceiras (pode usar ícones genéricos estilizados).

---

### SEÇÃO 4 — O PROBLEMA QUE RESOLVEMOS

**Título:** "Chega de gestão no improviso"

**Layout:** 3 cards lado a lado, cada um com ícone, título e descrição do problema

| Card | Ícone | Título | Descrição |
|---|---|---|---|
| 1 | 🚨 | Contratações na urgência | Você só descobre o déficit quando a operação já está comprometida. Sem visibilidade, não há como planejar. |
| 2 | 📂 | Documentos espalhados | Contratos vencendo, documentos pendentes e histórico de cada prestadora em planilhas e e-mails. |
| 3 | 🔁 | Turnover sem controle | Sem dados de entrada e saída, é impossível entender por que as pessoas saem — e o que fazer para reter. |

**Estilo dos cards:** fundo branco, borda fina vermelha/laranja no topo (indicando problema), sombra suave.

---

### SEÇÃO 5 — A SOLUÇÃO: OS MÓDULOS DA PLATAFORMA

**Título:** "Tudo que sua operação precisa, em um painel só"
**Subtítulo:** "Cada módulo foi pensado para resolver um ponto crítico da gestão de pessoas em campo."

**Layout:** Grid 2x3 de cards de módulos (ou 3x2 em desktop)

| Módulo | Ícone | Título | Descrição |
|---|---|---|---|
| 1 | 📊 | Dashboard de Ocupação | Veja em tempo real o percentual de ocupação de cada unidade. Identifique riscos antes que virem urgências. |
| 2 | 👥 | Gestão de Pessoas | Cadastro completo de todas as prestadoras, histórico de unidades, status e tempo de empresa centralizado. |
| 3 | 🎯 | Recrutamento | Pipeline visual de candidatas por etapa. Do primeiro contato até a contratação, sem perder nenhuma candidata. |
| 4 | 📄 | Contratos & Documentos | Controle de vencimentos, alertas automáticos e histórico de contratos por prestadora. |
| 5 | 💰 | Departamento Pessoal | Controle de pagamentos, recibos e encargos. Tudo organizado por unidade e período. *(Em breve)* |
| 6 | 📈 | Relatórios & BI | Exporte relatórios gerenciais em PDF ou Excel. Evolução mensal, turnover, ocupação e muito mais. |

**Estilo dos cards:**
- Fundo branco com sombra suave
- Ícone em círculo colorido (azul para ativos, cinza para "em breve")
- Badge "Em breve" nos módulos DP e Frequência
- Hover com leve elevação de sombra

---

### SEÇÃO 6 — COMO FUNCIONA (3 PASSOS)

**Título:** "Simples de usar. Poderoso de verdade."

**Layout:** 3 passos em linha com ícone numerado, título e descrição. Conectados por linha ou seta entre eles.

1. **Cadastre suas unidades**
   Configure a capacidade, o mínimo de estabilidade e as prestadoras de cada unidade. Leva menos de 5 minutos.

2. **Acompanhe os indicadores**
   O dashboard atualiza automaticamente o status de cada unidade — saudável, alerta ou risco — com visual claro e intuitivo.

3. **Aja com antecedência**
   Planeje contratações antes da urgência, acompanhe o pipeline de recrutamento e mantenha sua operação estável.

---

### SEÇÃO 7 — MOCKUP EXPANDIDO / DEMONSTRAÇÃO VISUAL

**Título:** "Veja como fica na prática"

**Layout:** Tabs ou carrossel com prints das telas principais:
- Tab 1: **Dashboard de Ocupação** — cards das unidades com barras coloridas
- Tab 2: **Gestão de Pessoas** — tabela de prestadoras
- Tab 3: **Recrutamento** — kanban de pipeline
- Tab 4: **Contratos** — tabela com alertas de vencimento

Cada tab mostra um mockup/screenshot estilizado com sombra pronunciada e fundo levemente colorido.

> **Instrução técnica:** Se não houver prints reais, criar mockups em código (componentes React simplificados) que representem visualmente cada tela. Usar dados reais das unidades já cadastradas.

---

### SEÇÃO 8 — PARA QUEM É O NEXA GESTÃO

**Título:** "Feito para quem gerencia equipes em campo"

**Layout:** 3 perfis lado a lado com ícone de avatar, título e lista de benefícios

**Perfil 1 — Diretora de RH**
- Visão consolidada de todas as unidades
- Indicadores de risco em tempo real
- Relatórios prontos para apresentar à diretoria

**Perfil 2 — Gestora de Unidade**
- Acompanha a ocupação da própria unidade
- Visualiza candidatas no pipeline
- Acessa histórico da equipe

**Perfil 3 — Departamento Pessoal**
- Controla vencimento de contratos
- Organiza documentos por prestadora
- Exporta relatórios de DP *(em breve)*

---

### SEÇÃO 9 — DESTAQUES / NÚMEROS

**Faixa escura** (fundo `#1E293B`, texto branco) com 4 números de destaque centralizados:

| Número | Descrição |
|---|---|
| **5+** | Unidades monitoradas |
| **100%** | Visibilidade operacional |
| **-40%** | Redução de contratações reativas |
| **3 min** | Para identificar unidades em risco |

---

### SEÇÃO 10 — CTA FINAL

**Título:** "Sua operação merece mais do que uma planilha"
**Subtítulo:** "Comece hoje mesmo a usar o Nexa Gestão. É rápido, visual e feito para a realidade do RH operacional."

**Botão central grande:** "Entrar na Plataforma" → `/login`

**Background:** gradiente suave de azul `#2563EB` para azul escuro `#1D4ED8`
**Texto:** branco
**Botão:** branco com texto azul

---

### SEÇÃO 11 — FOOTER

**Layout:** 4 colunas

**Coluna 1 — Marca**
- Logo Nexa Gestão
- "Plataforma de RH & DP para equipes operacionais"
- © 2025 Nexa Gestão. Todos os direitos reservados.

**Coluna 2 — Produto**
- Dashboard de Ocupação
- Gestão de Pessoas
- Recrutamento
- Contratos
- Relatórios

**Coluna 3 — Empresa**
- Sobre
- Contato
- Política de Privacidade
- Termos de Uso

**Coluna 4 — Contato**
- contato@nexagestao.com.br
- Goiânia, GO

**Linha final:** faixa cinza clara com copyright centralizado

---

## IDENTIDADE VISUAL (manter consistente)

| Elemento | Valor |
|---|---|
| Cor primária | `#2563EB` (azul) |
| Cor de sucesso | `#10B981` (verde) |
| Cor de alerta | `#F59E0B` (amarelo) |
| Cor de risco | `#EF4444` (vermelho) |
| Fundo principal | `#FFFFFF` |
| Fundo secundário | `#F8FAFC` |
| Fundo escuro | `#0F172A` |
| Texto principal | `#1E293B` |
| Texto secundário | `#64748B` |
| Fonte | Inter |
| Border radius | `rounded-xl` (cards) / `rounded-full` (badges) |
| Sombra padrão | `shadow-sm` hover `shadow-md` |

---

## DIRETRIZES TÉCNICAS

- **Framework:** React + Tailwind CSS
- **Animações:** Framer Motion para entrada das seções (fade up ao rolar) e float do mockup no hero
- **Scroll suave** entre seções via âncoras
- **Totalmente responsivo:** mobile-first, breakpoints sm / md / lg / xl
- **Performance:** imagens com lazy load, componentes divididos por seção
- **Acessibilidade:** contraste mínimo AA, alt text em imagens, foco visível nos botões

---

## ORDEM DE IMPLEMENTAÇÃO

1. Navbar responsiva com scroll behavior
2. Hero com mockup animado
3. Seção de problema (3 cards)
4. Seção de módulos (grid 2x3)
5. Como funciona (3 passos)
6. Demonstração visual (tabs com mockups)
7. Para quem é (3 perfis)
8. Números de destaque
9. CTA final
10. Footer completo
