import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile("views/index.html", {
    root: __dirname,
  });
});

app.get("/index", (req, res) => {
  res.sendFile("views/index.html", {
    root: __dirname,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
