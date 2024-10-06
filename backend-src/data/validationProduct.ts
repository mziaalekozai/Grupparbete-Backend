import Joi from "joi";
import { Products } from "../models/product.js";

export const productSchema = Joi.defaults((schema) => {
  return schema.required();
}).object({
  name: Joi.string().min(1).required(),
  price: Joi.number().strict().min(1).required(),
  image: Joi.string().min(1).required(),
  amountInStock: Joi.number().min(0).strict().required(),
});

export function isValidProduct(product: Products): boolean {
  let result = productSchema.validate(product);
  return !result.error;
}

export const productSchemaPut = Joi.defaults((schema) => {
  return schema.required();
})
  .object()
  .keys({
    name: Joi.string().min(1).optional(),
    price: Joi.number().strict().min(1).optional(),
    image: Joi.string().min(1).optional(),
    amountInStock: Joi.number().min(0).strict().optional(),
  })
  .required()
  .min(1);

export function isValidProductPut(product: Products): boolean {
  let result = productSchemaPut.validate(product);
  return !result.error;
}
