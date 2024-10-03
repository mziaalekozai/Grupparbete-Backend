import express, { Request, Response, Router } from "express";
import { Users } from "../models/user.js";
import { WithId, ObjectId, Db } from "mongodb";
import { getAllUsers } from "../database/user/getAllUsers.js";
import { getOneUser } from "../database/user/getOneUser.js";
import { updateUser } from "../database/user/updateUser.js";
import { deletUser } from "../database/user/deleteUser.js";
import { addUser } from "../database/user/addUser.js";
import { searchUser } from "../database/user/searchUser.js";
import { resetDatabase } from "../database/resetDatabas.js";

export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<WithId<Users>[]>) => {
  const allUsers: WithId<Users>[] = await getAllUsers();
  res.send(allUsers);
});

router.get("/search", async (req, res) => {
  const name: string = req.query.q as string;
  if (!name.trim()) {
    return res.status(400).json({ message: "Search query cannot be empty" });
  }

  try {
    const searchResults = await searchUser(name);
    if (searchResults.length > 0) {
      res.status(200).json(searchResults);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  console.log("hej user");

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

router.post("/reset", async (req, res) => {
  try {
    console.log("Resetting database...");
    const result = await resetDatabase(); // Assuming resetDatabase returns a promise
    res.status(200).json(result);
  } catch (error) {
    console.error("Error resetting database:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reset the database",
      // error: error.toString(),
    });
  }
});
