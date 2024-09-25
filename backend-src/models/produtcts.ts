import { ObjectId } from "mongodb";
export interface Products {
  _id?: ObjectId;
  name: string;
  price: number;
  image: string;
  amountInStock: number;
}
