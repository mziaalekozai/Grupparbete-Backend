import { getProductsCollection } from "./products.js";
import { Products } from "../../models/produtct.js";
import { WithId, ObjectId } from "mongodb";

async function getOneProduct(id: ObjectId): Promise<WithId<Products> | null> {
  const col = await getProductsCollection();
  return await col.findOne({ _id: new ObjectId(id) });
}

export { getOneProduct };
