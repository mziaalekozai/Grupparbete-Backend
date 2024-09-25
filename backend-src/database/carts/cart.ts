import { MongoClient, Db, Collection, WithId } from "mongodb";
import { Carts } from "../models/cart.js";

const con: string | undefined = process.env.CONNECTION_STRING;

async function getAllInCart() {
  if (!con) {
    console.log("No connection string, check your .env file!");
    throw new Error("No connection string");
  }
  const client: MongoClient = await MongoClient.connect(con);
  const db: Db = await client.db("webShop");
  const col: Collection<Carts> = db.collection<Carts>("cart");
  const result: WithId<Carts>[] = await col.find({}).toArray();
  return result;
}

export { getAllInCart };
