import { loginSchema } from "../scripts/shema.js";
import { v4 as newToken } from "uuid";
import bcrypt from "bcrypt";

const postLogin = async (req, res, db) => {
  const { email, password } = req.body;
  const getError = loginSchema.validate({ email, password }, { abortEarly: false });
  if (getError.error) {
    const errors = getError.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  try {
    const record = await db.collection("users").findOne({ email });
    if (!record) {
      return res.status(404).send("Email not registered");
    }
    if (bcrypt.compareSync(password, record.password)) {
      const token = newToken();
      return res.status(200).send(token);
    }
    return res.status(401).send("Invalid password");
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
};
export default postLogin;
