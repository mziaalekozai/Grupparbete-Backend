import Joi from "joi";
import { Users } from "../models/user.js";

export const userSchema = Joi.defaults((schema) => {
  return schema.required();
}).object({
  name: Joi.string().trim().min(1).required(),
  isAdmin: Joi.boolean().required(),
});

export function isValidUser(user: Users): boolean {
  let result = userSchema.validate(user);
  return !result.error;
}
