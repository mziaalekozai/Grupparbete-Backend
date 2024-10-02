import express, { Request, Response, Router } from "express";
import { Products } from "../models/product.js";
import { ObjectId, UpdateResult, WithId } from "mongodb";
import { getAllProducts } from "../database/product/getAllProducts.js";
import { getOneProduct } from "../database/product/getOneProduct.js";
import { updateProduct } from "../database/product/updateProduct.js";
import { deleteProduct } from "../database/product/deleteProduct.js";
import { searchProduct } from "../database/product/searchProduct.js";
import { addProduct } from "../database/product/addProducts.js";
import { isValidProduct, productSchema } from "../data/validation.js";
export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const allProducts: WithId<Products>[] = await getAllProducts();
    if (!allProducts || allProducts.length === 0) {
      return res.sendStatus(404);
    }
    res.send(allProducts);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/search", async (req, res) => {
  const name: string = req.query.q as string;
  if (!name.trim()) {
    return res.status(400).json({ message: "Search query cannot be empty" });
  }

  try {
    const searchResults = await searchProduct(name);
    if (searchResults.length > 0) {
      res.status(200).json(searchResults);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const objectId: ObjectId = new ObjectId(id);
    const product: WithId<Products>[] = await getOneProduct(objectId);
    if (product.length < 1) {
      res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error: any) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const id: string = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const objectId: ObjectId = new ObjectId(id);
    const updatedFields: Products = req.body;
    const result: UpdateResult<Products> | undefined = await updateProduct(
      objectId,
      updatedFields
    );
    if (result?.matchedCount === 0) {
      return res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error("Wrong with updating the product");
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const objectId = new ObjectId(id);
    await deleteProduct(objectId);
    res.sendStatus(204);
  } catch (error) {
    console.error("Fel vid radering:", error);
    res.status(500).json({ error: "Ett fel uppstod vid radering" });
  }
});

// POST a new product
router.post("/", async (req: Request, res: Response) => {
  const newProduct: Products = req.body;
  if (isValidProduct(newProduct)) {
    await addProduct(newProduct);
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});
