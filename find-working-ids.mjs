import https from 'https';

async function check(id) {
  return new Promise((resolve) => {
    const url = `https://sketchfab.com/models/${id}/embed`;
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

async function searchFirstWorking(query) {
  return new Promise((resolve) => {
    const url = `https://api.sketchfab.com/v3/search?type=models&q=${encodeURIComponent(query)}&sort_by=-likeCount`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          const results = json.results || [];
          for (const item of results.slice(0, 10)) {
            const isOk = await check(item.uid);
            if (isOk) {
              resolve({ query, uid: item.uid, name: item.name });
              return;
            }
          }
          resolve({ query, uid: null, name: null });
        } catch (e) {
          resolve({ query, uid: null, name: null });
        }
      });
    }).on('error', () => resolve({ query, uid: null, name: null }));
  });
}

async function main() {
  const topics = [
    "plant cell",
    "animal cell",
    "dna",
    "coronavirus",
    "neuron",
    "microscope",
    "human brain",
    "human heart",
    "human skeleton",
    "human eye",
    "human body anatomy",
    "solar system planets",
    "planet earth",
    "volcano",
    "the moon",
    "atom electron",
    "water molecule",
    "taj mahal"
  ];

  for (const t of topics) {
    const res = await searchFirstWorking(t);
    console.log(`TOPIC: "${t}" -> UID: "${res.uid}" | Name: "${res.name}"`);
  }
}

main();
