import { Users } from "../../models/user.js";
import { getUsersCollection } from "./user.js";
import { ObjectId, UpdateResult } from "mongodb";

async function updateUser(id: ObjectId, body: Object) {
  const col = await getUsersCollection();
  const filter = { _id: id };
  const result: UpdateResult<Users> = await col.updateOne(filter, {
    $set: body,
  });

  if (!result.acknowledged) {
    console.log("Could not update the user.");
    return null;
  }

  console.log(`Updated ${result.modifiedCount} user(s).`);
  return result;
}

export { updateUser };
