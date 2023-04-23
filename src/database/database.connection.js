import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const dbConnection = async () => {
  const database = new MongoClient(process.env.DATABASE_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await database.connect();
    return database.db();
  } catch (err) {
    console.log({ message: err.message });
  }
};
export const db = await dbConnection();
