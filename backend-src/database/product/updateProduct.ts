import { Products } from "../../models/product.js";
import { getProductsCollection } from "./products.js";
import { ObjectId, UpdateResult } from "mongodb";

async function updateProduct(id: ObjectId, body: Object) {
  const col = await getProductsCollection();
  const filter = { _id: id };

  const result: UpdateResult<Products> = await col.updateOne(filter, {
    $set: body,
  });

  if (!result.acknowledged) {
    console.log("Could not update the product.");
    return;
  }

  console.log(`Updated ${result.matchedCount} product(s).`);
  return result;
}

export { updateProduct };
