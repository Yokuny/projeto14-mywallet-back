import express from "express";
import dotenv from "dotenv";
import Joi from "joi";
import dbConnection from "./scripts/dbConnection.js";

const app = express();
app.use(express.json());
dotenv.config();
const db = await dbConnection();

app.post("/cadastro", (req, res) => {
  const { email, password } = req.body;
  // password no mínimo três caracteres. Caso não status 422 (Unprocessable Entity) mensagem explicando.
  // email deve estar no formato correto. 422 (Unprocessable Entity) mensagem explicando o erro.
  // se e-mail cadastrado, retornar status code 409 (Conflict) mensagem explicando o erro.
  // campos não presente ou inválido, retornar `422 (Unprocessable Entity)`mensagem explicando.
  // caso de sucesso, a requisição deve retornar status `201 (Created)`.
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
