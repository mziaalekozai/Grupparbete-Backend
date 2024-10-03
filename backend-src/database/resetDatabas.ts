import { Db } from "mongodb";
import users from "../data/users.js";
import products from "../data/products.js";
import carts from "../data/cart.js";
import { getProductsCollection } from "./products.js";
import { getUsersCollection } from "./user/user.js";
import { getCartCollection } from "./cart/cart.js";

// let db: Db; // Ensure this is properly initialized somewhere in your application.

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

// import { Db } from "mongodb";
// import users from "../data/users.js";
// import products from "../data/products.js";
// import carts from "../data/cart.js";
// import { getProductsCollection } from "./products.js";
// import { getUsersCollection } from "./user/user.js";
// import { getCartCollection } from "./cart/cart.js";

// let db: Db;

// // Antag att db är en instans av Db från MongoDB-driver
// export async function resetDatabase() {
//   const collectionProduct = await getProductsCollection();
//   const collectionUser = await getUsersCollection();
//   const collectionCart = await getCartCollection();
//   try {
//     // Ta bort befintliga data
//     const usersDeleted = await db.collection("users").deleteMany({});
//     const productsDeleted = await db.collection("products").deleteMany({});
//     const cartsDeleted = await db.collection("cart").deleteMany({});
//     console.log(
//       `Deleted ${usersDeleted.deletedCount} users, ${productsDeleted.deletedCount} products, and ${cartsDeleted.deletedCount} carts.`
//     );

//     // Infoga standarddata
//     await db.collection("users").insertMany(users);
//     await db.collection("products").insertMany(products);
//     await db.collection("cart").insertMany(carts);
//     console.log("Default users, products, and carts re-inserted.");

//     return { success: true, message: "Database has been reset successfully." };
//   } catch (error) {
//     console.error("Error resetting database:", error);
//     return { success: false, message: "Failed to reset the database", error };
//   }
// }
