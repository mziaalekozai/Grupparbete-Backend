import Joi from "joi";
import { Carts } from "../models/cart.js";

export const cartSchema = Joi.defaults((schema) => {
  return schema.required();
}).object({
  userId: Joi.string().min(24),
  productId: Joi.string().min(24),
  amount: Joi.number().min(1).required(),
});

export function isValidCart(cart: Carts): boolean {
  let result = cartSchema.validate(cart);
  return !result.error;
}
