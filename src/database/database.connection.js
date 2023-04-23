import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log("database url:", process.env.DATABASE_URL);
const dbConnection = async () => {
  const database = new MongoClient(process.env.DATABASE_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    console.log("try connect");
    await database.connect();
    return database.db();
  } catch (err) {
    console.log("error connect");
    console.log({ message: err.message });
  }
};
export const db = await dbConnection();
