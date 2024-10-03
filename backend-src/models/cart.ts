import { ObjectId } from "mongodb";

export interface Carts {
  userId?: ObjectId;
  productId?: ObjectId;
  amount: number;
}
