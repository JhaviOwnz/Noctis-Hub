// import-oes.js
const fs = require("fs");

async function run() {
  // 1) Put your giant JSON into a file called oes-seed.json (see step below)
  const data = JSON.parse(fs.readFileSync("./oes-seed.json", "utf-8"));

  for (const section of data) {
    console.log(`Importing: ${section.name} (${section.key})...`);

  const res = await fetch("http://127.0.0.1:4000/api/oes/save-section", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(section),
});


    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Failed for ${section.key}: ${res.status} ${txt}`);
    }
  }

  console.log("✅ Done. All categories imported.");
}

run().catch((e) => {
  console.error("❌ Import failed:", e);
  process.exit(1);
});
