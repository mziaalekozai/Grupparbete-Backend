import { getProductsCollection } from "./products.js";
import { DeleteResult, ObjectId } from "mongodb";

async function deletProduct(id: ObjectId) {
  const col = await getProductsCollection();
  const filter = { _id: id };
  const result: DeleteResult = await col.deleteOne(filter);
  if (!result.acknowledged) {
    console.log("Could not delete any product");
    return;
  }
  console.log(`Deleted ${result.deletedCount} product(s).`);
}
export { deletProduct };
