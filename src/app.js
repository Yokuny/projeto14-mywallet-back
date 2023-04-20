import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./scripts/dbConnection.js";

import postCadastro from "./routes/postCadastro.js";
import postLogin from "./routes/postLogin.js";
import postNovaTransacao from "./routes/postNovaTransacao.js";
import getHome from "./routes/getHome.js";

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
const db = await dbConnection();

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.post("/cadastro", (req, res) => postCadastro(req, res, db));
app.post("/login", (req, res) => postLogin(req, res, db));
app.post("/nova-transacao/:tipo", (req, res) => postNovaTransacao(req, res, db));
app.get("/home", (req, res) => getHome(req, res, db));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
