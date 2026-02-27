import fs from 'fs';
import https from 'https';

const url = "https://i.postimg.cc/3rpZJZJH/Chat-GPT-Image-26-de-fev-de-2026-23-20-33.png";
const dest = "c:/Users/silfr/Documents/Projetos/Nexa gestao/public/nexa-icon.png";

https.get(url, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Failed to get image: ${res.statusCode}`);
        return;
    }
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('Image downloaded and saved successfully.');
    });
}).on('error', (err) => {
    console.error('Error downloading image: ', err.message);
});
