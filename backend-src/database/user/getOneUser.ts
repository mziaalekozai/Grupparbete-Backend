import { WithId, ObjectId } from "mongodb";

import { Users } from "../../models/user.js";
import { getUsersCollection } from "./user.js";

async function getOneUser(id: ObjectId): Promise<WithId<Users> | null> {
  const col = await getUsersCollection();
  return await col.findOne({ _id: new ObjectId(id) });
}
export { getOneUser };
