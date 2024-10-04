import { MongoClient, Db, Collection } from "mongodb";
import { Products } from "../../models/product.js";

const con: string | undefined = process.env.CONNECTION_STRING;

if (!con) {
  console.log("No connection string, check your .env file!");
  throw new Error("No connection string");
}

async function connectToDatabase(): Promise<Db> {
  const client: MongoClient = await MongoClient.connect(con as string);
  return client.db("webShop");
}

async function getProductsCollection(): Promise<Collection<Products>> {
  const db = await connectToDatabase();
  return db.collection<Products>("products");
}

export { getProductsCollection };
