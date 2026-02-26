# Prompt para Antigravity — Nexa Gestão

---

## INSTRUÇÃO PRINCIPAL

Crie um produto web completo chamado **Nexa Gestão**, uma plataforma de gestão de ocupação de unidades para uma empresa de RH. O produto deve ter duas áreas: uma **Landing Page pública** e uma **área interna autenticada com o Dashboard de Ocupação**.

---

## IDENTIDADE VISUAL

- **Nome do produto:** Nexa Gestão
- **Cor primária:** Azul `#2563EB`
- **Cor de sucesso (saudável):** Verde `#10B981`
- **Cor de alerta:** Amarelo `#F59E0B`
- **Cor de risco:** Vermelho `#EF4444`
- **Fundo:** Branco `#FFFFFF` e cinza claro `#F8FAFC`
- **Tipografia:** Inter ou similar, moderna e clean
- **Estilo:** Profissional, minimalista, SaaS B2B

---

## PÁGINA 1 — LANDING PAGE (PÚBLICA)

### Hero Section
- **Headline:** "Gestão de equipes com visão estratégica"
- **Subtítulo:** "Monitore o nível de ocupação de cada unidade em tempo real. Antecipe riscos, planeje contratações e mantenha sua operação sempre estável."
- **Botão CTA principal:** "Entrar na Plataforma" → redireciona para a tela de Login
- Background com gradiente suave azul ou imagem abstrata corporativa

### Seção de Benefícios (3 cards)
1. 🎯 **Visão em tempo real** — Acompanhe o percentual de ocupação de cada unidade com indicadores visuais claros
2. ⚡ **Antecipe riscos** — Identifique unidades em alerta ou risco antes que a operação seja impactada
3. 📊 **Planejamento estratégico** — Priorize contratações com base em dados, não por urgência

### Seção Como Funciona (3 passos)
1. Cadastre suas unidades com capacidade e mínimo de estabilidade
2. Atualize o número de prestadoras ativas
3. Visualize o status de saúde de cada unidade em segundos

### Footer
- Logo "Nexa Gestão" + tagline "Gestão inteligente de pessoas"
- Copyright 2025

---

## PÁGINA 2 — LOGIN

- Campo de **e-mail** e **senha**
- Botão "Entrar"
- Link "Esqueci minha senha" (pode ser placeholder por enquanto)
- Layout centralizado, card branco com sombra suave sobre fundo azul
- Validação básica dos campos (não pode estar vazio)
- **Para o MVP:** usar credenciais fixas ou autenticação simples (ex: email `admin@nexagestao.com`, senha `nexa2025`)
- Após login bem-sucedido → redirecionar para o Dashboard

---

## PÁGINA 3 — DASHBOARD DE OCUPAÇÃO (ÁREA INTERNA)

### Header interno
- Logo "Nexa Gestão" à esquerda
- Nome do usuário logado à direita + botão "Sair"

### Barra de Resumo (cards de KPI no topo)
Exibir 4 cards de resumo:
1. **Total de Unidades:** 5
2. **Unidades Saudáveis:** calculado automaticamente
3. **Unidades em Alerta:** calculado automaticamente
4. **Unidades em Risco:** calculado automaticamente

### Cards de Unidade (grid responsivo, 2-3 colunas)

Para cada unidade, exibir um card com:
- **Nome da unidade** (em destaque)
- **Cidade/Estado**
- **Prestadoras ativas** (número grande)
- **Iniciantes** (badge secundário, ex: "1 iniciante")
- **Mínimo de estabilidade** (quando definido)
- **Capacidade total**
- **Barra de progresso — % do Mínimo** (verde/amarelo/vermelho conforme percentual)
- **Barra de progresso — % da Capacidade** (azul)
- **Badge de status** no canto superior direito do card

### Lógica de cálculo (obrigatório implementar):

```
% do Mínimo = (Prestadoras / Mínimo) × 100
% da Capacidade = (Prestadoras / Capacidade) × 100

Status:
- SE % do Mínimo >= 100% → SAUDÁVEL (verde)
- SE % do Mínimo entre 80% e 99% → ALERTA (amarelo)
- SE % do Mínimo < 80% → RISCO (vermelho)

Quando o campo "mínimo" não estiver definido:
- Usar a capacidade como referência de estabilidade
```

### Tabela Consolidada (abaixo dos cards)
Exibir tabela com todas as unidades e colunas:
`Unidade | Cidade | Prestadoras | Iniciantes | Mínimo | Capacidade | % Mínimo | % Capacidade | Status`

### Botão flutuante ou link
"+ Editar dados da unidade" → abre modal para atualizar número de prestadoras (mínimo necessário para o MVP)

---

## DADOS INICIAIS DAS UNIDADES

Pré-popular o sistema com os seguintes dados:

| Unidade | Cidade | Prestadoras | Iniciantes | Mínimo | Capacidade |
|---|---|---|---|---|---|
| Jardim América | Goiânia – GO | 16 | 1 | 23 | 30 |
| Águas Claras | Brasília – DF | 17 | 1 | (não definido) | 25 |
| Moema | São Paulo – SP | 8 | 0 | 10 | 15 |
| Garavelo | Aparecida de Goiânia – GO | 4 | 0 | (não definido) | 4 |
| Setor 44 | Goiânia – GO | 4 | 0 | (não definido) | 4 |

---

## COMPORTAMENTO ESPERADO DOS STATUS (com os dados acima)

| Unidade | % Mínimo | Status |
|---|---|---|
| Jardim América | 69% (16/23) | 🔴 RISCO |
| Águas Claras | 68% (17/25 sem mínimo) | 🔴 RISCO |
| Moema | 80% (8/10) | 🟡 ALERTA |
| Garavelo | 100% (4/4) | 🟢 SAUDÁVEL |
| Setor 44 | 100% (4/4) | 🟢 SAUDÁVEL |

---

## REQUISITOS TÉCNICOS

- **Stack sugerida:** React + Tailwind CSS + shadcn/ui
- **Roteamento:** React Router (/ para LP, /login para login, /dashboard para painel)
- **Estado:** useState/useContext para dados das unidades
- **Dados:** podem ser hardcoded no MVP, com possibilidade de edição em memória
- **Responsivo:** funcionar bem em mobile e desktop
- **Sem backend obrigatório no MVP:** dados em memória ou localStorage

---

## FLUXO DE NAVEGAÇÃO

```
/ (Landing Page)
    └── "Entrar na Plataforma" → /login
            └── Login com sucesso → /dashboard
                    └── Sair → /login
```

---

## OBSERVAÇÕES FINAIS

- O produto deve passar a sensação de uma ferramenta profissional de SaaS
- Os cards de unidade são o elemento mais importante — devem ser visualmente impactantes com as cores de status bem evidentes
- As barras de progresso devem ter animação suave ao carregar
- O dashboard deve funcionar bem mesmo em telas menores (tablets)
- Mantenha o código limpo e componentizado para facilitar futuras expansões
