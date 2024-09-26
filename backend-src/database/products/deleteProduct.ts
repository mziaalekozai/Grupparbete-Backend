import { getProductsCollection } from "./products.js";
import { DeleteResult, ObjectId } from "mongodb";

async function deletProducts(id: ObjectId) {
  const col = await getProductsCollection();
  const filter = { _id: id };
  const result: DeleteResult = await col.deleteOne(filter);
  if (!result.acknowledged) {
    console.log("Could not delete any product");
    return;
  }
  console.log(`Deleted ${result.deletedCount} product(s).`);
}
export { deletProducts };

// det är denna jag har deletat, så vi får lägga till den igen när Add finns :)
// {"name": "Byggklossar", "price": 199, "image":"https://cdn1.leksakscity.se/35071-home_default/byggklossar-tra-200-delar-woodi-world-toy.jpg", "amountInStock": 56}
//{"name": "Radiostyrdbil", "price": 349, "image":"https://prylify.se/images/zoom/transformers-radiostyrdbil-rod2.jpeg", "amountInStock": 13},
//{"name": "Gosedjur Nalle", "price": 149, "image":"https://quickbutik.imgix.net/14023h/products/60127e4958611.jpeg?w=550&auto=format", "amountInStock": 34},
