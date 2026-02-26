# NEXA GESTÃO
## Product Requirements Document (PRD)
**Versão 1.0 · Fevereiro 2025 · Confidencial**

---

## 1. Visão Geral do Produto

O Nexa Gestão é uma plataforma web de gestão estratégica de ocupação de equipes para empresas de RH. O produto centraliza o monitoramento de prestadoras de serviço por unidade, transformando dados operacionais em indicadores visuais de saúde organizacional. Através de um dashboard intuitivo, gestores acompanham em tempo real se cada unidade está saudável, em alerta ou em risco — e agem de forma proativa, antes que a ausência de mão de obra vire urgência.

---

## 2. Problema a Resolver

Empresas de RH que gerenciam múltiplas unidades de prestação de serviço sofrem com contratações reativas: só percebem o déficit de mão de obra quando a operação já está comprometida. Não há visibilidade clara do percentual de ocupação por unidade, nem de quais estão próximas do colapso operacional. O resultado são urgências constantes, custos elevados de contratação emergencial e equipes sobrecarregadas.

---

## 3. Objetivos do Produto

- Transformar dados de ocupação em indicadores de gestão claros e acionáveis
- Antecipar riscos operacionais antes que se tornem urgências
- Priorizar contratações com base em dados, não por pressão imediata
- Apoiar estratégias de retenção com visibilidade sobre estabilidade das equipes
- Fornecer visão consolidada de todas as unidades em um único painel

---

## 4. Usuários-Alvo

| Perfil | Descrição |
|---|---|
| **Usuário principal** | Gestora/Diretora de RH com acesso ao dashboard completo |
| **Usuário secundário** | Gestores de unidade — acesso individual à própria unidade (fase futura) |

---

## 5. Estrutura e Páginas do Produto

### 5.1 Landing Page (Pública)

A Landing Page é a vitrine do Nexa Gestão. Deve transmitir profissionalismo, clareza e propósito.

**Componentes obrigatórios:**
- **Hero Section:** headline impactante, subtítulo explicativo, botão CTA "Entrar na Plataforma"
- **Seção de Benefícios:** 3 a 4 cards com os principais diferenciais do produto
- **Seção Como Funciona:** passo a passo visual (3 etapas)
- **Seção de Depoimento ou Caso de Uso** (futuro)
- **Footer** com informações de contato e copyright

> **Design:** Paleta azul (`#2563EB`) e verde (`#10B981`). Tipografia moderna. Layout responsivo (mobile-first).

---

### 5.2 Tela de Login

Acesso controlado por e-mail e senha. Deve incluir validação de campos, mensagem de erro amigável e opção "Esqueci minha senha" (fluxo futuro). Após autenticação, redirecionar para o Dashboard.

---

### 5.3 Dashboard — Painel de Ocupação

Coração do produto. Exibe o indicador de ocupação de todas as unidades em cards visuais com código de cores e percentuais.

#### Lógica de Cálculo

Cada unidade possui três variáveis:

- **Prestadoras ativas:** número atual de colaboradoras em operação
- **Mínimo de estabilidade:** quantidade mínima para operação segura (quando definido)
- **Capacidade total:** estrutura máxima da unidade

Com base nessas variáveis, o sistema calcula dois percentuais:

```
% do Mínimo    = (Prestadoras ÷ Mínimo) × 100
% da Capacidade = (Prestadoras ÷ Capacidade) × 100
```

#### Classificação de Status

| Status | Cor | Critério |
|---|---|---|
| 🟢 **Saudável** | Verde `#10B981` | % do Mínimo ≥ 100% |
| 🟡 **Alerta** | Amarelo `#F59E0B` | % do Mínimo entre 80% e 99% |
| 🔴 **Risco** | Vermelho `#EF4444` | % do Mínimo < 80% |

> Quando o mínimo não estiver definido, o cálculo usa a **capacidade total** como referência de estabilidade.

#### Componentes do Dashboard

- **Barra de resumo superior:** total de unidades, unidades em risco, alertas ativos
- **Cards por unidade:** nome, local, prestadoras ativas, iniciantes, mínimo, capacidade, barras de progresso coloridas e badge de status
- **Tabela consolidada:** visão tabular com ordenação por status ou percentual
- **Filtro por cidade ou status** (futuro)

