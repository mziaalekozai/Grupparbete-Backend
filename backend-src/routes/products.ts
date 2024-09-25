import express, { Request, Response, Router } from "express";

import { Products } from "../models/produtcts.js";
import { ObjectId, WithId } from "mongodb";
import { getAllProducts } from "../database/products/getAllProducts.js";
import { getOneProduct } from "../database/products/getOneProduct.js";
import { updatedProduct } from "../database/products/updatedProduct.js";

export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<WithId<Products>[]>) => {
  const allProducts: WithId<Products>[] = await getAllProducts();
  res.send(allProducts);
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
  await updatedProduct(objectId, updatedFields);
  res.sendStatus(201);
});
