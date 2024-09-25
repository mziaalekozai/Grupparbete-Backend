import { MongoClient, Db, Collection, WithId } from "mongodb";

import { Users } from "../models/users.js";

const con: string | undefined = process.env.CONNECTION_STRING;

async function getAllUsers() {
	if (!con) {
		console.log("No connection string, check your .env file!");
		throw new Error("No connection string");
	}
	const client: MongoClient = await MongoClient.connect(con);
	const db: Db = await client.db("webShop");
	const col: Collection<Users> = db.collection<Users>("users");
	const results: WithId<Users>[] = await col.find({}).toArray();
	return results;
}

export { getAllUsers }
