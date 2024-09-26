import { getUsersCollection } from "./user.js";
import { ObjectId, DeleteResult } from "mongodb";

async function deletUser(id: ObjectId) {
  const col = await getUsersCollection();
  const filter = { _id: id };
  const result: DeleteResult = await col.deleteOne(filter);
  if (!result.acknowledged) {
    console.log("Could not delete any user");
    return;
  }
  console.log(`Deleted ${result.deletedCount} user(s).`);
}
export { deletUser };
