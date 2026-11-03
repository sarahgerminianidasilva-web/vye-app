/* Gera cal/<calToken>.ics para cada aluno (não usado no app hoje).
   Uso: node build/cal-ics.js alunos.json   — alunos.json: [[nome, calToken, [dias], "HH:MM", {feriadosLocais}?], ...] */
const fs = require("fs"), path = require("path");
global.window = {}; global.document = { addEventListener() {} };
require(path.join(__dirname, "..", "cal.js"));
const list = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const out = path.join(__dirname, "..", "cal");
fs.mkdirSync(out, { recursive: true });
for (const [name, tok, days, time, local] of list) {
  fs.writeFileSync(path.join(out, tok + ".ics"), window.VYECal.ics({ days, time, name, local: local || {}, year: 2027 }));
  console.log(tok);
}
