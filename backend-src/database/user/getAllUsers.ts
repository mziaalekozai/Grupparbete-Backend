import { WithId } from "mongodb";

import { Users } from "../../models/user.js";
import { getUsersCollection } from "./user.js";

async function getAllUsers(): Promise<WithId<Users>[]> {
  const col = await getUsersCollection();
  return await col.find({}).toArray();
}

export { getAllUsers };
