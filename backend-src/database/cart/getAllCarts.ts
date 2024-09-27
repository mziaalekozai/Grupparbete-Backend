import { getCartCollection } from "./cart.js";
import { Carts } from "../../models/cart.js";
import { WithId } from "mongodb";

async function getAllCarts(): Promise<WithId<Carts>[]> {
  const col = await getCartCollection();
  return await col.find({}).toArray();
}

export { getAllCarts };