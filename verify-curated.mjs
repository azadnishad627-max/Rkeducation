import https from 'https';

const models = [
  { id: "06c34533b4f441569bfa207aff7c8a19", name: "Plant Cell (पादप कोशिका)" },
  { id: "abaa9a651c834cdaa67072b32fb0024f", name: "Animal Cell (जंतु कोशिका)" },
  { id: "60e95170b37549e3b45ee490b74bb112", name: "DNA Double Helix (डीएनए)" },
  { id: "81acdfb6457b471c9aa355f1925fe2b9", name: "Coronavirus Structure (वायरस)" },
  { id: "20e930a5fae5457fa6d1738afa00c7bb", name: "Neuron (तंत्रिका कोशिका)" },
  { id: "a9c83e6af504463aa354e3b7e1b21c53", name: "Microscope (सूक्ष्मदर्शी)" },
  { id: "9b0b079953b840bc9a13f524b60041e4", name: "Full Human Body Anatomy (मानव शरीर व अंग)" },
  { id: "6a7a537a71444f6e8201e18a685a013d", name: "Human Circulatory System (हृदय व रक्त संचार)" },
  { id: "4de7b96a351a4a35b1b6e5415277ff07", name: "Human Skeleton (कंकाल तंत्र)" },
  { id: "d6521362b37b48e3a82bce4911409303", name: "Solar System Planets (सौरमंडल व ग्रह)" },
  { id: "b716c2b71310439897d3f81602f6c799", name: "Atomic Orbitals (परमाणु कक्षक)" },
  { id: "33b17ccc603944a8a1079fe89957ba71", name: "Taj Mahal & World Monuments (ताजमहल)" }
];

async function verifyAll() {
  console.log("Verifying 100% Active Embed Status for all curated models:");
  let allPass = true;
  for (const m of models) {
    const status = await new Promise((res) => {
      https.get(`https://sketchfab.com/models/${m.id}/embed`, (r) => res(r.statusCode)).on('error', () => res('ERR'));
    });
    console.log(`[${status}] ${m.name} -> ID: ${m.id}`);
    if (status !== 200) allPass = false;
  }
  console.log(`\nALL MODELS VERIFIED HTTP 200: ${allPass ? "YES! 100% READY" : "FAILED"}`);
}

verifyAll();
