import cadastradoSchema from "../scripts/shema.js";
const postCadastro = async (req, res, db) => {
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
};
export default postCadastro;
