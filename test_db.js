import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.log('Missing env variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
    console.log('Fetching units...')
    const { data: units, error: err1 } = await supabase.from('units').select('*')
    console.log('Units:', units)

    if (err1) {
        console.error('Units error:', err1)
    }

    console.log('Fetching prestadoras...')
    const { data: prestadoras, error: err2 } = await supabase.from('prestadoras').select('*')
    console.log('Prestadoras:', prestadoras)

    if (err2) {
        console.error('Prestadoras error:', err2)
    }
}

test()
