import express, { Request, Response, Router } from "express";
import { Carts } from "../models/cart.js";
import { WithId, ObjectId } from "mongodb";
import { getAllCarts } from "../database/cart/getAllCarts.js";
import { getOneCart } from "../database/cart/getOneCart.js";
import { updateCart } from "../database/cart/uppdateCart.js"; 
import { deleteCart } from "../database/cart/deleteCarts.js"; 
import { addCart } from "../database/cart/addCart.js"; 
export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<WithId<Carts>[]>) => {
  const allInCart: WithId<Carts>[] = await getAllCarts();
  res.send(allInCart);
});

router.post("/", async (req: Request, res: Response) => {
	const newCart: Carts = req.body;
	const insertCart = await addCart(newCart);
	if (insertCart == null) {
	  res.status(400).json({ message: "Failed to create cart" });
	  return;
	}
	res.status(201).json(newCart);
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
	await updateCart(objectId, updatedFields);
	res.sendStatus(201);
  });
  
  router.delete("/:id", async (req: Request, res: Response) => {
	const id: string = req.params.id;
	const objectId = new ObjectId(id);
	await deleteCart(objectId);
	res.sendStatus(204);
  });

  // POST a new product
router.post("/", async (req: Request, res: Response) => {
	const newCart: Carts = req.body;
	const insertCart = await addCart(newCart);
	if (insertCart == null) {
	  res.status(400).json({ message: "Failed to create cart" });
	  return;
	}
	res.status(201).json(newCart);
  });
