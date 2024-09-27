import { getCartCollection } from "./cart.js";
import { DeleteResult, ObjectId } from "mongodb";

async function deleteCart(id: ObjectId) {
  const col = await getCartCollection();
  const filter = { _id: id };
  const result: DeleteResult = await col.deleteOne(filter);
  if (!result.acknowledged) {
    console.log("Could not delete any carts");
    return;
  }
  console.log(`Deleted ${result.deletedCount} cart(s).`);
}
export { deleteCart };
