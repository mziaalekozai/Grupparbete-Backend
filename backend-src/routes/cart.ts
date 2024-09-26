import express, { Request, Response, Router } from "express";
import { Carts } from "../models/cart.js";
import { WithId } from "mongodb";
import { getAllInCart } from "../database/cart/cart.js";

export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<WithId<Carts>[]>) => {
  const allInCart: WithId<Carts>[] = await getAllInCart();
  res.send(allInCart);
});
