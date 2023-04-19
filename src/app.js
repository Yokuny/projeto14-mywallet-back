import express from "express";
import dotenv from "dotenv";
import dbConnection from "./scripts/dbConnection.js";

import postCadastro from "./routes/postCadastro.js";
import postLogin from "./routes/postLogin.js";
import postNovaTransacao from "./routes/postNovaTransacao.js";
import getHome from "./routes/getHome.js";

const app = express();
app.use(express.json());
dotenv.config();
const db = await dbConnection();

app.post("/cadastro", postCadastro(req, res, db));
app.post("/login", postLogin(req, res, db));
app.post("/nova-transacao/:tipo", postNovaTransacao(req, res, db));
app.get("/home", getHome(req, res, db));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
