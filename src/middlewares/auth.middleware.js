import { db } from "../database/database.connection.js";

const authValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  console.log("> entrou auth");
  if (!token) return res.sendStatus(401);
  try {
    const session = await db.collection("users").findOne({ token: token });
    if (!session) return res.status(401).send({ message: "Invalid token" });
    res.locals.session = session;
    console.log(">> saiu");
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export default authValidation;