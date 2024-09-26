// import { WithId } from "mongodb";
import { Products } from "../../models/produtcts.js";
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
  console.log(`Added product with ID ${result.insertedId}`);
}
// POST a new product
router.post("/", async (req: Request, res: Response) => {
  const productData: Products = req.body;
  const insertProduct = await addProduct(productData);
  if (!insertProduct) {
    res.status(400).json({ message: "Failed to create product" });
  }
  res.status(201).json(productData);

  // try {
  // const productsCollection = await getProductsCollection();
  // const insertResult = await productsCollection.insertOne(productData);
  // if (insertResult.acknowledged && insertResult.insertedId) {
  //   const newProduct = await productsCollection.findOne({
  //     _id: insertResult.insertedId,
  //   });
  //   res.status(201).json(newProduct);
  // } else {
  //   res.status(400).json({ message: "Failed to insert product" });
  // }
  // } catch (error) {
  // console.error("Error adding product:", error);
  // res
  // .status(500)
  // .json({ message: "Internal Server Error", error: error.toString() });
  // }
});
