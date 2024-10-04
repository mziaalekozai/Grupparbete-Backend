import { Carts } from "../../models/cart.js";
import { getCartCollection } from "./cart.js";
import { ObjectId, UpdateResult } from "mongodb";

async function updateCart(id: ObjectId, body: Object) {
  const col = await getCartCollection();
  const filter = { _id: id };
  const result: UpdateResult<Carts> = await col.updateOne(filter, {
    $set: body,
  });

  if (!result.acknowledged) {
    console.log("Could not update the cart.");
    return null;
  }

  console.log(`Updated ${result.modifiedCount} cart(s).`);
  return result;
}

export { updateCart };
