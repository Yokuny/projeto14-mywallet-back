import { db } from "../database/database.connection.js";

export const getHome = async (req, res) => {
  const { token } = req.headers;
  try {
    const findingTonken = await db.collection("users").findOne({ token });
    if (!findingTonken) {
      return res.status(401).send({ message: "Invalid token" });
    }
    const { transactions } = findingTonken;
    return res.status(200).send(transactions);
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const postNovaTransacao = async (req, res) => {
  const { descricao, valor, data, tipo } = req.body;
  const { token } = req.headers;
  try {
    const findingTonken = await db.collection("users").findOne({ token });
    if (!findingTonken) {
      return res.status(401).send({ message: "Invalid token" });
    }
    const { _id } = findingTonken;
    const newTransaction = {
      descricao,
      valor,
      data,
      tipo,
    };
    await db.collection("users").updateOne({ _id }, { $push: { transactions: newTransaction } });
    return res.status(201).send({ message: "Transaction registered successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
