import { Users } from "../../models/user.js";
import { getUsersCollection } from "./user.js";
import { FindCursor, WithId } from "mongodb";

async function searchUser(search: string): Promise<WithId<Users>[]> {
  const col = await getUsersCollection();
  const filter = { name: { $regex: new RegExp(search, "i") } };

  const crusor: FindCursor<WithId<Users>> = col.find(filter);
  const found: WithId<Users>[] = await crusor.toArray();
  if (found.length > 0) {
    console.log("Found User: ", found);
    return found;
  } else {
    console.log("All user is gone...");
    return [];
  }
}

export { searchUser };
