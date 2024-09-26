import { MongoClient, Db, Collection } from "mongodb";
import { Users } from "../../models/user.js";

const con: string | undefined = process.env.CONNECTION_STRING;

if (!con) {
  console.log("No connection string, check your .env file!");
  throw new Error("No connection string");
}

async function connectToDatabase(): Promise<Db> {
  const client: MongoClient = await MongoClient.connect(con as string);
  return client.db("webShop");
}

async function getUsersCollection(): Promise<Collection<Users>> {
  const db = await connectToDatabase();
  return db.collection<Users>("users");
}

export { getUsersCollection };
