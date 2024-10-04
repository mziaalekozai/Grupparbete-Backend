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

// export function validationTest() {
//   const userResult1 = userSchema.validate({
//     name: "Rickard",
//     isAdmin: false,
//   });
//   const userResult2 = userSchema.validate({
//     name: "",
//     isAdmin: false,
//   });
//   const userResult3 = userSchema.validate({
//     name: "Rickard",
//   });

//   const productResult1 = productSchema.validate({
//     name: "Dandelion",
//     price: 66.45,
//     image: "https://example.com/lavender.jpg",
//     amountInStock: 100,
//   });
//   const productResult2 = userSchema.validate({
//     name: "Dandelion",
//     price: "66.45",
//     image: "https://example.com/lavender.jpg",
//     amountInStock: 100,
//   });
//   const productResult3 = userSchema.validate({
//     name: "",
//     price: 66.45,
//     image: "https://example.com/lavender.jpg",
//     amountInStock: 100,
//   });
//   const productResult4 = userSchema.validate({
//     name: "Dandelion",
//     price: 66.45,
//     image: "https://example.com/lavender.jpg",
//   });
//   const cartResult1 = cartSchema.validate({
//     amountInStock: 45,
//   });
//   const cartResult2 = cartSchema.validate({
//     amountInStock: "45",
//   });
//   const cartResult3 = cartSchema.validate({});

//   console.log(userResult1.error);
//   console.log(userResult2.error);
//   console.log(userResult3.error);
//   console.log(productResult1.error);
//   console.log(productResult2.error);
//   console.log(productResult3.error);
//   console.log(productResult4.error);
//   console.log(cartResult1.error);
//   console.log(cartResult2.error);
//   console.log(cartResult3.error);
// }
