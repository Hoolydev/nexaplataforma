import fs from 'fs';
const url = "https://qjuohlwlkflehkbbpprg.supabase.co/rest/v1/";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdW9obHdsa2ZsZWhrYmJwcHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMzk1MjcsImV4cCI6MjA4NzcxNTUyN30.sjybpCYx_YChdw4UsrqcxwFes1t5uY1-F4dMnV28ir8";

async function run() {
    const res = await fetch(url + "?apikey=" + key, {
        headers: {
            "Authorization": "Bearer " + key,
        }
    });
    const data = await res.json();
    fs.writeFileSync('test_openapi.json', JSON.stringify(data.definitions.prestadoras, null, 2));
}

run();
