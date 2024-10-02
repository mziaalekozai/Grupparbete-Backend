import Joi from "joi";
import { Carts } from "../models/cart.js";
import { Products } from "../models/product.js";
import { Users } from "../models/user.js";

export const cartSchema = Joi.object({
  _id: Joi.string().min(24),
  userId: Joi.string().min(24),
  productId: Joi.string().min(24),
  amount: Joi.number().min(1).required(),
});

export const productSchema = Joi.object({
  _id: Joi.string().min(24),
  name: Joi.string().min(1).required(),
  price: Joi.number().strict().required(),
  image: Joi.string().min(1).required(),
  amountInStock: Joi.number().min(0).strict().required(),
});

export const userSchema = Joi.object({
  _id: Joi.string().min(24),
  name: Joi.string().min(1).required(),
  isAdmin: Joi.boolean().required(),
});

export function isValidCart(cart: Carts) {
  return cartSchema.validate(cart);
}

export function isValidProduct(product: Products) {
  return productSchema.validate(product);
}
export function isValidUser(user: Users) {
  return userSchema.validate(user);
}
