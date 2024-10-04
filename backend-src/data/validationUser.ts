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
export const userSchemaPut = Joi.defaults((schema) => {
  return schema.required();
})
  .object()
  .keys({
    name: Joi.string().min(1).optional(),
    isAdmin: Joi.boolean().optional(),
  })
  .required()
  .min(1);

export function isValidUserPut(user: Users): boolean {
  let result = userSchemaPut.validate(user);
  return !result.error;
}
