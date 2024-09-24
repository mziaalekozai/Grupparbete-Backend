import express, { Express, NextFunction, Request, Response } from "express";
import { router as productsRouter } from "./routes/products.js";
import { router as usersRouter } from "./routes/users.js";
import { router as cartRouter } from "./routes/carts.js"

const app: Express = express();
const port = 3333;

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.use("/products", productsRouter);

app.use("/users", usersRouter);

app.use("/cart", cartRouter);

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
