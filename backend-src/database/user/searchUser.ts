import { Users } from "../../models/user.js";
import { getUsersCollection } from "./user.js";
import { FindCursor, WithId } from "mongodb";

async function searchUser(search: string): Promise<WithId<Users>[]> {
	const col = await getUsersCollection();
	const searchterm = search
	  .split(" ")
	  .map((term) => term.trim())
	  .filter((term) => term.length > 0);
	const userSearch = searchterm.map((term) => ({
	  name: { $regex: new RegExp(term, "i") },
	}));
	const user = await col.find({ $or: userSearch }).toArray();
	if (user.length > 0) {
	  console.log("Found user: ", user);
	  return user;
	} else {
	  console.log("No users found...");
	  return [];
	}
  }
  
  export { searchUser };