---

## 6. Dados Iniciais das Unidades

| Unidade | Prestadoras | Iniciantes | Mínimo | Capacidade | % Mínimo | % Capacidade | Status |
|---|:---:|:---:|:---:|:---:|:---:|:---:|---|
| Jardim América – Goiânia | 16 | 1 | 23 | 30 | 69% | 53% | 🔴 Risco |
| Águas Claras – Brasília | 17 | 1 | — | 25 | — | 68% | 🔴 Risco |
| Moema – São Paulo | 8 | 0 | 10 | 15 | 80% | 53% | 🟡 Alerta |
| Garavelo – Ap. de Goiânia | 4 | 0 | — | 4 | — | 100% | 🟢 Saudável |
| Setor 44 – Goiânia | 4 | 0 | — | 4 | — | 100% | 🟢 Saudável |

> *Unidades sem mínimo definido usam a capacidade como referência de estabilidade.*

---

## 7. Regras de Negócio

- Prestadoras iniciantes são contadas no total de ativas, mas sinalizadas separadamente no card
- O status é calculado automaticamente com base nos percentuais definidos na seção 5.3
- Quando o campo "mínimo" não está preenchido, o sistema usa a capacidade como benchmark
- Todos os dados devem ser editáveis pelo gestor via interface (CRUD de unidades)
- O sistema não deve permitir que o número de prestadoras ultrapasse a capacidade total

---

## 8. Requisitos Técnicos

### Frontend
- **Framework:** React com Tailwind CSS
- **Componentização:** cards, barras de progresso, badges de status, tabelas
- **Responsividade:** suporte a mobile, tablet e desktop
- **Autenticação:** JWT ou Firebase Auth

### Backend / Dados
- **Banco de dados:** Supabase ou Firebase Firestore
- **API REST** para CRUD de unidades e dados de ocupação
- **Autenticação segura** com controle de sessão
- **Estrutura de dados:** `id | nome | cidade | prestadoras | iniciantes | minimo | capacidade | updated_at`

### Hospedagem
- **Frontend:** Vercel ou Netlify
- **Backend:** Supabase (BaaS) ou Railway

---

## 9. Fases de Entrega

| Fase | Nome | Escopo |
|---|---|---|
| **Fase 1** | MVP | Landing page, login, dashboard com dados estáticos das 5 unidades, cálculo de percentuais e status automático |
| **Fase 2** | Gestão de Dados | CRUD completo de unidades, edição de prestadoras/mínimo/capacidade em tempo real |
| **Fase 3** | Relatórios | Histórico de ocupação, evolução mensal por unidade, exportação em PDF/Excel |
| **Fase 4** | Multiusuário | Perfis de acesso por unidade, painel do gestor local, notificações de alerta |

---

## 10. Critérios de Sucesso

- Gestor consegue identificar unidades em risco em menos de 10 segundos ao abrir o dashboard
- Dados de ocupação atualizados refletem status correto instantaneamente
- Taxa de contratações reativas (urgências) reduzida em 40% em 90 dias de uso
- 100% das unidades com status classificado e visível na tela principal

---

## 11. Fora do Escopo (MVP)

- Integração com sistemas de folha de pagamento
- Módulo de recrutamento e seleção
- Aplicativo mobile nativo
- Gestão de escala ou ponto eletrônico

---

## 12. Glossário

| Termo | Definição |
|---|---|
| **Prestadora** | Colaboradora ativa na unidade (inclui iniciantes) |
| **Iniciante** | Prestadora em período de treinamento ou adaptação |
| **Mínimo de Estabilidade** | Quantidade mínima para operação segura e sem sobrecarga |
| **Capacidade Total** | Número máximo de prestadoras que a unidade comporta |
| **Status Saudável** | Unidade operando no mínimo ou acima — sem risco imediato |
| **Status Alerta** | Unidade entre 80–99% do mínimo — requer atenção |
| **Status Risco** | Unidade abaixo de 80% do mínimo — ação urgente necessária |

---

*Nexa Gestão © 2025 · Confidencial*
