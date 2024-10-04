// import { WithId } from "mongodb";
import { Users } from "../../models/user.js";
import { getUsersCollection } from "./user.js";
import { InsertOneResult, ObjectId } from "mongodb";

async function addUser(user: Users): Promise<ObjectId | null> {
  const collection = await getUsersCollection();
  const result: InsertOneResult<Users> = await collection.insertOne(user);
  if (!result.acknowledged) {
    console.log("Could not add a new user");
    return null;
  }
  return result.insertedId;
}

export { addUser };
