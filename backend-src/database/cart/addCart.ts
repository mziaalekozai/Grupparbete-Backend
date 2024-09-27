// import { WithId } from "mongodb";
import { Carts } from "../../models/cart.js";
import { getCartCollection } from "./cart.js";
import { InsertOneResult, ObjectId } from "mongodb";

async function addCart(cart: Carts): Promise<ObjectId | null> {
  const collection = await getCartCollection();
  const result: InsertOneResult<Carts> = await collection.insertOne(cart);
  if (!result.acknowledged) {
    console.log("Could not add cart");
    return null;
  }
  return result.insertedId;
  //   console.log(`Added product with ID ${result.insertedId}`);
}

export { addCart };