import https from 'https';

const testIds = [
  // Known working from edtechpro
  { id: "06c34533b4f441569bfa207aff7c8a19", name: "Plant Cell" },
  { id: "abaa9a651c834cdaa67072b32fb0024f", name: "Animal Cell" },
  { id: "60e95170b37549e3b45ee490b74bb112", name: "DNA" },
  { id: "81acdfb6457b471c9aa355f1925fe2b9", name: "Coronavirus" },
  { id: "20e930a5fae5457fa6d1738afa00c7bb", name: "Neuron" },
  { id: "a9c83e6af504463aa354e3b7e1b21c53", name: "Microscope" },

  // Candidates for other subjects
  { id: "8997c415518b4566b74e17efee1476b7", name: "Heart 1" },
  { id: "629d68ecfa904620a22026ae11c8aa9f", name: "Heart 2" },
  { id: "776e01a88b5042858b9f7a75fa7645f0", name: "Lungs" },
  { id: "3db79815049544c0b2d6ffb4802c67c5", name: "Brain" },
  { id: "d67975bf847648358ea07cf64b8fb177", name: "Solar System" },
  { id: "a1a8c3d9b4be461f8a846c434914101e", name: "Earth" },
  { id: "ea9ea135a9fa43a4911d88bbd6dcf20d", name: "Volcano" },
  { id: "14a09eb8b50244799008bc0a2b535d55", name: "Atom" },
  { id: "0585f6755490412ea2c3664d42b4fe87", name: "Taj Mahal" },
  { id: "0cebbfcf13054173872195f1f72782b7", name: "Qutub Minar" }
];

async function check(item) {
  return new Promise((resolve) => {
    const url = `https://sketchfab.com/models/${item.id}/embed`;
    https.get(url, (res) => {
      resolve({ ...item, status: res.statusCode });
    }).on('error', () => {
      resolve({ ...item, status: 'ERROR' });
    });
  });
}

async function searchAndFind(query) {
  return new Promise((resolve) => {
    const url = `https://api.sketchfab.com/v3/search?type=models&q=${encodeURIComponent(query)}&sort_by=-likeCount`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const top = (json.results || []).slice(0, 3).map(r => ({ uid: r.uid, name: r.name }));
          resolve({ query, top });
        } catch (e) {
          resolve({ query, top: [] });
        }
      });
    }).on('error', () => resolve({ query, top: [] }));
  });
}

async function run() {
  console.log("Checking candidate IDs...");
  for (const item of testIds) {
    const res = await check(item);
    console.log(`${item.name} (${item.id}): Status ${res.status}`);
  }

  console.log("\nSearching top active models from Sketchfab API...");
  const queries = ["human brain", "human heart", "human lungs", "earth interior", "solar system", "volcano", "atom model", "taj mahal", "human skeleton", "human eye"];
  for (const q of queries) {
    const searchRes = await searchAndFind(q);
    console.log(`\nQuery: ${q}`);
    for (const model of searchRes.top) {
      const statusRes = await check({ id: model.uid, name: model.name });
      console.log(`  -> ${model.name} [${model.uid}] status: ${statusRes.status}`);
    }
  }
}

run();
