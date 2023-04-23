import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.DATABASE_URL;
console.log("database url:", URI);
const dbConnection = async () => {
  const database = new MongoClient(URI, {
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
