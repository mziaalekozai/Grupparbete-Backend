import { removeAllProducts } from "./createProductElement.js";
import { createProductElement } from "./createProductElement.js";
import { fetchAndDisplayProducts } from "./productscript.js";

const ul = document.querySelector(".product-list");

let response;
let products;

async function searchProducts(query, ul) {
  try {
    response = await fetch(`/product/search?q=${query}`, {
      method: "GET",
    });
    if (response.ok) {
      products = await response.json();
      removeAllProducts(ul);
      let searchProduct = products;
      searchProduct.forEach((product) => createProductElement(product, ul));
    } else {
      const errorData = await response.json();
      console.error("Fel vid sökning: ", errorData.message);
      removeAllProducts(ul);
    }
  } catch (error) {
    console.error("Nätverksfel: ", error);
  }
}

const searchInput = document.querySelector("#search-product");
const productList = document.querySelector(".product-list");

searchInput.addEventListener("keyup", (event) => {
  const query = event.target.value.trim();
  console.log("Sökfråga:", query);
  if (query) {
    searchProducts(query, productList);
  } else {
    removeAllProducts(ul);
    fetchAndDisplayProducts();
  }
});
