const postNovaTransacao = async (req, res, db) => {
  const { tipo } = req.params;
  const { descricao, valor, data, token } = req.body;

  const getError = transationSchema.validate({ descricao, valor, data, token }, { abortEarly: false });
  if (getError.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  try {
    const findingTonken = await db.collection("users").findOne({ token });
    if (!findingTonken) {
      return res.status(401).send("Invalid token");
    }
    const { _id } = findingTonken;
    const newTransaction = {
      descricao,
      valor,
      data,
      tipo,
    };
    await db.collection("users").updateOne({ _id }, { $push: { transactions: newTransaction } });
    return res.status(201).send("Transaction registered successfully");
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
};
export default postNovaTransacao;
