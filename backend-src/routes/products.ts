import express, { Request, Response, Router } from "express";

import { Products } from "../models/produtcts.js";
import { ObjectId, WithId } from "mongodb";
import { getAllProducts } from "../database/getAllProducts.js";
import { getOneProduct } from "../database/getOneProduct.js";

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
      res.status(404);
    }
  } catch (error: any) {
    res.status(500);
  }
});
