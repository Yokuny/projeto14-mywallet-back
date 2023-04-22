import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export const getHome = async (req, res) => {
  const { _id, name } = res.locals.session;
  try {
    const idHash = _id.toString();
    const transactions = await db.collection("transaction").find({ idHash: idHash, name: name }).toArray();
    console.log(">> fez busca de Transações return { transactions, name }");
    console.log(transactions);
    return res.status(200).send({ transactions, name });
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const postNovaTransacao = async (req, res) => {
  const { _id, name } = res.locals.session;
  const { descricao, valor } = req.body;
  console.log("> nova transação");

  const { tipo } = req.params;
  if ((tipo !== "entrada" && tipo !== "saida") || !tipo)
    return res.status(400).send({ message: "Invalid transaction type" });
  console.log(">> nova transação");
  const idHash = _id.toString();
  const data = dayjs().format("DD/MM");
  try {
    const newTransaction = {
      idHash,
      name,
      descricao,
      valor,
      data,
      tipo,
    };
    await db.collection("transaction").insertOne(newTransaction);
    console.log(">>> registrou");

    return res.status(201).send({ message: "Transaction registered successfully" });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
