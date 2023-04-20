import { cadastradoSchema } from "../scripts/shema.js";
const postCadastro = async (req, res, db) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  const getError = cadastradoSchema.validate({ email, password, name }, { abortEarly: false });
  if (getError.error) {
    const errors = getError.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  try {
    const Registered = await db.collection("users").findOne({ email });
    if (Registered) {
      return res.status(409).send({ message: "Email already registered" });
    }
    await db.collection("users").insertOne({ email, password });
    return res.status(201).send({ message: "Registered successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
export default postCadastro;
