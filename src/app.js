import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default app;
