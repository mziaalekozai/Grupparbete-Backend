import express, { Request, Response, Router } from "express";
import { Carts } from "../models/cart.js";
import { WithId, ObjectId, UpdateResult } from "mongodb";
import { getAllCarts } from "../database/cart/getAllCarts.js";
import { getOneCart } from "../database/cart/getOneCart.js";
import { updateCart } from "../database/cart/uppdateCart.js";
import { deleteCart } from "../database/cart/deleteCarts.js";
import { addCart } from "../database/cart/addCart.js";
import { isValidCart, isValidCartPut } from "../data/validationCart.js";
import { creatCartList } from "../database/cart/creatCartsList.js";
export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<WithId<Carts>[]>) => {
  try {
    const allInCart: WithId<Carts>[] = await getAllCarts();
    await creatCartList();
    if (!allInCart || allInCart.length === 0) {
      return res.sendStatus(404);
    }
    res.status(200).json(allInCart);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const cart = await getOneCart(id);

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error: any) {
    console.error("Error fetching cart:", error);
    res.status(500);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400);
    }
    const objectId: ObjectId = new ObjectId(id);
    const updatedFields: Carts = req.body;
    if (isValidCartPut(updatedFields)) {
      const result: UpdateResult<Carts> | undefined = await updateCart(
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
    console.error("Error updating cart:", error);
    res.status(500);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const objectId = new ObjectId(id);
  await deleteCart(objectId);
  res.sendStatus(204);
});

router.post("/", async (req: Request, res: Response) => {
  const newCart: Carts = req.body;
  if (isValidCart(newCart)) {
    await addCart(newCart);
    // await creatCartList();
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});
