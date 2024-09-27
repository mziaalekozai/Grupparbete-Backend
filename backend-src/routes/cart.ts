import express, { Request, Response, Router } from "express";
import { Carts } from "../models/cart.js";
import { WithId } from "mongodb";
import { getAllCarts } from "../database/cart/getAllCarts.js";

export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<WithId<Carts>[]>) => {
  const allInCart: WithId<Carts>[] = await getAllCarts();
  res.send(allInCart);
});
