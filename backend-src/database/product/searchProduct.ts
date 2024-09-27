import { getProductsCollection } from "./products.js";
import { Products } from "../../models/product.js";
import { WithId } from "mongodb";

async function searchProduct(search: string): Promise<WithId<Products>[]> {
  const col = await getProductsCollection();
  const searchterm = search
    .split(" ")
    .map((term) => term.trim())
    .filter((term) => term.length > 0);
  const productSearch = searchterm.map((term) => ({
    name: { $regex: new RegExp(term, "i") },
  }));
  const product = await col.find({ $or: productSearch }).toArray();
  if (product.length > 0) {
    console.log("Found product: ", product);
    return product;
  } else {
    console.log("No products found...");
    return [];
  }
}

export { searchProduct };
