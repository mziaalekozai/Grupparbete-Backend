import express, { Express, NextFunction, Request, Response } from "express";
import { router as productsRouter } from "./routes/product.js";
import { router as usersRouter } from "./routes/user.js";
import { router as cartRouter } from "./routes/cart.js";
import cors from "cors"

const app: Express = express();
const port = 3333;
app.use(cors())
app.use(express.json());


app.use("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.use( express.static("./frontend-src"))

app.use("/product", productsRouter);
app.use("/user", usersRouter);
app.use("/cart", cartRouter);

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
