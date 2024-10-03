import express, { Request, Response, Router } from "express";
import { Db } from "mongodb";

import users from "../data/users.js";
import products from "../data/products.js";
import carts from "../data/cart.js";
import { resetDatabase } from "../database/resetDatabas.js";

export const router: Router = express.Router();

let db: Db;
router.post("/reset", async (req: Request, res: Response) => {
  // router.get("/", async (req: Request, res: Response) => {
  console.log("hej");
  resetDatabase();
});

export default { router };
