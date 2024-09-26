import express, { Request, Response, Router } from "express";
import { Users } from "../models/user.js";
import { WithId, ObjectId } from "mongodb";
import { getAllUsers } from "../database/user/getAllUsers.js";
import { getOneUser } from "../database/user/getOneUser.js";
import { updateUser } from "../database/user/updateUser.js";
import { deletUser } from "../database/user/deleteUser.js";
import { addUser } from "../database/user/addUser.js";
import { searchUser } from "../database/user/searchUser.js";

export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<WithId<Users>[]>) => {
  const allUsers: WithId<Users>[] = await getAllUsers();
  res.send(allUsers);
});

router.get("/search", async (req: Request, res: Response) => {
  try {
    const name: string = req.query.q as string;
    console.log("Searching for user with name:", name);
    const search = await searchUser(name);
    console.log("Search result:", search);

    if (search.length > 0) {
      res.status(200).json(search);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const newUser: Users = req.body;
  const insertUser = await addUser(newUser);
  if (insertUser == null) {
    res.status(400).json({ message: "Failed to create a new user" });
    return;
  }
  res.status(201).json(newUser);
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const user = await getOneUser(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    console.error("Error fetching user:", error);
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
  await updateUser(objectId, updatedFields);
  res.sendStatus(201);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const objectId = new ObjectId(id);
  await deletUser(objectId);
  res.sendStatus(204);
});
