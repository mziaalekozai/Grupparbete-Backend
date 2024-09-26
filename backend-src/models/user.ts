import { ObjectId } from "mongodb";

export interface Users {
  _id: ObjectId;
  name: string;
  isAdmin: boolean;
}
