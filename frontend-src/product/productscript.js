import { createProductElement } from "./createProductElement.js";
const ul = document.querySelector(".product-list");

async function fetchAndDisplayProducts() {
  const response = await fetch("/product", {
    method: "GET",
  });
  const data = await response.json();
  console.log("Svar från servern: ", data);
  data.forEach((product) => createProductElement(product, ul));
}

fetchAndDisplayProducts();
