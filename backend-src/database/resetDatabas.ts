import users from "../data/users.js";
import products from "../data/products.js";
import carts from "../data/cart.js";
import { getProductsCollection } from "./products.js";
import { getUsersCollection } from "./user/user.js";
import { getCartCollection } from "./cart/cart.js";

export async function resetDatabase() {
  try {
    const usersCollection = await getUsersCollection();
    const productsCollection = await getProductsCollection();
    const cartsCollection = await getCartCollection();

    // Delete existing data
    const usersDeleted = await usersCollection.deleteMany({});
    const productsDeleted = await productsCollection.deleteMany({});
    const cartsDeleted = await cartsCollection.deleteMany({});
    console.log(
      `Deleted ${usersDeleted.deletedCount} users, ${productsDeleted.deletedCount} products, and ${cartsDeleted.deletedCount} carts.`
    );

    // Insert default data
    await usersCollection.insertMany(users);
    await productsCollection.insertMany(products);
    // await cartsCollection.insertMany(carts);
    console.log("Default users, products, and carts re-inserted.");

    return { success: true, message: "Database has been reset successfully." };
  } catch (error) {
    console.error("Error resetting database:", error);
    return {
      success: false,
      message: "Failed to reset the database",
      //   error: error.toString(),
    };
  }
}
