import express, { Request, Response, Router } from "express";
import { Users } from "../models/user.js";
import { WithId, ObjectId, UpdateResult } from "mongodb";
import { getAllUsers } from "../database/user/getAllUsers.js";
import { getOneUser } from "../database/user/getOneUser.js";
import { updateUser } from "../database/user/updateUser.js";
import { deletUser } from "../database/user/deleteUser.js";
import { addUser } from "../database/user/addUser.js";
import { searchUser } from "../database/user/searchUser.js";
import { isValidUser } from "../data/validationUser.js";
export const router: Router = express.Router();

router.get("/", async (req: Request, res: Response<WithId<Users>[]>) => {
  try {
    const allUsers: WithId<Users>[] = await getAllUsers();
    if (!getAllUsers || getAllUsers.length === 0) {
      return res.sendStatus(404);
    }
    res.send(allUsers);
  } catch (error) {
    res.sendStatus(500);
  }
});
router.post("/", async (req: Request, res: Response) => {
  const newUser: Users = req.body;
  try {
    if (isValidUser(newUser)) {
      await addUser(newUser);
      console.log("laggt till ", newUser);
      res.sendStatus(201);
    } else {
      console.log("gick inte, försök igen.");
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Gått förbi alla saker in i finally");
  }
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

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const objectId: ObjectId = new ObjectId(id);
    const user: WithId<Users>[] = await getOneUser(objectId);
    if (user.length < 1) {
      res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(user);
  } catch (error: any) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid product ID" });
    }
    const objectId: ObjectId = new ObjectId(id);
    const updatedFields: Users = req.body;
    const result: UpdateResult<Users> | undefined = await updateUser(
      objectId,
      updatedFields
    );
    if (result?.matchedCount === 0) {
      return res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    console.error("Wrong with updating the user");
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const objectId = new ObjectId(id);
    await deletUser(objectId);

    res.sendStatus(204);
  } catch (error) {
    console.error("Fel vid radering:", error);
    res.status(500).json({ error: "Ett fel uppstod vid radering" });
  }
});
