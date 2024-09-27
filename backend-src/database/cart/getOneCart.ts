import { getCartCollection } from "./cart.js";
import { WithId, ObjectId } from "mongodb";
import { Carts } from "../../models/cart.js";

async function getOneCart(id: ObjectId): Promise<WithId<Carts> | null> {
  const col = await getCartCollection();
  return await col.findOne({ _id: new ObjectId(id) });
}

export { getOneCart };