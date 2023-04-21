import { db } from "../database/database.connection.js";
import { v4 as newToken } from "uuid";
import bcrypt from "bcrypt";

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const record = await db.collection("users").findOne({ email });
    if (!record) {
      return res.status(404).send({ message: "Email not registered" });
    }
    if (bcrypt.compareSync(password, record.password)) {
      const token = newToken();
      return res.status(200).send(token);
    }
    return res.status(401).send({ message: "Invalid password" });
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
export const postCadastro = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const Registered = await db.collection("users").findOne({ email });
    if (Registered) {
      return res.status(409).send({ message: "Email already registered" });
    }
    const crypPass = bcrypt.hashSync(password, 10);
    await db.collection("users").insertOne({ name, email, password: crypPass });
    return res.status(201).send({ message: "Registered successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
