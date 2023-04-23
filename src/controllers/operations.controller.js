import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export const getHome = async (req, res) => {
  const { _id, nome } = res.locals.session;
  console.log("get Home");
  try {
    const idHash = _id.toString();
    const transacoes = await db.collection("transaction").find({ idHash: idHash, nome: nome }).toArray();
    return res.status(200).send({ transacoes, nome });
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const postNovaTransacao = async (req, res) => {
  console.log("post transacao");

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
