import { cadastradoSchema } from "../scripts/shema.js";
import { v4 as newToken } from "uuid";

const postLogin = async (req, res, db) => {
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
};
export default postLogin;
