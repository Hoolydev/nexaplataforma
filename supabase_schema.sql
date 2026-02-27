-- SQL schema for Nexa Gestão

-- 0. Profiles (Usuarios)
-- Vinculado à tabela auth.users do Supabase
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    nome TEXT,
    email TEXT,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger para criar profile automaticamente (opcional, mas recomendado)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nome)
  VALUES (new.id, new.email, split_part(new.email, '@', 1));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger se existir para evitar erro ao rodar multiplas vezes
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 1. Unidades (Correspondendo exatamente à interface Unit do Dashboard.tsx)
CREATE TABLE IF NOT EXISTS public.units (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    cidade TEXT NOT NULL,
    prestadoras INTEGER DEFAULT 0,
    iniciantes INTEGER DEFAULT 0,
    minimo INTEGER DEFAULT NULL,
    capacidade INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Prestadoras (Pessoas)
CREATE TABLE IF NOT EXISTS public.prestadoras (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome_completo TEXT NOT NULL,
    unidade_id UUID REFERENCES public.units(id) ON DELETE SET NULL,
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
    vaga_unidade_id UUID REFERENCES public.units(id) ON DELETE CASCADE,
    etapa TEXT NOT NULL CHECK (etapa IN ('Triagem', 'Entrevista', 'Aprovadas', 'Integração', 'Contratadas')),
    canal_origem TEXT,
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Financeiro RH (Inteligência)
CREATE TABLE IF NOT EXISTS public.custos_investimento_rh (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    canal TEXT NOT NULL,
    mes_ano TEXT NOT NULL, -- ex: '2025-02'
    valor NUMERIC(10, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(canal, mes_ano)
);

-- Habilitar RLS e criar políticas abertas para desenvolvimento inicial
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prestadoras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contratos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recrutamento ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custos_investimento_rh ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all access" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access" ON public.units FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access" ON public.prestadoras FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access" ON public.contratos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access" ON public.recrutamento FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access" ON public.custos_investimento_rh FOR ALL USING (true) WITH CHECK (true);

-- Dados mockados iniciais para a tabela units (necessário para o Dashboard não ficar vazio)
INSERT INTO public.units (nome, cidade, prestadoras, iniciantes, minimo, capacidade)
VALUES 
    ('Jardim América', 'Goiânia', 16, 2, 12, 18),
    ('Águas Claras', 'Brasília', 17, 0, 15, 20),
    ('Moema', 'São Paulo', 8, 1, 10, 15),
    ('Garavelo', 'Aparecida de Goiânia', 4, 0, 5, 8),
    ('Setor 44', 'Goiânia', 4, 0, 3, 6)
ON CONFLICT DO NOTHING;

