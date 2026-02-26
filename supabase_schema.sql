-- SQL schema for Nexa Gestão

-- 1. Unidades
CREATE TABLE IF NOT EXISTS public.unidades (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    cidade TEXT NOT NULL,
    capacidade_maxima INTEGER DEFAULT 0,
    minimo_estabilidade INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Prestadoras (Pessoas)
CREATE TABLE IF NOT EXISTS public.prestadoras (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome_completo TEXT NOT NULL,
    unidade_id UUID REFERENCES public.unidades(id) ON DELETE SET NULL,
    funcao TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Ativa', 'Iniciante', 'Afastada')),
    data_entrada DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Contratos
CREATE TABLE IF NOT EXISTS public.contratos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    prestadora_id UUID REFERENCES public.prestadoras(id) ON DELETE CASCADE,
    tipo TEXT NOT NULL,
    data_vencimento DATE NOT NULL,
    alerta_enviado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Recrutamento
CREATE TABLE IF NOT EXISTS public.recrutamento (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome_candidata TEXT NOT NULL,
    vaga_unidade_id UUID REFERENCES public.unidades(id) ON DELETE CASCADE,
    etapa TEXT NOT NULL CHECK (etapa IN ('Triagem', 'Entrevista', 'Aprovadas', 'Integração', 'Contratadas')),
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security) and add basic policies
ALTER TABLE public.unidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prestadoras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contratos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recrutamento ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for now" ON public.unidades FOR SELECT USING (true);
CREATE POLICY "Allow public read access for now" ON public.prestadoras FOR SELECT USING (true);
CREATE POLICY "Allow public read access for now" ON public.contratos FOR SELECT USING (true);
CREATE POLICY "Allow public read access for now" ON public.recrutamento FOR SELECT USING (true);

-- Allow inserts/updates as well during development phase
CREATE POLICY "Allow anon insert" ON public.unidades FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert" ON public.prestadoras FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert" ON public.contratos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert" ON public.recrutamento FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon update" ON public.unidades FOR UPDATE USING (true);
CREATE POLICY "Allow anon update" ON public.prestadoras FOR UPDATE USING (true);
CREATE POLICY "Allow anon update" ON public.contratos FOR UPDATE USING (true);
CREATE POLICY "Allow anon update" ON public.recrutamento FOR UPDATE USING (true);
