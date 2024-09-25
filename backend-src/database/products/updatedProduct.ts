import { getProductsCollection } from "./products.js";
import { ObjectId, UpdateResult } from "mongodb";

async function updatedProduct(id: ObjectId, body: Object) {
  const col = await getProductsCollection();
  const filter = { _id: id };
  //   const update = { $set: body };
  const result: UpdateResult = await col.updateOne(filter, { $set: body });

  if (!result.acknowledged) {
    console.log("Could not update the product.");
    return null;
  }

  console.log(`Updated ${result.modifiedCount} product(s).`);
  return result;
}

export { updatedProduct };
