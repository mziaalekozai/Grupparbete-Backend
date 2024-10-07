import { loggedInUser, loggedInUserName } from "../Users/userscript.js";
const cartButton = document.querySelector(".cart-btn");
const cartSection = document.querySelector(".cart-section");
const toySection = document.querySelector(".product-section");
const backButton = document.querySelector(".back-btn");
const getAllButton = document.querySelector(".get-all-btn");
const ul = document.querySelector(".cart-list");
const UserName = document.querySelector(".user-Name");
const ulAll = document.querySelector(".all-carts-list");

cartButton.addEventListener("click", async () => {
  toySection.style.display = "none";
  cartSection.style.display = "block";

  try {
    const responseCart = await fetch("/cart", { method: "GET" });
    const responseProduct = await fetch("/product", { method: "GET" });
    if (!responseCart.ok || !responseProduct.ok) {
      throw new Error("Failed to fetch data from server");
    }
    const cart = await responseCart.json();
    const product = await responseProduct.json();
    UserName.innerText = loggedInUserName;

    cart.forEach((cartItem) => {
      console.log(loggedInUser);
      if (loggedInUser === cartItem.userId)
        product.forEach((productItem) => {
          if (cartItem.productId === productItem._id) {
            const div = document.createElement("div");
            const cartList = document.createElement("div");
            const productDiv = document.createElement("div");
            const toyAmount = document.createElement("p");
            const toyName = document.createElement("h2");
            const bild = document.createElement("img");
            const toyPrice = document.createElement("p");

            toyPrice.innerText = productItem.price;
            toyName.innerText = productItem.name;
            bild.src = productItem.image;
            bild.classList.add("bild");
            toyAmount.innerText = cartItem.amount;

            productDiv.append(toyName, bild, toyPrice, toyAmount);

            cartList.appendChild(productDiv);
            div.appendChild(cartList);

            ul.append(div);
          }
        });
    });
  } catch (error) {
    console.error("Ett fel uppstod:", error);
  }
});

backButton.addEventListener("click", () => {
  toySection.style.display = "grid";
  cartSection.style.display = "none";
});

getAllButton.addEventListener("click", async () => {
  try {
    const responseCart = await fetch("/cart", { method: "GET" });
    const responseProduct = await fetch("/product", { method: "GET" });
    const responseUser = await fetch("/user", { method: "GET" });
    if (!responseCart.ok || !responseProduct.ok || !responseUser.ok) {
      throw new Error("Failed to fetch data from server");
    }

    const cart = await responseCart.json();
    const product = await responseProduct.json();
    const users = await responseUser.json();
    cart.forEach((cartItem) => {
      product.forEach((productItem) => {
        if (cartItem.productId === productItem._id) {
          const user = users.find((u) => u._id === cartItem.userId);
          const div = document.createElement("div");
          const cartList = document.createElement("div");
          const productDiv = document.createElement("div");
          const userName = document.createElement("p");
          const toyAmount = document.createElement("p");
          const toyName = document.createElement("h2");
          const bild = document.createElement("img");
          const toyPrice = document.createElement("p");
          toyPrice.innerText = productItem.price;
          toyName.innerText = productItem.name;
          bild.src = productItem.image;
          bild.classList.add("bild");
          if (user) {
            userName.innerText = `User: ${user.name}`;
          } else {
            userName.innerText = "User: Okänd";
          }
          toyAmount.innerText = `Antal: ${cartItem.amount}`;
          productDiv.append(userName, toyName, bild, toyPrice, toyAmount);
          cartList.appendChild(productDiv);
          div.appendChild(cartList);
          ulAll.append(div);
        }
      });
    });
  } catch (error) {
    console.error("Ett fel uppstod:", error);
  }
});
