const getHome = async (req, res, db) => {
  const { token } = req.headers;
  try {
    const findingTonken = await db.collection("users").findOne({ token });
    if (!findingTonken) {
      return res.status(401).send("Invalid token");
    }
    const { transactions } = findingTonken;
    return res.status(200).send(transactions);
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
};
export default getHome;
