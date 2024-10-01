import Joi from "joi";
import { Carts } from "../models/cart.js";
import { Products } from "../models/product.js";
import { Users } from "../models/user.js";

export const cartSchema = Joi.defaults((schema) => {
  return schema.required();
})
  .object({
    _id: Joi.string().min(24),
    userId: Joi.string().min(24),
    productId: Joi.string().min(24),
    amount: Joi.number().min(1).required(),
  })
  .unknown(false);

export const productSchema = Joi.defaults((schema) => {
  return schema.required();
})
  .object({
    _id: Joi.string().min(24),
    name: Joi.string().min(1).required(),
    price: Joi.number().min(1).required(),
    image: Joi.string().min(1).required(),
    amountInStock: Joi.number().min(1).required(),
  })
  .unknown(false);

export const userSchema = Joi.defaults((schema) => {
  return schema.required();
})
  .object({
    _id: Joi.string().min(24),
    name: Joi.string().min(1).required(),
    isAdmin: Joi.boolean().required(),
  })
  .unknown(false);

export function isValidCart(cart: Carts): boolean {
  let result = cartSchema.validate(cart);
  return !result.error;
}

export function isValidProduct(product: Products): boolean {
  let result = productSchema.validate(product);
  return !result.error;
}
export function isValidUser(user: Users): boolean {
  let result = userSchema.validate(user);
  return !result.error;
}
