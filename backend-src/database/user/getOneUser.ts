import { WithId, ObjectId, FindCursor } from "mongodb";

import { Users } from "../../models/user.js";
import { getUsersCollection } from "./user.js";

async function getOneUser(id: ObjectId): Promise<WithId<Users>[]> {
  try {
    const col = await getUsersCollection();
    const filter = { _id: id };
    const cursor: FindCursor<WithId<Users>> = col.find(filter);
    const found: WithId<Users>[] = await cursor.toArray();
    if (found.length < 1) {
      console.log("No user awailable today :/");
    }
    return found;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}
export { getOneUser };
