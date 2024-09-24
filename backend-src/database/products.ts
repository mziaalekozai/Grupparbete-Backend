import { MongoClient, Db, Collection, WithId } from "mongodb";

import { Products } from "../models/produtcts.js";

const con: string | undefined = process.env.CONECTION_STRING;

async function getAllProducts() {
  if (!con) {
    console.log("No connection string, check your .env file!");
    throw new Error("No connection string");
  }
  const client: MongoClient = await MongoClient.connect(con);
  const db: Db = await client.db("webShop");
  const col: Collection<Products> = db.collection<Products>("products");
  const result: WithId<Products>[] = await col.find({}).toArray();
  return result;
}

export { getAllProducts };
