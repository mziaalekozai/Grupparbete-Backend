import { WithId, FindCursor } from "mongodb";
import { Carts } from "../../models/cart.js";
import { getCartCollection } from "./cart.js";
import { getUsersCollection } from "../user/user.js";
import { getProductsCollection } from "../product/products.js";

export async function creatCartList(): Promise<WithId<Carts>[]> {
  const cartCollection = await getCartCollection();
  const productCollection = await getProductsCollection();
  const userCollection = await getUsersCollection();

  const cartCursor: FindCursor<WithId<Carts>> = cartCollection.find({});
  const cartList: WithId<Carts>[] = await cartCursor.toArray();

  const productList = await productCollection
    .find({})
    .limit(cartList.length)
    .toArray();
  const userList = await userCollection.find({}).toArray();

  productList.forEach(async (product, i) => {
    const cart = cartList[i];
    await cartCollection.updateOne(
      { _id: cart._id },
      { $set: { productId: product._id } }
    );
    let x = 0;
    for (let i = 0; i < cartList.length; i++) {
      const cart = cartList[i];
      if (x >= userList.length) {
        x = 0;
      }
      console.log(cart._id);
      console.log(userList[x]);

      await cartCollection.updateOne(
        { _id: cart._id },
        { $set: { userId: userList[x]._id } }
      );
      x++;
    }
  });

  return cartList;
}
