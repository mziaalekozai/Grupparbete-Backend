import express, { Request, Response, Router } from "express";
import { Products } from "../models/product.js";
import { ObjectId, WithId } from "mongodb";
import { getAllProducts } from "../database/product/getAllProducts.js";
import { getOneProduct } from "../database/product/getOneProduct.js";
import { updateProduct } from "../database/product/updateProduct.js";
import { deleteProduct } from "../database/product/deleteProduct.js";
import { searchProduct } from "../database/product/searchProduct.js";
import { addProduct } from "../database/product/addProducts.js";
export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<WithId<Products>[]>) => {
  const allProducts: WithId<Products>[] = await getAllProducts();
  res.send(allProducts);
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

// POST a new product
router.post("/", async (req: Request, res: Response) => {
  const newProduct: Products = req.body;
  const insertProduct = await addProduct(newProduct);
  if (insertProduct == null) {
    res.status(400).json({ message: "Failed to create product" });
    return;
  }
  res.status(201).json(newProduct);
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const product = await getOneProduct(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const objectId = new ObjectId(id);
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid product ID" });
  }
  const updatedFields = req.body;
  await updateProduct(objectId, updatedFields);
  res.sendStatus(201);
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
  if (!newProduct.name || !newProduct.price || !newProduct.image) {
    res.status(400).json({ message: "Alla fält är obligatoriska" });
    return;
  }
  const insertProduct = await addProduct(newProduct);
  if (insertProduct == null) {
    res.status(400).json({ message: "Failed to create product" });
    return;
  }
  res.status(201).json(newProduct);
});
