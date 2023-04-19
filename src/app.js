import express from "express";
import dotenv from "dotenv";
import Joi from "joi";
import { v4 as newToken } from "uuid";
import dbConnection from "./scripts/dbConnection.js";

const app = express();
app.use(express.json());
dotenv.config();
const db = await dbConnection();

const cadastradoSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});
const transationSchema = Joi.object({
  descricao: Joi.string().required(),
  valor: Joi.number().required(),
  data: Joi.string().required(),
  token: Joi.string().required(),
});

app.post("/cadastro", async (req, res) => {
  const { email, password } = req.body;
  const getError = cadastradoSchema.validate({ email, password }, { abortEarly: false });
  if (getError.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  try {
    const Registered = await db.collection("users").findOne({ email });
    if (Registered) {
      return res.status(409).send("Email already registered");
    }
    await db.collection("users").insertOne({ email, password });
    return res.status(201).send("Registered successfully");
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const getError = cadastradoSchema.validate({ email, password }, { abortEarly: false });
  if (getError.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  try {
    const record = await db.collection("users").findOne({ email });
    if (!record) {
      return res.status(404).send("Email not registered");
    }
    if (record.password !== password) {
      return res.status(401).send("Invalid password");
    }
    const token = newToken();
    return res.status(200).send(token);
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
});

app.post("/nova-transacao/:tipo", async (req, res) => {
  const { tipo } = req.params;
  const { descricao, valor, data, token } = req.body;

  const getError = transationSchema.validate({ descricao, valor, data, token }, { abortEarly: false });
  if (getError.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  try {
    const findingTonken = await db.collection("users").findOne({ token });
    if (!findingTonken) {
      return res.status(401).send("Invalid token");
    }
    const { _id } = findingTonken;
    const newTransaction = {
      descricao,
      valor,
      data,
      tipo,
    };
    await db.collection("users").updateOne({ _id }, { $push: { transactions: newTransaction } });
    return res.status(201).send("Transaction registered successfully");
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
});

app.get("/home", async (req, res) => {
    

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
