import { createFormProduct } from "./createFormProduct.js";
import { createProductElement } from "./createProductElement.js";

const addButton = document.querySelector(".add-toy-btn");
const toySection = document.querySelector(".product-section");
const ul = document.querySelector(".product-list");

addButton.addEventListener("click", () => {
  const form = createFormProduct({}, async (newToy) => {
    try {
      const response = await fetch("/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newToy),
      });

      if (response.ok) {
        const data = await response.json();
        const newProduct = await fetch(`/product/${data.insertedId}`);
        const productData = await newProduct.json();
        console.log("Leksak tillagd: ", productData);
        createProductElement(productData, ul);
        form.remove();
      } else {
        console.error("Fel vid tillägg av leksak: ", response.statusText);
      }
    } catch (error) {
      console.error("Ett oväntat fel uppstod: ", error);
    }
  });

  toySection.appendChild(form);
});
