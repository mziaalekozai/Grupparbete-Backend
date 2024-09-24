import express, { Express, NextFunction, Request, Response } from "express";
import { router as productsRouter } from "./routes/products.js";

const app: Express = express();
const port = 3333;

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
