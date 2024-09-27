import { getProductsCollection } from "./products.js";
import { Products } from "../../models/product.js";
import { WithId } from "mongodb";

async function getAllProducts(): Promise<WithId<Products>[]> {
  const col = await getProductsCollection();
  return await col.find({}).toArray();
}

export { getAllProducts };
