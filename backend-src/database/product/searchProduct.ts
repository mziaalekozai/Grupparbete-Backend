import { getProductsCollection } from "./products.js";
import { Products } from "../../models/produtct.js";
import { FindCursor, WithId } from "mongodb";

async function searchProduct(search: string): Promise<WithId<Products>[]> {
  const col = await getProductsCollection();
  const filter = { name: { $regex: new RegExp(search, "i") } };

  const crusor: FindCursor<WithId<Products>> = col.find(filter);
  const found: WithId<Products>[] = await crusor.toArray();
  if (found.length > 0) {
    console.log("Found product: ", found);
    return found;
  } else {
    console.log("All products is gone...");
    return [];
  }
}

export { searchProduct };
