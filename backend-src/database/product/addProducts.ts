// import { WithId } from "mongodb";
import { Products } from "../../models/product.js";
import { getProductsCollection } from "./products.js";
import { InsertOneResult, ObjectId } from "mongodb";

async function addProduct(product: Products): Promise<ObjectId | null> {
  const collection = await getProductsCollection();
  const result: InsertOneResult<Products> = await collection.insertOne(product);
  if (!result.acknowledged) {
    console.log("Could not add the product");
    return null;
  }
  return result.insertedId;
}

export { addProduct };
