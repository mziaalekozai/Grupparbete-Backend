import express, { Request, Response, Router } from "express";

import { Products } from "../models/produtcts.js";
import { WithId } from "mongodb";
import { getAllProducts } from "../database/products.js";

export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<WithId<Products>[]>) => {
  const allProducts: WithId<Products>[] = await getAllProducts();
  res.send(allProducts);
});
