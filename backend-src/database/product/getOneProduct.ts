import { getProductsCollection } from "./products.js";
import { Products } from "../../models/product.js";
import { WithId, ObjectId, FindCursor } from "mongodb";

async function getOneProduct(id: ObjectId): Promise<WithId<Products>[]> {
  try {
    const col = await getProductsCollection();
    const filter = { _id: id };
    const cursor: FindCursor<WithId<Products>> = col.find(filter);
    const found: WithId<Products>[] = await cursor.toArray();
    if (found.length < 1) {
      console.log("No product awailable today :/");
    }
    return found;
  } catch (error) {
    console.error("Error fetching product", error);
    throw error;
  }
}

export { getOneProduct };
