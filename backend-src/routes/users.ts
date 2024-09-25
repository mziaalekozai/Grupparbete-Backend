import express, { Request, Response, Router } from "express";
import { Users } from "../models/users.js";
import { WithId } from "mongodb";
import { getAllUsers } from "../database/users/users.js";

export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<WithId<Users>[]>) => {
  const allUsers: WithId<Users>[] = await getAllUsers();
  res.send(allUsers);
});
