import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export const getHome = async (req, res) => {
  const { _id, nome } = res.locals.session;

  try {
    const idHash = _id.toString();
    const transacoes = await db.collection("transaction").find({ idHash: idHash, nome: nome }).toArray();
    return res.status(200).send({ transacoes, nome });
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const postNovaTransacao = async (req, res) => {
  const { _id, nome } = res.locals.session;
  const { descricao, valor } = req.body;
  const { tipo } = req.params;

  if ((tipo !== "entrada" && tipo !== "saida") || !tipo)
    return res.status(400).send({ message: "Invalid transaction type" });

  const idHash = _id.toString();
  const data = dayjs().format("DD/MM");
  try {
    const newTransaction = {
      idHash,
      nome,
      descricao,
      valor,
      data,
      tipo,
    };
    await db.collection("transaction").insertOne(newTransaction);
    return res.status(201).send({ message: "Transaction registered successfully" });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

export const deleteTransacao = async (req, res) => {
  const { id } = req.params;
  const { _id } = res.locals.session;

  const objectId = new ObjectId(id);
  const idHash = _id.toString();
  try {
    const checagem = await db.collection("transaction").deleteOne({ idHash: idHash, _id: objectId });
    if (checagem.deletedCount === 0) return res.status(404).send({ message: "Transaction not found" });
    return res.status(200).send({ message: "Transaction deleted successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};