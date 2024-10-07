import express, { Request, Response, Router } from "express";
import { Products } from "../models/product.js";
import { ObjectId, UpdateResult, WithId } from "mongodb";
import { getAllProducts } from "../database/product/getAllProducts.js";
import { getOneProduct } from "../database/product/getOneProduct.js";
import { updateProduct } from "../database/product/updateProduct.js";
import { deleteProduct } from "../database/product/deleteProduct.js";
import { searchProduct } from "../database/product/searchProduct.js";
import { addProduct } from "../database/product/addProducts.js";
import {
  isValidProduct,
  isValidProductPut,
} from "../data/validationProduct.js";
export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const allProducts: WithId<Products>[] = await getAllProducts();
    if (!allProducts || allProducts.length === 0) {
      return res.sendStatus(404);
    }
    res.status(200).json(allProducts);
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
  try {
    const id: string = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400);
    }
    const objectId: ObjectId = new ObjectId(id);
    const updatedFields: Products = req.body;
    if (isValidProductPut(updatedFields)) {
      const result: UpdateResult<Products> | undefined = await updateProduct(
        objectId,
        updatedFields
      );
      if (result?.matchedCount === 0) {
        return res.status(404);
      } else {
        res.sendStatus(204);
      }
    } else {
      return res.sendStatus(400);
    }
  } catch (error) {
    console.error("Error updating product:");
    res.status(500);
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

router.post("/", async (req: Request, res: Response) => {
  try {
    const newProduct: Products = req.body;
    if (!isValidProduct(newProduct)) {
      return res
        .status(400)
        .json({ message: "Failed to create product. Invalid data." });
    }
    const insertProduct = await addProduct(newProduct);
    if (!insertProduct) {
      return res
        .status(500)
        .json({ message: "Failed to add the product to the database." });
    }
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
