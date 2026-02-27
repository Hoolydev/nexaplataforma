const url = "https://qjuohlwlkflehkbbpprg.supabase.co/rest/v1/units?select=*";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdW9obHdsa2ZsZWhrYmJwcHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMzk1MjcsImV4cCI6MjA4NzcxNTUyN30.sjybpCYx_YChdw4UsrqcxwFes1t5uY1-F4dMnV28ir8";

async function run() {
    const res = await fetch(url, {
        headers: {
            "apikey": key,
            "Authorization": "Bearer " + key
        }
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
}

run();
